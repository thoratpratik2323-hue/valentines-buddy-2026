$path = "C:\Users\thora\.gemini\antigravity\brain\tempmediaStorage"
$files = Get-ChildItem -Path $path -Filter "*.jpg" -Recurse
if ($files) {
    $img = $files | Select-Object -Last 1
    Write-Host "Found image: $($img.Name)"
    $dest = "c:\Users\thora\.gemini\antigravity\scratch\hug_day_gift"
    Copy-Item $img.FullName -Destination "$dest\p1.jpg" -Force
    Copy-Item $img.FullName -Destination "$dest\p2.jpg" -Force
    Copy-Item $img.FullName -Destination "$dest\p3.jpg" -Force
    Copy-Item $img.FullName -Destination "$dest\p4.jpg" -Force
    Write-Host "Images copied successfully!"
} else {
    Write-Host "No .jpg image found in $path"
    # Fallback to check parent directory
    $parentFiles = Get-ChildItem -Path "C:\Users\thora\.gemini\antigravity\brain" -Filter "*.jpg"
    if ($parentFiles) {
        $img = $parentFiles | Select-Object -Last 1
        Write-Host "Found image in parent: $($img.Name)"
        $dest = "c:\Users\thora\.gemini\antigravity\scratch\hug_day_gift"
        Copy-Item $img.FullName -Destination "$dest\p1.jpg" -Force
        Copy-Item $img.FullName -Destination "$dest\p2.jpg" -Force
        Copy-Item $img.FullName -Destination "$dest\p3.jpg" -Force
        Copy-Item $img.FullName -Destination "$dest\p4.jpg" -Force
        Write-Host "Images copied from parent!"
    } else {
        Write-Host "Really no images found anywhere."
    }
}
