. (Join-Path $PSScriptRoot 'Launcher-Common.ps1')
$root = [IO.Path]::GetFullPath($PSScriptRoot).TrimEnd('\', '/')
$rootId = Get-ProposalRootId $root
$mutex = New-Object Threading.Mutex($false, ('Local\JingshanProposal-' + $rootId))
$locked = $false
try {
    try { $locked = $mutex.WaitOne(20000) } catch [Threading.AbandonedMutexException] { $locked = $true }
    if (-not $locked) { throw '演示正在启动，请稍后再停止。' }
    $state = Read-ProposalState $root
    if (-not (Test-ProposalProcess $state $root)) {
        Write-Host '没有找到本目录启动的演示服务。其他应用未受影响。'
        exit 0
    }
    $status = Get-ProposalStatus ([int]$state.port)
    if ($status -and ($status.rootId -ne $state.rootId -or $status.instanceId -ne $state.instanceId)) {
        throw '服务身份与本目录记录不一致，已保留该进程。'
    }
    # Test-ProposalProcess checks the PID, exact runtime path and quoted server
    # command line. No port-wide or process-name-wide termination is used.
    Stop-Process -Id ([int]$state.pid) -ErrorAction Stop
    $statePath = Join-Path $root '.local\server-state.json'
    if (Test-Path -LiteralPath $statePath) { Remove-Item -LiteralPath $statePath -Force }
    Write-Host '景山演示已停止。浏览器标签页可自行关闭。'
    exit 0
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
} finally {
    if ($locked) { $mutex.ReleaseMutex() }
    $mutex.Dispose()
}
