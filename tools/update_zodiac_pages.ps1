param(
    [Parameter(Mandatory=$true)]
    [string]$sign,
    [string]$element,
    [string]$quality,
    [string]$ruler,
    [string]$crystal,
    [string]$color,
    [string]$bodyPart,
    [string]$keywordOne,
    [string]$keywordTwo,
    [string]$keywordThree
)

$sourceFile = "c:\Users\Achariya\project\shivakali-ashram\zodiac\$sign demo.html"
$content = Get-Content $sourceFile -Raw

# Update Core Matrix section
$coreMatrixPattern = '(?s)<div class="data-card p-4 flex flex-col items-center justify-center text-center">\s*<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Somatic Focus</p>.*?</div>\s*<div class="data-card.*?</div>\s*<div class="data-card.*?</div>\s*<div class="data-card.*?</div>\s*<div class="data-card.*?</div>\s*<div class="data-card.*?</div>'
$newCoreMatrix = @"
<div class="data-card p-4 flex flex-col items-center justify-center text-center">
<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Somatic Focus</p>
<p class="font-bold text-2xl font-display text-primary">$bodyPart</p>
<p class="text-xs text-text-dark/60 mt-1">&gt;&gt; $keywordOne</p>
</div>
<div class="data-card p-4 flex flex-col items-center justify-center text-center">
<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Crystal</p>
<p class="font-bold text-2xl font-display text-primary">$crystal</p>
<p class="text-xs text-text-dark/60 mt-1">&gt;&gt; $keywordTwo</p>
</div>
<div class="data-card p-4 flex flex-col items-center justify-center text-center">
<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Chroma Key</p>
<p class="font-bold text-2xl font-display text-primary">$color</p>
<p class="text-xs text-text-dark/60 mt-1">&gt;&gt; Energy</p>
</div>
<div class="data-card p-4 flex flex-col items-center justify-center text-center">
<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Ruling Planet</p>
<p class="font-bold text-2xl font-display text-primary">$ruler</p>
<p class="text-xs text-text-dark/60 mt-1">&gt;&gt; $keywordThree</p>
</div>
<div class="data-card p-4 flex flex-col items-center justify-center text-center">
<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Element</p>
<p class="font-bold text-2xl font-display text-primary">$element</p>
<p class="text-xs text-text-dark/60 mt-1">&gt;&gt; Essence</p>
</div>
<div class="data-card p-4 flex flex-col items-center justify-center text-center">
<p class="text-xs text-text-dark/70 uppercase tracking-widest font-body">Modality</p>
<p class="font-bold text-2xl font-display text-primary">$quality</p>
<p class="text-xs text-text-dark/60 mt-1">&gt;&gt; Style</p>
</div>
"@

$content = $content -replace $coreMatrixPattern, $newCoreMatrix

# Save updated content
$content | Set-Content $sourceFile
Write-Host "Updated Core Matrix section for $sign"