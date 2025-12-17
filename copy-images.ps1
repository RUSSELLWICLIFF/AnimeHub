# PowerShell script to copy generated anime images to public folder

$sourceDir = "C:\Users\RUSSELL\.gemini\antigravity\brain\9d407d45-21a4-4132-899b-f5f7365ed98a"
$destDir = "C:\Users\RUSSELL\Project\animehubb\frontend\public\images\anime-posters"

# Create destination directory if it doesn't exist
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Map of generated images (without timestamps)
$animeImages = @(
    "attack_on_titan",
    "my_hero_academia",
    "demon_slayer",
    "tokyo_ghoul",
    "jujutsu_kaisen",
    "one_piece",
    "naruto",
    "naruto_shippuden",
    "fullmetal_alchemist_brotherhood",
    "death_note",
    "steins_gate",
    "steins_gate_0",
    "hunter_x_hunter",
    "sword_art_online",
    "code_geass"
)

foreach ($anime in $animeImages) {
    $sourcePattern = "$sourceDir\$anime*.png"
    $sourceFiles = Get-ChildItem -Path $sourcePattern -ErrorAction SilentlyContinue
    
    if ($sourceFiles) {
        $sourceFile = $sourceFiles[0]  # Get first match
        $destFile = "$destDir\$anime.jpg"
        
        Write-Host "Copying $($sourceFile.Name) -> $anime.jpg"
        Copy-Item -Path $sourceFile.FullName -Destination $destFile -Force
    }
}

Write-Host "`nDone! Copied $($animeImages.Count) anime images."
