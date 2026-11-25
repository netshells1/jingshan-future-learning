$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$pointer = [IntPtr]::Zero
$secure = $null
$plain = $null
try {
    Import-Module (Join-Path $PSHOME 'Modules\Microsoft.PowerShell.Security\Microsoft.PowerShell.Security.psd1') -ErrorAction Stop
    Write-Host '可选：配置本机小景对话。图文展示和互动演示无需配置。'
    Write-Host '密钥仅保存到本文件夹的 .local，使用当前 Windows 用户的 DPAPI 加密。'
    $secure = Read-Host '请输入 DeepSeek API 密钥（输入内容不会显示）' -AsSecureString
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    if ($plain -notmatch '^sk-[A-Za-z0-9_-]{16,240}$') { throw '密钥格式不正确，未修改已有配置。' }
    $directory = Join-Path $PSScriptRoot '.local'
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
    $destination = Join-Path $directory 'deepseek-key.dpapi'
    $temporary = Join-Path $directory ('deepseek-key.' + [Guid]::NewGuid().ToString('N') + '.tmp')
    $encrypted = ConvertFrom-SecureString $secure
    [IO.File]::WriteAllText($temporary, $encrypted, (New-Object Text.UTF8Encoding($false)))
    Move-Item -LiteralPath $temporary -Destination $destination -Force
    Write-Host '配置已保存。刷新演示页面即可使用；首次连接需要联网。' -ForegroundColor Green
    Write-Host '换电脑或换 Windows 用户后，请在目标电脑重新运行此配置。'
    exit 0
} catch {
    Write-Host '配置未完成。请确认密钥格式与文件夹写入权限，原有配置不会主动清除。' -ForegroundColor Red
    exit 1
} finally {
    $plain = $null
    $encrypted = $null
    if ($pointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
    if ($secure) { $secure.Dispose() }
}
