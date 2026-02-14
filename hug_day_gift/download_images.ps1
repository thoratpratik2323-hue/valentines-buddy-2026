$dest = "c:\Users\thora\.gemini\antigravity\scratch\hug_day_gift"
$images = @{
    "p1.jpg" = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80" # Cute cat hug/love
    "p2.jpg" = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80" # Heart hands
    "p3.jpg" = "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&q=80" # Couple walking
    "p4.jpg" = "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500&q=80" # Sunset romantic
}

foreach ($name in $images.Keys) {
    $url = $images[$name]
    Write-Host "Downloading $name..."
    try {
        Invoke-WebRequest -Uri $url -OutFile "$dest\$name"
        Write-Host "Success!"
    } catch {
        Write-Host "Failed to download $name. Using placeholder."
        # Create a simple dummy file if download fails
        Set-Content -Path "$dest\$name" -Value "Dummy Image"
    }
}
