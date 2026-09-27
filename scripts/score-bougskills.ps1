[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$ScoresCsv,

    [string]$NaReasonsCsv = '',

    [switch]$CriticalFailure
)

$ErrorActionPreference = 'Stop'
$criterionCount = 11
$fullScore = 22
$scores = @($ScoresCsv.Split(',') | ForEach-Object { $_.Trim() })

if ($scores.Count -ne $criterionCount) {
    throw "Il faut exactement $criterionCount valeurs, dans l'ordre de tests/grille-evaluation.md. Valeurs reçues : $($scores.Count)."
}

$naReasons = @{}
if (-not [string]::IsNullOrWhiteSpace($NaReasonsCsv)) {
    foreach ($entry in $NaReasonsCsv.Split('|')) {
        $separatorIndex = $entry.IndexOf('=')
        if ($separatorIndex -lt 1 -or $separatorIndex -eq ($entry.Length - 1)) {
            throw "Raison N/A invalide : '$entry'. Format attendu : numéro=justification."
        }
        $reasonIndexText = $entry.Substring(0, $separatorIndex).Trim()
        $reasonText = $entry.Substring($separatorIndex + 1).Trim()
        $index = 0
        if (-not [int]::TryParse($reasonIndexText, [ref]$index) -or $index -lt 1 -or $index -gt $criterionCount) {
            throw "Numéro de critère invalide dans la raison N/A : '$reasonIndexText'."
        }
        if ($naReasons.ContainsKey($index)) { throw "Raison N/A dupliquée pour le critère $index." }
        $naReasons[$index] = $reasonText
    }
}

$rawScore = 0
$applicableCount = 0
$naIndexes = [System.Collections.Generic.HashSet[int]]::new()
for ($i = 0; $i -lt $criterionCount; $i++) {
    $value = $scores[$i]
    $criterionNumber = $i + 1
    if ($value -match '^(?i:N/A)$') {
        if (-not $naReasons.ContainsKey($criterionNumber)) {
            throw "Le critère $criterionNumber est N/A sans justification."
        }
        [void]$naIndexes.Add($criterionNumber)
        continue
    }

    $points = 0
    if (-not [int]::TryParse($value, [ref]$points) -or $points -lt 0 -or $points -gt 2) {
        throw "Note invalide au critère $criterionNumber : '$value'. Utiliser 0, 1, 2 ou N/A."
    }
    if ($naReasons.ContainsKey($criterionNumber)) {
        throw "Une justification N/A a été fournie pour le critère $criterionNumber, qui n'est pas noté N/A."
    }
    $rawScore += $points
    $applicableCount++
}

foreach ($reasonIndex in $naReasons.Keys) {
    if (-not $naIndexes.Contains([int]$reasonIndex)) {
        throw "La justification N/A du critère $reasonIndex ne correspond pas à une note N/A."
    }
}

if ($applicableCount -eq 0) {
    Write-Output 'Statut : non évaluable (aucun critère applicable)'
    exit 0
}

$applicableMaximum = $applicableCount * 2
$percentage = ([decimal]$rawScore / [decimal]$applicableMaximum) * 100
$normalizedScore = ([decimal]$rawScore / [decimal]$applicableMaximum) * $fullScore
$displayCulture = [System.Globalization.CultureInfo]::InvariantCulture
$normalizedDisplay = $normalizedScore.ToString('0.0', $displayCulture)
$percentageDisplay = $percentage.ToString('0.0', $displayCulture)

if ($CriticalFailure) {
    $rating = 'échec critique'
} elseif ($percentage -ge 90) {
    $rating = 'excellent'
} elseif ($percentage -ge 75) {
    $rating = 'acceptable'
} elseif ($percentage -ge 55) {
    $rating = 'insuffisant'
} else {
    $rating = 'échec'
}

Write-Output "Critères applicables : $applicableCount/$criterionCount"
Write-Output "Score brut : $rawScore/$applicableMaximum"
Write-Output "Score normalisé : $normalizedDisplay/$fullScore"
Write-Output "Pourcentage : $percentageDisplay%"
Write-Output "Évaluation : $rating"
