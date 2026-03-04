# Convert images in `src/assets` and `public` to WebP using ImageMagick (magick.exe)
# Requires ImageMagick installed and available on PATH.
# Usage: ./scripts/convert-images.ps1 -Path "src/assets" -Quality 80
param(
  [string]$Path = "src/assets",
  [int]$Quality = 80
)

Write-Host "Converting images under: $Path (quality=$Quality)"

Get-ChildItem -Path $Path -Recurse -Include *.png,*.jpg,*.jpeg | ForEach-Object {
  $src = $_.FullName
  $dest = [System.IO.Path]::ChangeExtension($src, '.webp')
  if (-not (Test-Path $dest)) {
    Write-Host "Converting $src -> $dest"
    & magick convert $src -quality $Quality $dest
    if ($LASTEXITCODE -ne 0) { Write-Host "Failed to convert $src" -ForegroundColor Red }
  } else {
    Write-Host "Skipping existing: $dest"
  }
}

Write-Host "Done."