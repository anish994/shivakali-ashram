$signs = @(
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
)

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

foreach ($sign in $signs) {
    $filePath = "..\zodiac\$sign-demo.html"
    Write-Host "Processing $filePath..."
    
    if (Test-Path $filePath) {
        # Read file content
        $content = Get-Content $filePath -Raw
        
        # Fix paths
        $content = $content -replace 'href="assets/css/', 'href="../assets/css/'
        
        # Add mobile CSS before the first style closing tag
        $content = $content -replace '(?s)(<style[^>]*>)(.*?)(</style>)', "`$1`$2$mobileOptimizationCSS`$3"
        
        # Save changes
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "✓ Updated $sign-demo.html"
    } else {
        Write-Host "! File not found: $filePath"
    }
}

Write-Host 'Mobile optimization complete!'