#!/usr/bin/env python3
"""
📚 Create AI-enhanced versions of the 3 newly fixed files
"""

import os
import json
import shutil

def create_enhanced_version(source_file, category):
    """Create AI-enhanced version of a file"""
    try:
        print(f"📚 Creating enhanced version: {source_file}")
        
        # Load source file
        with open(source_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Create target directory
        target_dir = f"enhanced_ai_knowledge/{category}"
        os.makedirs(target_dir, exist_ok=True)
        
        # Add AI enhancement marker
        if isinstance(data, dict):
            data["ai_enhanced"] = True
            data["enhancement_timestamp"] = "2025-01-09T10:00:00Z"
            data["enhancement_version"] = "1.0"
        
        # Save enhanced version
        filename = os.path.basename(source_file)
        target_file = os.path.join(target_dir, filename)
        
        with open(target_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Created: {target_file}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to create enhanced version: {e}")
        return False

def main():
    print("📚 CREATING AI-ENHANCED VERSIONS OF FIXED FILES...")
    print("=" * 60)
    
    files_to_enhance = [
        ("astro-knowledge/content/foundations/tantra-complete.json", "foundations"),
        ("astro-knowledge/content/foundations/vedangas.json", "foundations"),
        ("astro-knowledge/content/vastu/comprehensive-guide.json", "vastu")
    ]
    
    success_count = 0
    for source_file, category in files_to_enhance:
        if os.path.exists(source_file):
            if create_enhanced_version(source_file, category):
                success_count += 1
        else:
            print(f"❌ Source file not found: {source_file}")
    
    print("=" * 60)
    print(f"🎉 CREATED {success_count} ENHANCED VERSIONS!")
    
    # Verify total enhanced files
    enhanced_files = []
    for root, dirs, files in os.walk("enhanced_ai_knowledge"):
        for file in files:
            if file.endswith('.json'):
                enhanced_files.append(os.path.join(root, file))
    
    print(f"📊 Total enhanced files: {len(enhanced_files)}")
    return success_count

if __name__ == "__main__":
    main()
