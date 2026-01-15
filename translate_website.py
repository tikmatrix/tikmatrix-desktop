#!/usr/bin/env python3
"""
Translation script for TikMatrix Desktop website
Translates all content from Russian (ru) to 18 target languages
"""

import os
import json
import shutil
import re
from pathlib import Path

# Language mappings
LANGUAGES = {
    'ar': 'Arabic',
    'de': 'German', 
    'es': 'Spanish',
    'fr': 'French',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'nl': 'Dutch',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'sv': 'Swedish',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'vi': 'Vietnamese'
}

BASE_DIR = Path('/home/runner/work/tikmatrix-desktop/tikmatrix-desktop/website/i18n')
SOURCE_LANG = 'ru'

def copy_directory_structure(target_lang):
    """Copy entire directory structure from ru to target language"""
    source_dir = BASE_DIR / SOURCE_LANG
    target_dir = BASE_DIR / target_lang
    
    # Create missing directories
    for item in source_dir.rglob('*'):
        if item.is_dir():
            relative_path = item.relative_to(source_dir)
            target_path = target_dir / relative_path
            target_path.mkdir(parents=True, exist_ok=True)
            print(f"Created directory: {relative_path}")

def copy_non_translatable_files(target_lang):
    """Copy CSS and image files as-is"""
    source_dir = BASE_DIR / SOURCE_LANG
    target_dir = BASE_DIR / target_lang
    
    for item in source_dir.rglob('*'):
        if item.is_file():
            relative_path = item.relative_to(source_dir)
            target_path = target_dir / relative_path
            
            # Copy CSS and images directly
            if item.suffix in ['.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']:
                target_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(item, target_path)
                print(f"Copied {item.suffix} file: {relative_path}")

def get_file_list(lang_dir):
    """Get all files that need translation"""
    files = []
    for item in lang_dir.rglob('*'):
        if item.is_file() and item.suffix not in ['.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']:
            files.append(item)
    return files

def main():
    print("=" * 80)
    print("TikMatrix Desktop Website Translation Tool")
    print("=" * 80)
    print(f"\nSource language: Russian (ru)")
    print(f"Target languages: {len(LANGUAGES)}")
    print("\nThis script will:")
    print("1. Copy directory structure from ru to all target languages")
    print("2. Copy non-translatable files (CSS, images)")
    print("3. Prepare translation files list")
    print("\n" + "=" * 80)
    
    # Step 1: Copy structures and non-translatable files
    for lang_code, lang_name in LANGUAGES.items():
        print(f"\n[{lang_code}] Processing {lang_name}...")
        copy_directory_structure(lang_code)
        copy_non_translatable_files(lang_code)
    
    # Step 2: Generate translation file list
    source_dir = BASE_DIR / SOURCE_LANG
    files_to_translate = []
    
    for item in source_dir.rglob('*'):
        if item.is_file() and item.suffix not in ['.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']:
            relative_path = item.relative_to(source_dir)
            files_to_translate.append(str(relative_path))
    
    print(f"\n{'=' * 80}")
    print(f"Summary:")
    print(f"Total files to translate per language: {len(files_to_translate)}")
    print(f"Total translation tasks: {len(files_to_translate) * len(LANGUAGES)}")
    print(f"{'=' * 80}\n")
    
    # Save file list for reference
    with open('/tmp/translation_files.txt', 'w') as f:
        for file_path in sorted(files_to_translate):
            f.write(f"{file_path}\n")
    
    print("File list saved to: /tmp/translation_files.txt")
    print("\nStructure preparation complete!")
    print("Ready for translation phase...")

if __name__ == '__main__':
    main()
