#!/usr/bin/env python3
"""
🔧 UTF-8 BOM Fixer for Shivakali Ashram Knowledge Files
Quick fix for the remaining 3 problematic JSON files
"""

import os
import json
import codecs

def fix_bom_files():
    """Fix UTF-8 BOM issues in remaining JSON files"""
    
    # Files that need BOM fixing
    problematic_files = [
        "astro-knowledge/content/foundations/tantra-complete.json",
        "astro-knowledge/content/foundations/vedangas.json", 
        "astro-knowledge/content/vastu/comprehensive-guide.json"
    ]
    
    print("🔧 FIXING UTF-8 BOM ISSUES...")
    print("=" * 50)
    
    fixed_count = 0
    
    for file_path in problematic_files:
        if os.path.exists(file_path):
            try:
                print(f"🔍 Processing: {file_path}")
                
                # Read with utf-8-sig to handle BOM
                with codecs.open(file_path, 'r', encoding='utf-8-sig') as f:
                    content = f.read()
                
                # Parse as JSON to validate
                json_data = json.loads(content)
                
                # Write back without BOM (using utf-8)
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(json_data, f, indent=2, ensure_ascii=False)
                
                print(f"✅ Fixed: {file_path}")
                fixed_count += 1
                
            except Exception as e:
                print(f"❌ Failed to fix {file_path}: {e}")
        else:
            print(f"❌ File not found: {file_path}")
    
    print("=" * 50)
    print(f"🎉 FIXED {fixed_count} FILES!")
    return fixed_count

if __name__ == "__main__":
    fix_bom_files()
