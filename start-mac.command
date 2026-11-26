#!/bin/bash
# 景山实验学校 · 未来学习场 —— macOS 启动脚本
#
# 用法：
#   双击运行，或在终端执行 ./start-mac.command
#
# 可选环境变量：
#   JINGSHAN_PORT=1430        起始端口（默认 1430，会自动尝试后续 10 个端口）
#   JINGSHAN_NODE=/path/node  指定 Node.js 可执行文件
#   DEEPSEEK_API_KEY=sk-...   启用小景与瓦力的 AI 对话（可选）
#   JINGSHAN_NO_BROWSER=1     启动后不自动打开浏览器

set -u

ROOT="$(cd "$(dirname "$0")" && pwd -P)" || exit 1
cd "$ROOT" || exit 1

LOCAL_DIR="$ROOT/.local"
STATE="$LOCAL_DIR/server-state.json"
OUT_LOG="$LOCAL_DIR/server-output.log"
ERR_LOG="$LOCAL_DIR/server-error.log"
SERVER="$ROOT/server/standalone.mjs"
LOCK_DIR="$LOCAL_DIR/start.lock"

PREFERRED_PORT="${JINGSHAN_PORT:-1430}"
RUNNING_PORT=""
CHILD_PID=""
LOCK_ACQUIRED=0

say() { printf '%s\n' "$*"; }
fail() { printf '%s\n' "$*" >&2; exit 1; }

find_node() {
  if [ -n "${JINGSHAN_NODE:-}" ]; then
    if [ -x "$JINGSHAN_NODE" ]; then printf '%s\n' "$JINGSHAN_NODE"; fi
    return 0
  fi
  local candidate
  candidate="$(command -v node 2>/dev/null || true)"
  if [ -n "$candidate" ] && [ -x "$candidate" ]; then
    printf '%s\n' "$candidate"
    return 0
  fi
  for candidate in /opt/homebrew/bin/node /usr/local/bin/node; do
    if [ -x "$candidate" ]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  # 双击运行时可能读不到 nvm 的 PATH，这里补查一遍。
  for candidate in "$HOME"/.nvm/versions/node/*/bin/node; do
    if [ -x "$candidate" ]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  return 0
}

# 与服务端 projectIdentity() 保持一致的目录指纹。
root_identity() {
  "$NODE_BIN" -e '
const { createHash } = require("node:crypto");
const { resolve } = require("node:path");
const p = resolve(process.argv[1]).replaceAll("\\", "/");
process.stdout.write(createHash("sha256").update(process.platform === "win32" ? p.toLowerCase() : p).digest("hex"));
' "$ROOT" 2>/dev/null || true
}

state_field() {
  "$NODE_BIN" -e '
try {
  const s = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"));
  const v = s[process.argv[2]];
  process.stdout.write(v === undefined || v === null ? "" : String(v));
} catch {}
' "$STATE" "$1" 2>/dev/null || true
}

# 确认 .local 里记录的服务确实属于本目录并且仍在运行。
check_running() {
  RUNNING_PORT=""
  [ -f "$STATE" ] || return 1
  local app pid port root_id instance status command_line
  app="$(state_field app)"
  pid="$(state_field pid)"
  port="$(state_field port)"
  root_id="$(state_field rootId)"
  instance="$(state_field instanceId)"
  [ "$app" = "jingshan-proposal" ] || return 1
  case "$pid" in ''|*[!0-9]*) return 1 ;; esac
  case "$port" in ''|*[!0-9]*) return 1 ;; esac
  [ -n "$instance" ] || return 1
  if [ -n "$EXPECTED_ROOT_ID" ] && [ "$root_id" != "$EXPECTED_ROOT_ID" ]; then return 1; fi
  kill -0 "$pid" 2>/dev/null || return 1
  command_line="$(ps -p "$pid" -o command= 2>/dev/null || true)"
  case "$command_line" in *"$SERVER"*) ;; *) return 1 ;; esac
  status="$(curl -fsS --max-time 2 "http://127.0.0.1:$port/api/local-status" 2>/dev/null)" || return 1
  case "$status" in *"\"instanceId\":\"$instance\""*) ;; *) return 1 ;; esac
  case "$status" in *"\"rootId\":\"$root_id\""*) ;; *) return 1 ;; esac
  RUNNING_PORT="$port"
  return 0
}

open_browser() {
  [ "${JINGSHAN_NO_BROWSER:-}" = "1" ] && return 0
  command -v open >/dev/null 2>&1 && open "http://127.0.0.1:$1/" >/dev/null 2>&1
  return 0
}

release_lock() {
  if [ "$LOCK_ACQUIRED" = "1" ]; then
    rm -rf "$LOCK_DIR"
    LOCK_ACQUIRED=0
  fi
}

on_interrupt() {
  if [ -n "$CHILD_PID" ] && kill -0 "$CHILD_PID" 2>/dev/null; then
    kill "$CHILD_PID" 2>/dev/null || true
  fi
  release_lock
  exit 130
}

acquire_lock() {
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    LOCK_ACQUIRED=1
    printf '%s\n' "$$" > "$LOCK_DIR/pid"
    return 0
  fi
  local lock_pid
  lock_pid="$(cat "$LOCK_DIR/pid" 2>/dev/null || true)"
  case "$lock_pid" in ''|*[!0-9]*) lock_pid="" ;; esac
  if [ -z "$lock_pid" ] || ! kill -0 "$lock_pid" 2>/dev/null; then
    rm -rf "$LOCK_DIR"
    if mkdir "$LOCK_DIR" 2>/dev/null; then
      LOCK_ACQUIRED=1
      printf '%s\n' "$$" > "$LOCK_DIR/pid"
      return 0
    fi
  fi
  return 1
}

trap 'release_lock' EXIT
trap 'on_interrupt' INT TERM

# ---- 参数与依赖检查 ----
case "$PREFERRED_PORT" in
  ''|*[!0-9]*) fail "JINGSHAN_PORT 必须是数字，例如 JINGSHAN_PORT=1430。" ;;
esac
PREFERRED_PORT=$((10#$PREFERRED_PORT))
if [ "$PREFERRED_PORT" -lt 1024 ] || [ "$PREFERRED_PORT" -gt 65525 ]; then
  fail "端口需在 1024—65525 之间。"
fi
MAX_PORT=$((PREFERRED_PORT + 10))

NODE_BIN="$(find_node)"
[ -n "$NODE_BIN" ] || fail "未找到 Node.js。macOS 版需要本机安装 Node.js 18 或更高版本。
可执行 brew install node，或从 https://nodejs.org 下载安装。
也可以用 JINGSHAN_NODE=/path/to/node ./start-mac.command 指定路径。"

NODE_VERSION="$("$NODE_BIN" -p 'process.versions.node' 2>/dev/null || true)"
NODE_MAJOR="${NODE_VERSION%%.*}"
case "$NODE_MAJOR" in
  ''|*[!0-9]*) fail "无法运行 Node.js：$NODE_BIN" ;;
esac
if [ "$NODE_MAJOR" -lt 18 ]; then
  fail "需要 Node.js 18 或更高版本（当前为 ${NODE_VERSION}）。请升级后重试。"
fi

[ -f "$SERVER" ] || fail "文件不完整：缺少 server/standalone.mjs，请重新解压完整的运行包。"
[ -f "$ROOT/dist/index.html" ] || fail "文件不完整：缺少 dist/index.html，请重新解压完整的运行包。"
[ -w "$ROOT" ] || fail "当前文件夹不可写，请把整个运行包移动到有写入权限的位置。"
mkdir -p "$LOCAL_DIR" || fail "无法创建 .local 目录，请检查文件夹权限。"

EXPECTED_ROOT_ID="$(root_identity)"

# ---- 复用已有服务或启动新服务 ----
say "景山演示 · macOS 启动中…"

if ! acquire_lock; then
  say "另一个启动窗口正在准备演示，正在等待…"
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50; do
    sleep 0.5
    if check_running; then
      say "演示已打开：http://127.0.0.1:$RUNNING_PORT/"
      open_browser "$RUNNING_PORT"
      exit 0
    fi
    [ -d "$LOCK_DIR" ] || break
  done
  fail "另一个启动窗口尚未完成，请稍后重试。"
fi

if check_running; then
  say "演示已在运行：http://127.0.0.1:$RUNNING_PORT/"
  say "停止服务：./stop-mac.command"
  open_browser "$RUNNING_PORT"
  exit 0
fi

# 清掉上次异常退出遗留的状态文件，避免停止脚本误判。
rm -f "$STATE"
: > "$OUT_LOG"
: > "$ERR_LOG"

say "使用 Node.js ${NODE_VERSION}（${NODE_BIN}）"
nohup "$NODE_BIN" "$SERVER" --port "$PREFERRED_PORT" --max-port "$MAX_PORT" \
  >>"$OUT_LOG" 2>>"$ERR_LOG" </dev/null &
CHILD_PID=$!

deadline=$((SECONDS + 25))
while [ "$SECONDS" -lt "$deadline" ]; do
  if ! kill -0 "$CHILD_PID" 2>/dev/null; then
    say "演示启动失败。"
    [ -s "$ERR_LOG" ] && tail -n 20 "$ERR_LOG" >&2
    [ -s "$OUT_LOG" ] && tail -n 5 "$OUT_LOG" >&2
    fail "请查看 .local/server-error.log；若端口 ${PREFERRED_PORT}—${MAX_PORT} 均被占用，可尝试 JINGSHAN_PORT=1500 ./start-mac.command。"
  fi
  if [ -f "$STATE" ] && [ "$(state_field pid)" = "$CHILD_PID" ] && check_running; then
    CHILD_PID=""
    say "景山演示已启动：http://127.0.0.1:$RUNNING_PORT/"
    say "停止服务：./stop-mac.command"
    say "（仅关闭浏览器标签页不会停止本机服务）"
    open_browser "$RUNNING_PORT"
    exit 0
  fi
  sleep 0.3
done

[ -s "$ERR_LOG" ] && tail -n 20 "$ERR_LOG" >&2
fail "服务启动超时，未确认已就绪。请稍候重新运行本脚本，或查看 .local/server-error.log。"
