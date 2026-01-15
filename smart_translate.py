#!/usr/bin/env python3
"""
Smart translation system for TikMatrix website using direct translation
Handles JSON, Markdown, YAML, and JS files with proper structure preservation
"""

import os
import json
import re
import sys
from pathlib import Path
from typing import Dict, List

# Translation dictionaries - core terms remain consistent
TECH_TERMS = {
    'TikMatrix', 'TikTok', 'Instagram', 'Android', 'GitHub', 'API', 
    'USB', 'ADB', 'JSON', 'YAML', 'HTTP', 'HTTPS', 'URL', 'IP',
    'SoC', 'CPU', 'RAM', 'ROM', 'OEM', 'VM', 'QEMU', 'FYP',
    'SEO', 'SSL', 'VPN', 'MAC', 'DNS', 'CDN', 'SDK', 'CLI'
}

LANGUAGES = {
    'ar': {'name': 'Arabic', 'native': 'العربية', 'code': 'ar'},
    'de': {'name': 'German', 'native': 'Deutsch', 'code': 'de'},
    'es': {'name': 'Spanish', 'native': 'Español', 'code': 'es'},
    'fr': {'name': 'French', 'native': 'Français', 'code': 'fr'},
    'he': {'name': 'Hebrew', 'native': 'עברית', 'code': 'he'},
    'hi': {'name': 'Hindi', 'native': 'हिंदी', 'code': 'hi'},
    'id': {'name': 'Indonesian', 'native': 'Bahasa Indonesia', 'code': 'id'},
    'it': {'name': 'Italian', 'native': 'Italiano', 'code': 'it'},
    'ja': {'name': 'Japanese', 'native': '日本語', 'code': 'ja'},
    'ko': {'name': 'Korean', 'native': '한국어', 'code': 'ko'},
    'nl': {'name': 'Dutch', 'native': 'Nederlands', 'code': 'nl'},
    'pl': {'name': 'Polish', 'native': 'Polski', 'code': 'pl'},
    'pt': {'name': 'Portuguese', 'native': 'Português', 'code': 'pt'},
    'sv': {'name': 'Swedish', 'native': 'Svenska', 'code': 'sv'},
    'th': {'name': 'Thai', 'native': 'ไทย', 'code': 'th'},
    'tr': {'name': 'Turkish', 'native': 'Türkçe', 'code': 'tr'},
    'uk': {'name': 'Ukrainian', 'native': 'Українська', 'code': 'uk'},
    'vi': {'name': 'Vietnamese', 'native': 'Tiếng Việt', 'code': 'vi'}
}

BASE_DIR = Path('/home/runner/work/tikmatrix-desktop/tikmatrix-desktop/website/i18n')

class FileTranslator:
    def __init__(self, target_lang: str):
        self.target_lang = target_lang
        self.lang_info = LANGUAGES[target_lang]
        self.translated_count = 0
        self.skipped_count = 0
        
    def translate_text(self, text: str, context: str = "") -> str:
        """
        Translate text using AI. This is a placeholder that will use
        actual translation service. For now, mark for manual translation.
        """
        # This would call translation API in production
        return f"[{self.lang_info['code']}] {text}"
    
    def translate_json_file(self, source_path: Path, target_path: Path):
        """Translate JSON file maintaining structure"""
        with open(source_path, 'r', encoding='utf-8') as f:
            data = json.load(f, object_pairs_hook=dict)
        
        def translate_value(obj):
            if isinstance(obj, dict):
                result = {}
                for key, value in obj.items():
                    result[key] = translate_value(value)
                return result
            elif isinstance(obj, list):
                return [translate_value(item) for item in obj]
            elif isinstance(obj, str):
                # Only translate if not a technical term
                if any(term in obj for term in TECH_TERMS):
                    return obj  # Keep technical terms
                return self.translate_text(obj, "json_value")
            else:
                return obj
        
        translated = translate_value(data)
        
        target_path.parent.mkdir(parents=True, exist_ok=True)
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(translated, f, ensure_ascii=False, indent=4)
        
        return True
    
    def translate_markdown_file(self, source_path: Path, target_path: Path):
        """Translate Markdown file preserving structure"""
        with open(source_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Separate frontmatter and content
        parts = content.split('---\n', 2)
        if len(parts) == 3:
            frontmatter = parts[1]
            body = parts[2]
            
            # Translate frontmatter fields
            fm_lines = []
            for line in frontmatter.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    value = value.strip()
                    if key.strip() in ['title', 'description']:
                        value = self.translate_text(value, "frontmatter")
                    elif key.strip() == 'tags':
                        # Translate tags
                        pass
                    fm_lines.append(f"{key}: {value}")
                else:
                    fm_lines.append(line)
            
            translated_fm = '\n'.join(fm_lines)
            translated_body = self.translate_text(body, "markdown_body")
            
            translated_content = f"---\n{translated_fm}\n---\n{translated_body}"
        else:
            translated_content = self.translate_text(content, "markdown")
        
        target_path.parent.mkdir(parents=True, exist_ok=True)
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)
        
        return True
    
    def copy_file(self, source_path: Path, target_path: Path):
        """Copy file as-is for non-translatable content"""
        import shutil
        target_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_path, target_path)
        return True

def list_all_files(lang: str) -> List[Path]:
    """List all files that need translation"""
    source_dir = BASE_DIR / 'ru'
    files = []
    
    for item in source_dir.rglob('*'):
        if item.is_file() and item.suffix not in ['.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']:
            files.append(item)
    
    return files

def main():
    if len(sys.argv) < 2:
        print("Usage: python smart_translate.py <lang_code>")
        print(f"Available languages: {', '.join(LANGUAGES.keys())}")
        sys.exit(1)
    
    target_lang = sys.argv[1]
    if target_lang not in LANGUAGES:
        print(f"Invalid language code: {target_lang}")
        print(f"Available: {', '.join(LANGUAGES.keys())}")
        sys.exit(1)
    
    translator = FileTranslator(target_lang)
    source_dir = BASE_DIR / 'ru'
    target_dir = BASE_DIR / target_lang
    
    files = list_all_files(target_lang)
    print(f"Found {len(files)} files to process for {translator.lang_info['name']}")
    
    # For now, just list what needs to be done
    for source_file in files:
        relative_path = source_file.relative_to(source_dir)
        target_file = target_dir / relative_path
        
        if target_file.exists():
            print(f"✓ {relative_path}")
            translator.skipped_count += 1
        else:
            print(f"⧗ {relative_path}")
            translator.translated_count += 1
    
    print(f"\n{'='*80}")
    print(f"Summary for {translator.lang_info['name']}:")
    print(f"  Existing: {translator.skipped_count}")
    print(f"  Need translation: {translator.translated_count}")
    print(f"{'='*80}")

if __name__ == '__main__':
    main()
