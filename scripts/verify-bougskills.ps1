[CmdletBinding()]
param(
    [string]$SkillRoot = (Join-Path $PSScriptRoot '..')
)

$ErrorActionPreference = 'Stop'
$SkillRoot = (Resolve-Path $SkillRoot).Path
$errors = [System.Collections.Generic.List[string]]::new()

function Assert-Path([string]$RelativePath) {
    $target = Join-Path $SkillRoot $RelativePath
    if (-not (Test-Path -LiteralPath $target)) {
        $errors.Add("Fichier ou dossier manquant : $RelativePath")
    }
}

@(
    'SKILL.md',
    'README.md',
    'LICENCE.md',
    'DECISIONS.md',
    'agents/openai.yaml',
    'references/creation-projet.md',
    'references/protocole-securite.md',
    'references/passation-session.md',
    'references/modes.md',
    'references/fiabilite-raisonnement.md',
    'references/formats-reponses.md',
    'references/gestion-decisions.md',
    'references/composition-skills.md',
    'references/gestion-contexte.md',
    'references/boucle-apprentissage.md',
    'references/garde-fous.md',
    'references/delegation.md',
    'references/analyse-impact.md',
    'references/reconnaissance-projet.md',
    'tests/scenarios.md'
) | ForEach-Object { Assert-Path $_ }

$skillFile = Join-Path $SkillRoot 'SKILL.md'
if (Test-Path -LiteralPath $skillFile) {
    $skillText = Get-Content -Raw -LiteralPath $skillFile
    if ($skillText -notmatch '(?ms)^---\s*\r?\n.*?^name:\s*bougskills\s*\r?\n.*?^description:\s*.+?\r?\n---') {
        $errors.Add('Frontmatter SKILL.md invalide ou incomplet.')
    }
}

$markdownFiles = Get-ChildItem -LiteralPath $SkillRoot -Recurse -File -Filter '*.md'
foreach ($file in $markdownFiles) {
    $text = Get-Content -Raw -LiteralPath $file.FullName

    if ($text -match '(?i)(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|-----BEGIN (RSA|OPENSSH|EC|DSA) PRIVATE KEY-----)') {
        $errors.Add("Motif de secret potentiel dans : $($file.FullName)")
    }

    $linkMatches = [regex]::Matches($text, '\]\(([^)#?]+)\)')
    foreach ($match in $linkMatches) {
        $link = $match.Groups[1].Value
        if ($link -notmatch '^(https?://|mailto:|#)' -and $link -notmatch '^[<].*[>]$') {
            $target = Join-Path $file.DirectoryName $link
            if (-not (Test-Path -LiteralPath $target)) {
                $errors.Add("Lien interne introuvable dans $($file.Name) : $link")
            }
        }
    }
}

if (Get-Command git -ErrorAction SilentlyContinue) {
    $diffCheck = git -C $SkillRoot diff --check 2>&1
    if ($LASTEXITCODE -ne 0) {
        $errors.Add('git diff --check a détecté un problème de whitespace.')
    }
}

if ($errors.Count -gt 0) {
    Write-Error (($errors | ForEach-Object { "- $_" }) -join [Environment]::NewLine)
    exit 1
}

Write-Output "BougSkills valide : structure, références, liens, frontmatter et scan de secrets passés."
