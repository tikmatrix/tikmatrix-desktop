#!/usr/bin/env python3
"""
AI-powered translation script for TikMatrix website
Uses Claude API for high-quality technical translations
"""

import os
import json
import re
from pathlib import Path
import time

# Language mappings with native names
LANGUAGES = {
    'ar': {'name': 'Arabic', 'native': 'العربية'},
    'de': {'name': 'German', 'native': 'Deutsch'},
    'es': {'name': 'Spanish', 'native': 'Español'},
    'fr': {'name': 'French', 'native': 'Français'},
    'he': {'name': 'Hebrew', 'native': 'עברית'},
    'hi': {'name': 'Hindi', 'native': 'हिंदी'},
    'id': {'name': 'Indonesian', 'native': 'Bahasa Indonesia'},
    'it': {'name': 'Italian', 'native': 'Italiano'},
    'ja': {'name': 'Japanese', 'native': '日本語'},
    'ko': {'name': 'Korean', 'native': '한국어'},
    'nl': {'name': 'Dutch', 'native': 'Nederlands'},
    'pl': {'name': 'Polish', 'native': 'Polski'},
    'pt': {'name': 'Portuguese', 'native': 'Português'},
    'sv': {'name': 'Swedish', 'native': 'Svenska'},
    'th': {'name': 'Thai', 'native': 'ไทย'},
    'tr': {'name': 'Turkish', 'native': 'Türkçe'},
    'uk': {'name': 'Ukrainian', 'native': 'Українська'},
    'vi': {'name': 'Vietnamese', 'native': 'Tiếng Việt'}
}

BASE_DIR = Path('/home/runner/work/tikmatrix-desktop/tikmatrix-desktop/website/i18n')
SOURCE_LANG = 'ru'

def get_translation_prompt(content, file_type, target_lang_name, target_lang_native):
    """Generate translation prompt based on file type"""
    
    if file_type == 'json':
        return f"""Translate this JSON file from Russian to {target_lang_name} ({target_lang_native}).

IMPORTANT RULES:
1. Maintain exact JSON structure and formatting
2. Only translate the "message" field values
3. Keep all keys unchanged
4. Keep description fields unchanged
5. DO NOT translate: TikMatrix, TikTok, Android, GitHub, API, URLs, technical terms
6. Preserve all special characters and formatting
7. Return ONLY the translated JSON, no explanations

Russian JSON content:
{content}

Translated {target_lang_name} JSON:"""

    elif file_type in ['md', 'mdx']:
        return f"""Translate this Markdown document from Russian to {target_lang_name} ({target_lang_native}).

IMPORTANT RULES:
1. Preserve the frontmatter (--- ... ---) structure exactly
2. Translate title, tags, and content
3. Keep markdown formatting (headers, lists, tables, links, images)
4. DO NOT translate: TikMatrix, TikTok, Android, code snippets, URLs, image paths
5. Keep technical terms in English when appropriate
6. Maintain table structure and alignment
7. Preserve all special markdown syntax
8. Return ONLY the translated document, no explanations

Russian Markdown content:
{content}

Translated {target_lang_name} Markdown:"""

    elif file_type == 'yml':
        return f"""Translate this YAML file from Russian to {target_lang_name} ({target_lang_native}).

IMPORTANT RULES:
1. Maintain exact YAML structure
2. Keep keys unchanged
3. Translate title and name values if they are descriptive text
4. Keep URLs and technical terms unchanged
5. DO NOT translate: TikMatrix, GitHub usernames
6. Return ONLY the translated YAML, no explanations

Russian YAML content:
{content}

Translated {target_lang_name} YAML:"""

    elif file_type == 'js':
        return f"""Translate this JavaScript/React file from Russian to {target_lang_name} ({target_lang_native}).

IMPORTANT RULES:
1. Only translate user-facing text strings
2. Keep all JavaScript code, imports, exports unchanged
3. DO NOT translate: TikMatrix, variable names, function names, technical terms
4. Preserve JSX structure and formatting
5. Keep HTML tags and attributes unchanged
6. Return ONLY the translated file, no explanations

Russian JS content:
{content}

Translated {target_lang_name} JS:"""

    else:
        return f"""Translate this content from Russian to {target_lang_name} ({target_lang_native}).

IMPORTANT RULES:
1. Maintain exact formatting and structure
2. DO NOT translate: TikMatrix, TikTok, technical terms, URLs
3. Keep professional technical translation quality
4. Return ONLY the translated content, no explanations

Russian content:
{content}

Translated {target_lang_name} content:"""

def translate_with_local_llm(content, file_type, target_lang, target_lang_name, target_lang_native):
    """Use local translation logic for simpler files"""
    # For very simple files, we can use direct patterns
    # This is a placeholder - in production, you'd use actual AI translation
    return None

def get_file_type(file_path):
    """Determine file type from extension"""
    suffix = file_path.suffix.lower()
    if suffix == '.json':
        return 'json'
    elif suffix in ['.md', '.mdx']:
        return 'md'
    elif suffix == '.yml' or suffix == '.yaml':
        return 'yml'
    elif suffix == '.js':
        return 'js'
    else:
        return 'other'

def translate_file(source_path, target_path, target_lang):
    """Translate a single file"""
    lang_info = LANGUAGES[target_lang]
    
    # Read source content
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Determine file type
    file_type = get_file_type(source_path)
    
    # Generate prompt
    prompt = get_translation_prompt(
        content, 
        file_type, 
        lang_info['name'], 
        lang_info['native']
    )
    
    # Save prompt for manual translation if needed
    return prompt, file_type

def generate_translation_batch(target_lang):
    """Generate translation prompts for a language"""
    source_dir = BASE_DIR / SOURCE_LANG
    target_dir = BASE_DIR / target_lang
    lang_info = LANGUAGES[target_lang]
    
    print(f"\n{'='*80}")
    print(f"Generating translation batch for {lang_info['name']} ({lang_info['native']})")
    print(f"{'='*80}\n")
    
    batch_dir = Path(f'/tmp/translations/{target_lang}')
    batch_dir.mkdir(parents=True, exist_ok=True)
    
    file_count = 0
    
    for source_file in source_dir.rglob('*'):
        if source_file.is_file() and source_file.suffix not in ['.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']:
            relative_path = source_file.relative_to(source_dir)
            target_file = target_dir / relative_path
            
            # Skip if already exists
            if target_file.exists():
                continue
            
            file_count += 1
            prompt, file_type = translate_file(source_file, target_file, target_lang)
            
            # Save metadata
            meta = {
                'source': str(source_file),
                'target': str(target_file),
                'file_type': file_type,
                'lang': target_lang,
                'lang_name': lang_info['name'],
                'relative_path': str(relative_path)
            }
            
            batch_file = batch_dir / f"{file_count:03d}_{relative_path.name}.json"
            batch_file.parent.mkdir(parents=True, exist_ok=True)
            
            with open(batch_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'meta': meta,
                    'prompt': prompt
                }, f, ensure_ascii=False, indent=2)
    
    print(f"Generated {file_count} translation prompts")
    print(f"Batch saved to: {batch_dir}\n")
    
    return file_count

def main():
    print("="*80)
    print("TikMatrix Website Translation Batch Generator")
    print("="*80)
    
    total_files = 0
    
    for lang_code in LANGUAGES.keys():
        count = generate_translation_batch(lang_code)
        total_files += count
    
    print("="*80)
    print(f"Total translation tasks generated: {total_files}")
    print("Batches saved to: /tmp/translations/")
    print("="*80)

if __name__ == '__main__':
    main()
