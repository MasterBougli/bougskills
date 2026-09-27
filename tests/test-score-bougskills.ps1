[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$calculatorPath = Join-Path $PSScriptRoot '..\scripts\score-bougskills.ps1'
$failures = [System.Collections.Generic.List[string]]::new()

function Invoke-ScoreCase {
    param(
        [string]$Name,
        [string]$Scores,
        [string]$Reasons = '',
        [switch]$CriticalFailure
    )

    try {
        $output = (& $calculatorPath -ScoresCsv $Scores -NaReasonsCsv $Reasons -CriticalFailure:$CriticalFailure 2>&1 | Out-String)
        return [pscustomobject]@{ Name = $Name; Succeeded = $true; Output = $output }
    } catch {
        return [pscustomobject]@{ Name = $Name; Succeeded = $false; Output = $_.Exception.Message }
    }
}

function Assert-Case {
    param(
        [string]$Name,
        [string]$Scores,
        [string]$Reasons,
        [string]$ExpectedText,
        [switch]$ExpectError,
        [switch]$CriticalFailure
    )

    $result = Invoke-ScoreCase -Name $Name -Scores $Scores -Reasons $Reasons -CriticalFailure:$CriticalFailure
    $successMatches = if ($ExpectError) { -not $result.Succeeded } else { $result.Succeeded }
    if (-not $successMatches -or $result.Output -notmatch [regex]::Escape($ExpectedText)) {
        $failures.Add("$Name — résultat inattendu : $($result.Output.Trim())")
    } else {
        Write-Output "Réussi : $Name"
    }
}

$oneNa = '6=Le scénario ne comporte pas de code applicatif'
Assert-Case -Name '55 % exact est insuffisant' -Scores '2,2,2,2,2,N/A,1,0,0,0,0' -Reasons $oneNa -ExpectedText 'Évaluation : insuffisant'
Assert-Case -Name 'Sous 55 % est un échec' -Scores '2,2,2,2,1,N/A,0,0,0,0,0' -Reasons $oneNa -ExpectedText 'Évaluation : échec'
Assert-Case -Name '90 % exact est excellent' -Scores '2,2,2,2,2,N/A,2,2,2,2,0' -Reasons $oneNa -ExpectedText 'Évaluation : excellent'
Assert-Case -Name 'Sous 90 % reste acceptable' -Scores '2,2,2,2,2,N/A,2,2,2,1,0' -Reasons $oneNa -ExpectedText 'Évaluation : acceptable'

$allNaScores = 'N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A'
$allNaReasons = (1..11 | ForEach-Object { "$_=Le scénario ne couvre pas ce critère" }) -join '|'
Assert-Case -Name 'Tous les critères N/A sont non évaluables' -Scores $allNaScores -Reasons $allNaReasons -ExpectedText 'non évaluable'
Assert-Case -Name 'N/A sans justification est rejeté' -Scores '2,2,2,2,2,N/A,2,2,2,2,2' -ExpectedText 'sans justification' -ExpectError
Assert-Case -Name 'Échec critique prévaut sur un excellent score' -Scores '2,2,2,2,2,N/A,2,2,2,2,2' -Reasons $oneNa -ExpectedText 'Évaluation : échec critique' -CriticalFailure

if ($failures.Count -gt 0) {
    Write-Error ($failures -join [Environment]::NewLine)
    exit 1
}

Write-Output 'Tous les tests du calculateur sont réussis.'
