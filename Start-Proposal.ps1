[CmdletBinding()]
param(
    [Alias('PreferredPort')]
    [ValidateRange(1024, 65525)]
    [int] $Port = 1430,
    [switch] $NoBrowser
)
. (Join-Path $PSScriptRoot 'Launcher-Common.ps1')
$root = [IO.Path]::GetFullPath($PSScriptRoot).TrimEnd('\', '/')
$rootId = Get-ProposalRootId $root
$nodePath = Join-Path $root 'runtime\node.exe'
$serverPath = Join-Path $root 'server\standalone.mjs'
$localDirectory = Join-Path $root '.local'
$mutex = New-Object Threading.Mutex($false, ('Local\JingshanProposal-' + $rootId))
$locked = $false
try {
    try { $locked = $mutex.WaitOne(20000) } catch [Threading.AbandonedMutexException] { $locked = $true }
    if (-not $locked) { throw '另一启动窗口正在准备演示，请稍后再试。' }
    if (-not (Test-Path -LiteralPath $nodePath -PathType Leaf) -or -not (Test-Path -LiteralPath (Join-Path $root 'dist\index.html') -PathType Leaf)) {
        throw '文件不完整。请先把整个 ZIP 解压到一个文件夹，再双击启动景山演示.cmd。'
    }
    $state = Read-ProposalState $root
    if (Test-ProposalProcess $state $root) {
        $status = Get-ProposalStatus ([int]$state.port)
        if ($status -and $status.rootId -eq $rootId -and $status.instanceId -eq $state.instanceId) {
            if (-not $NoBrowser) { Start-Process ('http://127.0.0.1:{0}/' -f [int]$state.port) }
            Write-Host ('演示已打开：http://127.0.0.1:{0}/' -f [int]$state.port)
            exit 0
        }
        throw '本目录的服务仍在启动或暂时无响应。请稍候重试，或使用停止景山演示.cmd后重新启动。'
    }
    New-Item -ItemType Directory -Path $localDirectory -Force | Out-Null
    $process = Start-Process -FilePath $nodePath -ArgumentList ('"{0}" --port {1} --max-port {2}' -f $serverPath, $Port, ($Port + 10)) -WorkingDirectory $root -WindowStyle Hidden -PassThru `
        -RedirectStandardOutput (Join-Path $localDirectory 'server-output.log') -RedirectStandardError (Join-Path $localDirectory 'server-error.log')
    $deadline = [DateTime]::UtcNow.AddSeconds(25)
    while ([DateTime]::UtcNow -lt $deadline) {
        Start-Sleep -Milliseconds 300
        $process.Refresh()
        if ($process.HasExited) { throw ('演示启动失败。{0}—{1} 端口可能全部被占用，或文件夹不可写。请查看 .local\server-error.log。' -f $Port, ($Port + 10)) }
        $state = Read-ProposalState $root
        if (-not $state -or [int]$state.pid -ne $process.Id) { continue }
        $status = Get-ProposalStatus ([int]$state.port)
        if ($status -and $status.rootId -eq $rootId -and $status.instanceId -eq $state.instanceId -and (Test-ProposalProcess $state $root)) {
            if (-not $NoBrowser) { Start-Process ('http://127.0.0.1:{0}/' -f [int]$state.port) }
            Write-Host ('演示已打开：http://127.0.0.1:{0}/' -f [int]$state.port)
            exit 0
        }
    }
    throw '服务启动超过预期，请稍候再次双击启动；重复启动会复用本目录服务。'
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
} finally {
    if ($locked) { $mutex.ReleaseMutex() }
    $mutex.Dispose()
}
