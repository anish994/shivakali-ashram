#!/usr/bin/env python3
"""
🔧 Enhanced JSON Fixer for Shivakali Ashram Knowledge Files
Fixes both BOM issues and JSON syntax errors
"""

import os
import json
import codecs
import re

def fix_json_file(file_path):
    """Fix a single JSON file with BOM and syntax issues"""
    try:
        print(f"🔍 Processing: {file_path}")
        
        # Read with utf-8-sig to handle BOM
        with codecs.open(file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()
        
        # Fix common JSON syntax issues
        # Fix the comma-quote issue in line 6
        content = re.sub(r'"\s*,\s*"([^"]+)":\s*"([^"]*)"', r'",\n  "\1": "\2"', content)
        
        # Fix trailing comma before closing brace/bracket
        content = re.sub(r',(\s*[}\]])', r'\1', content)
        
        # Parse as JSON to validate
        json_data = json.loads(content)
        
        # Write back without BOM (using utf-8)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Fixed: {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to fix {file_path}: {e}")
        return False

def fix_all_problematic_files():
    """Fix all known problematic JSON files"""
    
    # Files that need BOM fixing
    problematic_files = [
        "astro-knowledge/content/foundations/tantra-complete.json",
        "astro-knowledge/content/foundations/vedangas.json", 
        "astro-knowledge/content/vastu/comprehensive-guide.json"
    ]
    
    print("🔧 FIXING JSON FILES WITH BOM & SYNTAX ISSUES...")
    print("=" * 60)
    
    fixed_count = 0
    
    for file_path in problematic_files:
        if os.path.exists(file_path):
            if fix_json_file(file_path):
                fixed_count += 1
        else:
            print(f"❌ File not found: {file_path}")
    
    print("=" * 60)
    print(f"🎉 FIXED {fixed_count} FILES!")
    return fixed_count

if __name__ == "__main__":
    fix_all_problematic_files()
