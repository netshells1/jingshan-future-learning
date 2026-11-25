$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

function Get-ProposalRootId([string] $Root) {
    $normalized = [IO.Path]::GetFullPath($Root).TrimEnd('\', '/').Replace('\', '/').ToLowerInvariant()
    $hash = [Security.Cryptography.SHA256]::Create()
    try { return ([BitConverter]::ToString($hash.ComputeHash([Text.Encoding]::UTF8.GetBytes($normalized)))).Replace('-', '').ToLowerInvariant() }
    finally { $hash.Dispose() }
}

function Get-ProposalStatus([int] $Port) {
    if ($Port -lt 1024 -or $Port -gt 65535) { return $null }
    try {
        return Invoke-RestMethod -Uri ('http://127.0.0.1:{0}/api/local-status' -f $Port) -TimeoutSec 2 -Method Get -UseBasicParsing
    } catch { return $null }
}

function Read-ProposalState([string] $Root) {
    $path = Join-Path $Root '.local\server-state.json'
    try { return Get-Content -LiteralPath $path -Raw -Encoding UTF8 | ConvertFrom-Json }
    catch { return $null }
}

function Test-ProposalProcess($State, [string] $Root) {
    if (-not $State -or $State.app -ne 'jingshan-proposal' -or $State.rootId -ne (Get-ProposalRootId $Root)) { return $false }
    if (-not $State.pid -or [int]$State.pid -lt 1) { return $false }
    $expectedNode = [IO.Path]::GetFullPath((Join-Path $Root 'runtime\node.exe'))
    $expectedServer = [IO.Path]::GetFullPath((Join-Path $Root 'server\standalone.mjs'))
    if ($State.nodePath -ine $expectedNode -or $State.serverPath -ine $expectedServer) { return $false }
    $process = Get-CimInstance Win32_Process -Filter ('ProcessId = {0}' -f [int]$State.pid) -ErrorAction SilentlyContinue
    if (-not $process -or $process.ExecutablePath -ine $expectedNode -or -not $process.CommandLine) { return $false }
    $quotedServer = '"' + $expectedServer + '"'
    if ($process.CommandLine.IndexOf($quotedServer, [StringComparison]::OrdinalIgnoreCase) -lt 0) { return $false }
    return $true
}
