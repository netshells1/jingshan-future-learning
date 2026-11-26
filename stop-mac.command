#!/bin/bash
# 景山实验学校 · 未来学习场 —— macOS 停止脚本
#
# 用法：双击运行，或在终端执行 ./stop-mac.command
# 只停止本目录记录且身份匹配的服务，不影响其他应用与演示副本。

set -u

ROOT="$(cd "$(dirname "$0")" && pwd -P)" || exit 1
cd "$ROOT" || exit 1

LOCAL_DIR="$ROOT/.local"
STATE="$LOCAL_DIR/server-state.json"
SERVER="$ROOT/server/standalone.mjs"

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
  for candidate in "$HOME"/.nvm/versions/node/*/bin/node; do
    if [ -x "$candidate" ]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  return 0
}

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

NODE_BIN="$(find_node)"
[ -n "$NODE_BIN" ] || fail "未找到 Node.js，无法读取演示状态。可用 JINGSHAN_NODE=/path/to/node 指定。"

if [ ! -f "$STATE" ]; then
  say "没有找到本目录启动的演示服务。其他应用未受影响。"
  exit 0
fi

APP="$(state_field app)"
PID="$(state_field pid)"
PORT="$(state_field port)"
ROOT_ID="$(state_field rootId)"
INSTANCE="$(state_field instanceId)"

if [ "$APP" != "jingshan-proposal" ] || [ -z "$INSTANCE" ]; then
  say "没有找到本目录启动的演示服务。其他应用未受影响。"
  exit 0
fi
case "$PID" in ''|*[!0-9]*) PID="" ;; esac
if [ -z "$PID" ] || ! kill -0 "$PID" 2>/dev/null; then
  say "没有找到本目录启动的演示服务（状态记录已过期）。其他应用未受影响。"
  exit 0
fi

EXPECTED_ROOT_ID="$(root_identity)"
if [ -n "$EXPECTED_ROOT_ID" ] && [ "$ROOT_ID" != "$EXPECTED_ROOT_ID" ]; then
  fail "服务身份与本目录记录不一致，已保留该进程。"
fi

COMMAND_LINE="$(ps -p "$PID" -o command= 2>/dev/null || true)"
case "$COMMAND_LINE" in
  *"$SERVER"*) ;;
  *) fail "进程 $PID 与本目录记录不一致，已保留该进程。" ;;
esac

if [ -n "$PORT" ]; then
  STATUS="$(curl -fsS --max-time 2 "http://127.0.0.1:$PORT/api/local-status" 2>/dev/null || true)"
  if [ -n "$STATUS" ]; then
    case "$STATUS" in
      *"\"instanceId\":\"$INSTANCE\""*) ;;
      *) fail "服务身份与本目录记录不一致，已保留该进程。" ;;
    esac
  fi
fi

kill -TERM "$PID" 2>/dev/null || fail "无法停止进程 ${PID}，请检查权限。"

# 等待正常退出（服务收到 SIGTERM 后会移除状态文件）。
for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50; do
  kill -0 "$PID" 2>/dev/null || break
  sleep 0.1
done

if kill -0 "$PID" 2>/dev/null; then
  # 强制结束前再次核对，防止 PID 被系统复用后误杀其他进程。
  COMMAND_LINE="$(ps -p "$PID" -o command= 2>/dev/null || true)"
  case "$COMMAND_LINE" in
    *"$SERVER"*) ;;
    *) fail "进程 $PID 未能正常停止，且身份已变化，已保留该进程。" ;;
  esac
  kill -KILL "$PID" 2>/dev/null || fail "无法停止进程 ${PID}。"
  sleep 0.3
fi

rm -f "$STATE"
say "景山演示已停止。浏览器标签页可自行关闭。"
