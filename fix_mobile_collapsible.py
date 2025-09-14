#!/usr/bin/env python3
"""
Batch fix mobile collapsible functionality in ShivaKali Ashram house files.
Removes mobile collapsible restrictions to provide expansive mobile experience.
"""

import os
import re

def fix_house_file(file_path, house_name):
    """Fix mobile collapsible issues in a single house file."""
    print(f"🔧 Fixing {house_name}...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Remove toggleCollapse function
        toggle_pattern = r'        // Mobile collapsible functionality\s*\n\s*function toggleCollapse\(button\) \{[^}]*?\n        \}'
        content = re.sub(toggle_pattern, 
            f"        // Mobile collapsible functionality removed\n        // {house_name} now has expansive mobile experience like House 2", 
            content, flags=re.DOTALL)
        
        # 2. Replace addMobileCollapsible function with disabled version
        mobile_collapsible_pattern = r'        // Add collapsible sections for mobile\s*\n\s*function addMobileCollapsible\(\) \{.*?\n        \}'
        content = re.sub(mobile_collapsible_pattern, 
            f"        // Mobile collapsible functionality disabled\n        function addMobileCollapsible() {{\n            // Collapsible functionality disabled - all mastery content stays visible on mobile\n        }}", 
            content, flags=re.DOTALL)
        
        # 3. Comment out setTimeout calls
        content = re.sub(
            r'            // Add mobile collapsible after DOM is loaded\s*\n\s*setTimeout\(addMobileCollapsible, 100\);',
            "            // Mobile collapsible disabled - mastery modules stay fully expanded\n            // setTimeout(addMobileCollapsible, 100);",
            content
        )
        
        # 4. Comment out resize event handler
        resize_pattern = r'            // Re-initialize mobile features if window is resized to mobile\s*\n\s*if \(window\.innerWidth <= 768\) \{\s*\n\s*setTimeout\(addMobileCollapsible, 100\);\s*\n\s*\}'
        content = re.sub(resize_pattern,
            "            // Mobile collapsible disabled - mastery modules stay fully expanded\n            // if (window.innerWidth <= 768) {\n            //     setTimeout(addMobileCollapsible, 100);\n            // }",
            content
        )
        
        # 5. Remove collapsible CSS
        css_pattern = r'        /\* Mobile Optimization \*/\s*\n\s*\.collapsible-content \{[^}]*?\n\s*\}\s*\n\s*\.collapsible-content\.expanded \{[^}]*?\n\s*\}\s*\n\s*\.expand-toggle \{[^}]*?\n\s*\}\s*\n\s*\.expand-toggle:hover \{[^}]*?\n\s*\}'
        content = re.sub(css_pattern,
            "        /* Mobile Optimization - Collapsible removed for expansive mobile experience */",
            content, flags=re.DOTALL)
        
        # 6. Remove mobile collapsible CSS in media query
        mobile_css_pattern = r'            /\* Collapsible sections for mobile \*/\s*\n\s*\.expand-toggle \{[^}]*?\n\s*\}\s*\n\s*\.collapsible-content \{[^}]*?\n\s*\}'
        content = re.sub(mobile_css_pattern,
            "            /* Collapsible sections removed - mastery content stays fully visible */",
            content, flags=re.DOTALL)
        
        # Write back to file if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {house_name} fixed successfully!")
            return True
        else:
            print(f"ℹ️  {house_name} - No changes needed")
            return False
            
    except Exception as e:
        print(f"❌ Error fixing {house_name}: {e}")
        return False

def main():
    """Fix all house files."""
    base_dir = "C:/Users/Achariya/project/shivakali-ashram/houses"
    
    houses_to_fix = [
        ("house-4-demo.html", "House 4 Family Hub"),
        ("house-5-demo.html", "House 5 Romance Hub"), 
        ("house-6-demo.html", "House 6 Health Hub"),
        ("house-7-demo.html", "House 7 Partnership Hub"),
        ("house-8-demo.html", "House 8 Transformation Hub"),
        ("house-9-demo.html", "House 9 Wisdom Hub"),
        ("house-10-demo.html", "House 10 Career Hub"),
        ("house-11-demo.html", "House 11 Dreams Hub"),
        ("house-12-demo.html", "House 12 Spiritual Hub")
    ]
    
    print("🚀 STARTING MOBILE COLLAPSIBLE BATCH FIX")
    print("=" * 50)
    
    fixed_count = 0
    
    for filename, house_name in houses_to_fix:
        file_path = os.path.join(base_dir, filename)
        if os.path.exists(file_path):
            if fix_house_file(file_path, house_name):
                fixed_count += 1
        else:
            print(f"❌ File not found: {file_path}")
    
    print("=" * 50)
    print(f"🎉 BATCH FIX COMPLETE: {fixed_count} houses fixed!")
    print("All houses now have expansive mobile experience!")

if __name__ == "__main__":
    main()