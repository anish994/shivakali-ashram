#!/usr/bin/env python3
"""
🔧 Comprehensive JSON Fixer for Shivakali Ashram Knowledge Files
Fixes BOM issues, syntax errors, and other problems in problematic files
"""

import os
import json
import codecs
import re

def fix_json_file(file_path):
    """Fix a single JSON file with BOM and various syntax issues"""
    try:
        print(f"🔍 Processing: {file_path}")
        
        # Read with utf-8-sig to handle BOM
        with codecs.open(file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()
        
        # Fix the comma-quote issue in line 6
        content = re.sub(r'"\s*,\s*"([^"]+)":', r'",\n  "\1":', content)
        
        # Fix the missing comma before sections in line 28
        content = re.sub(r'("summary": "[^"]+")\s*"sections":', r'\1,\n    "sections":', content)
        
        # Fix any other syntax issues
        
        # Create temp file to check if JSON is valid
        temp_file = file_path + ".temp"
        with open(temp_file, 'w', encoding='utf-8') as f:
            f.write(content)
            
        # Test if the JSON is valid
        try:
            with open(temp_file, 'r', encoding='utf-8') as f:
                json_data = json.load(f)
            
            # If we got here, the JSON is valid
            # Now write the fixed content back to the original file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            print(f"✅ Fixed: {file_path}")
            success = True
            
        except json.JSONDecodeError as e:
            print(f"❌ JSON still invalid after fixes: {e}")
            success = False
            
        # Clean up temp file
        if os.path.exists(temp_file):
            os.remove(temp_file)
            
        return success
        
    except Exception as e:
        print(f"❌ Failed to fix {file_path}: {e}")
        return False

def fix_file_manually(file_path):
    """Apply manual fixes to specific files with known issues"""
    filename = os.path.basename(file_path)
    
    try:
        print(f"🔧 Manual fixing: {file_path}")
        
        # Read with utf-8-sig to handle BOM
        with codecs.open(file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()
        
        # Apply file-specific fixes
        if "tantra-complete.json" in file_path:
            # Fix specific issues in tantra-complete.json
            # Fix the comma-quote issue in line 6
            content = re.sub(r'("subtitle": "[^"]+")(\s*),(\s*)"category":', r'\1,\n  "category":', content)
            # Fix the missing comma before sections
            content = re.sub(r'("summary": "[^"]+")(\s*)"sections":', r'\1,\n    "sections":', content)
            
        elif "vedangas.json" in file_path:
            # Fix specific issues in vedangas.json
            # Fix the comma-quote issue in line 6
            content = re.sub(r'("subtitle": "[^"]+")(\s*),(\s*)"category":', r'\1,\n  "category":', content)
            # Fix the missing comma before sections
            content = re.sub(r'("summary": "[^"]+")(\s*)"sections":', r'\1,\n    "sections":', content)
            
        elif "comprehensive-guide.json" in file_path:
            # Fix specific issues in comprehensive-guide.json
            # Fix the comma-quote issue in line 6
            content = re.sub(r'("subtitle": "[^"]+")(\s*),(\s*)"category":', r'\1,\n  "category":', content)
            # Fix the missing comma before sections
            content = re.sub(r'("summary": "[^"]+")(\s*)"sections":', r'\1,\n    "sections":', content)
        
        # Write the fixed content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        # Verify if the JSON is valid now
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                json.load(f)
            print(f"✅ Successfully fixed: {file_path}")
            return True
        except json.JSONDecodeError as e:
            print(f"❌ JSON still invalid after manual fixes: {e}")
            return False
            
    except Exception as e:
        print(f"❌ Failed to manually fix {file_path}: {e}")
        return False

def fix_all_problematic_files():
    """Fix all known problematic JSON files"""
    
    # Files that need fixing
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
            if fix_file_manually(file_path):
                fixed_count += 1
                
                # Create enhanced AI version after fixing
                base_name = os.path.basename(file_path)
                source_dir = os.path.dirname(file_path)
                category = os.path.basename(os.path.dirname(file_path))
                target_dir = "enhanced_ai_knowledge/" + category
                
                # Ensure the target directory exists
                os.makedirs(target_dir, exist_ok=True)
                
                # Copy the fixed file to enhanced directory
                try:
                    with open(file_path, 'r', encoding='utf-8') as src_file:
                        json_data = json.load(src_file)
                    
                    # Add AI enhancement marker
                    if isinstance(json_data, dict):
                        json_data["ai_enhanced"] = True
                        
                    with open(os.path.join(target_dir, base_name), 'w', encoding='utf-8') as target_file:
                        json.dump(json_data, target_file, indent=2, ensure_ascii=False)
                    
                    print(f"📚 Created AI-enhanced version: {os.path.join(target_dir, base_name)}")
                except Exception as e:
                    print(f"❌ Failed to create enhanced version: {e}")
        else:
            print(f"❌ File not found: {file_path}")
    
    print("=" * 60)
    print(f"🎉 FIXED {fixed_count} FILES!")
    return fixed_count

if __name__ == "__main__":
    fix_all_problematic_files()
