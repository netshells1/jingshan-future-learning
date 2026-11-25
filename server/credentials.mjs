import { execFile } from 'node:child_process';
import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const validKey = (value) => typeof value === 'string' && /^sk-[A-Za-z0-9_-]{16,240}$/.test(value);

// PowerShell stdout is consumed only in process memory, never printed or logged.
// No user-controlled input is interpolated into this script.
const decryptScript = `
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$ptr = [IntPtr]::Zero
try {
  # A Vite process launched from PowerShell 7 inherits its module path.
  # Load the Windows PowerShell module explicitly, without trusting that path.
  Import-Module (Join-Path $PSHOME 'Modules\\Microsoft.PowerShell.Security\\Microsoft.PowerShell.Security.psd1') -ErrorAction Stop
  $ciphertext = [IO.File]::ReadAllText($env:JINGSHAN_DEEPSEEK_CREDENTIAL_FILE).Trim()
  $secure = ConvertTo-SecureString -String $ciphertext
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  [Console]::Out.Write([Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr))
} catch {
  exit 1
} finally {
  if ($ptr -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  }
}
`;

export function createCredentialReader(projectRoot, environment = process.env) {
  let cache;
  const path = join(projectRoot, '.local', 'deepseek-key.dpapi');
  return async function readCredential() {
    const injected = environment.DEEPSEEK_API_KEY?.trim();
    if (injected) return validKey(injected) ? injected : null;
    if (process.platform !== 'win32') return null;
    try {
      const info = await stat(path);
      if (!info.isFile() || info.size > 16384) return null;
      if (cache?.mtime === info.mtimeMs && cache.expires > Date.now()) return cache.value;
      const { stdout } = await execFileAsync(
        'powershell.exe',
        ['-NoLogo', '-NoProfile', '-NonInteractive', '-EncodedCommand', Buffer.from(decryptScript, 'utf16le').toString('base64')],
        {
          windowsHide: true,
          timeout: 8000,
          maxBuffer: 8192,
          encoding: 'utf8',
          env: { ...process.env, JINGSHAN_DEEPSEEK_CREDENTIAL_FILE: path },
        },
      );
      const value = stdout.trim();
      if (!validKey(value)) return null;
      cache = { value, mtime: info.mtimeMs, expires: Date.now() + 300_000 };
      return value;
    } catch {
      // Do not expose PowerShell stderr, command arguments, or credential data.
      cache = undefined;
      return null;
    }
  };
}
