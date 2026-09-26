[CmdletBinding()]
param(
    [string]$SkillRoot = (Join-Path $PSScriptRoot '..'),
    [switch]$Apply,
    [switch]$SkipRemote
)

$ErrorActionPreference = 'Stop'
$SkillRoot = (Resolve-Path -LiteralPath $SkillRoot).Path
$repository = 'https://github.com/MasterBougli/bougskills'

function Read-Version([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) { throw "Version absente : $Path" }
    $value = (Get-Content -Raw -LiteralPath $Path).Trim()
    if ($value -notmatch '^\d+\.\d+\.\d+$') { throw "Version non SemVer : $value" }
    return [version]$value
}

$localVersion = Read-Version (Join-Path $SkillRoot 'VERSION')
Write-Output "Version locale : $localVersion"
Write-Output "Dépôt public : $repository"
if ($SkipRemote) { Write-Output 'Vérification distante ignorée à la demande.'; exit 0 }

$remoteVersionUri = "$repository/raw/refs/heads/main/VERSION"
$remoteVersionText = (Invoke-WebRequest -UseBasicParsing -Uri $remoteVersionUri).Content.Trim()
if ($remoteVersionText -notmatch '^\d+\.\d+\.\d+$') { throw "Version distante non SemVer : $remoteVersionText" }
$remoteVersion = [version]$remoteVersionText
Write-Output "Version distante : $remoteVersion"
if ($remoteVersion -le $localVersion) {
    Write-Output 'BougSkills est à jour ou la copie locale est plus récente. Aucun remplacement effectué.'
    exit 0
}
Write-Output "Mise à jour disponible : $localVersion -> $remoteVersion"
if (-not $Apply) { Write-Output 'Aucune modification effectuée. Relancer avec -Apply après autorisation explicite.'; exit 0 }

$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("bougskills-update-" + [guid]::NewGuid().ToString('N'))
$archivePath = Join-Path $tempRoot 'bougskills.zip'
$extractPath = Join-Path $tempRoot 'extracted'
$backupPath = "$SkillRoot.backup-$((Get-Date).ToString('yyyyMMdd-HHmmss'))"
New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null
try {
    Invoke-WebRequest -UseBasicParsing -Uri "$repository/archive/refs/heads/main.zip" -OutFile $archivePath
    Expand-Archive -LiteralPath $archivePath -DestinationPath $extractPath -Force
    $source = Get-ChildItem -LiteralPath $extractPath -Directory | Select-Object -First 1
    if (-not $source) { throw 'Archive GitHub vide ou structure inattendue.' }
    foreach ($required in @('SKILL.md', 'VERSION', 'agents', 'references', 'scripts')) {
        if (-not (Test-Path -LiteralPath (Join-Path $source.FullName $required))) { throw "Élément requis absent : $required" }
    }
    if ((Read-Version (Join-Path $source.FullName 'VERSION')) -ne $remoteVersion) { throw 'Version de l archive incohérente.' }
    Copy-Item -LiteralPath $SkillRoot -Destination $backupPath -Recurse -Force
    Get-ChildItem -LiteralPath $SkillRoot -Force | Remove-Item -Recurse -Force
    Copy-Item -Path (Join-Path $source.FullName '*') -Destination $SkillRoot -Recurse -Force
    Write-Output "Mise à jour appliquée. Sauvegarde : $backupPath"
} catch {
    if (Test-Path -LiteralPath $backupPath) {
        Get-ChildItem -LiteralPath $SkillRoot -Force | Remove-Item -Recurse -Force
        Copy-Item -Path (Join-Path $backupPath '*') -Destination $SkillRoot -Recurse -Force
        Write-Warning "Échec : copie restaurée depuis $backupPath"
    }
    throw
} finally {
    if (Test-Path -LiteralPath $tempRoot) { Remove-Item -LiteralPath $tempRoot -Recurse -Force }
}
