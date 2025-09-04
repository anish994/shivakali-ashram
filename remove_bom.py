#!/usr/bin/env python3
"""
🔧 BOM Remover for remaining problematic files
"""

import codecs
import json

def remove_bom_and_save(file_path):
    """Remove BOM and save clean file"""
    try:
        print(f"🔧 Processing: {file_path}")
        
        # Read with utf-8-sig to handle BOM
        with codecs.open(file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()
        
        # Parse as JSON to ensure it's valid
        json_data = json.loads(content)
        
        # Write back without BOM
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Cleaned: {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ Failed: {file_path} - {e}")
        return False

if __name__ == "__main__":
    files = [
        "astro-knowledge/content/foundations/tantra-complete.json",
        "astro-knowledge/content/foundations/vedangas.json", 
        "astro-knowledge/content/vastu/comprehensive-guide.json"
    ]
    
    print("🔧 REMOVING UTF-8 BOM FROM FILES...")
    print("=" * 50)
    
    for file_path in files:
        remove_bom_and_save(file_path)
    
    print("=" * 50)
    print("🎉 BOM REMOVAL COMPLETE!")
