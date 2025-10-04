# PowerShell script to optimize all zodiac demo pages for mobile
param(
    [switch]$ApplyFixes = $true
)

$zodiacSigns = @(
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
)

# Mobile optimization CSS to be injected
$mobileOptimizationCSS = @'
        /* Mobile Optimization */
        @media (max-width: 768px) {
            html {
                font-size: 14px;
                -webkit-text-size-adjust: 100%;
            }
            
            .data-card {
                padding: 1rem !important;
                margin: 0.5rem !important;
            }
            
            .grid-cols-1 {
                grid-template-columns: 1fr !important;
            }
            
            .p-4 {
                padding: 0.75rem !important;
            }
            
            .m-4 {
                margin: 0.75rem !important;
            }
            
            .gap-8 {
                gap: 1rem !important;
            }
        }
        
        @media (max-width: 480px) {
            html {
                font-size: 12px;
            }
            
            .data-card {
                padding: 0.75rem !important;
            }
            
            .text-2xl {
                font-size: 1.5rem !important;
            }
            
            .p-4 {
                padding: 0.5rem !important;
            }
        }
        
        /* Touch Device Optimization */
        @media (hover: none) {
            * {
                cursor: default !important;
            }
            
            [onclick] {
                cursor: pointer !important;
                -webkit-tap-highlight-color: transparent;
            }
            
            .hover\\:scale-105:hover {
                transform: none !important;
            }
            
            .hover\\:shadow-lg:hover {
                box-shadow: none !important;
            }
        }
        
        /* Safe Area Insets */
        @supports(padding: max(0px)) {
            body {
                padding-left: max(0.5rem, env(safe-area-inset-left));
                padding-right: max(0.5rem, env(safe-area-inset-right));
                padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
            }
        }
'@

# HTML meta tags for better mobile support
$mobileMetaTags = @'
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover">
    <meta name="theme-color" content="#000000">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
'@

# Performance optimizations
$performanceOptimizations = @{
    'animation: mystic-pulse 4s infinite' = 'animation: mystic-pulse 6s infinite'
    'animation: energy-flow 6s infinite' = 'animation: energy-flow 8s infinite'
    'animation: cosmic-rotation 20s' = 'animation: cosmic-rotation 30s'
    'transform: scale(1.05)' = 'transform: scale(1.03)'
}

foreach ($sign in $zodiacSigns) {
    $filePath = "zodiac/$sign-demo.html"
    Write-Host "Processing $filePath..."
    
    if (Test-Path $filePath) {
        # Read file content
        $content = Get-Content $filePath -Raw
        
        # Fix CSS paths
        $content = $content -replace 'href="assets/css/', 'href="../assets/css/'
        
        # Add mobile meta tags
        $content = $content -replace '<meta name="viewport".*?>', $mobileMetaTags
        
        # Add mobile optimization CSS
        $content = $content -replace '\/\* Mobile Optimization \*\/(.*?)(?=<\/style>)', $mobileOptimizationCSS
        
        # Apply performance optimizations
        foreach ($opt in $performanceOptimizations.GetEnumerator()) {
            $content = $content -replace $opt.Key, $opt.Value
        }
        
        # Fix layout issues
        $content = $content -replace 'class="grid grid-cols-3', 'class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
        $content = $content -replace 'class="p-8"', 'class="p-8 md:p-4 sm:p-2"'
        $content = $content -replace 'class="m-8"', 'class="m-8 md:m-4 sm:m-2"'
        
        # Save changes
        if ($ApplyFixes) {
            $content | Set-Content $filePath -Force
            Write-Host "✓ Updated $sign-demo.html"
        }
    } else {
        Write-Host "! File not found: $filePath"
    }
}

Write-Host 'Mobile optimization complete for all zodiac pages!'