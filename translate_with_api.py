#!/usr/bin/env python3
"""
Professional translation using deep-translator library
Translates from Spanish to Hindi, Italian, Japanese, and Korean
"""
import json
import time
from pathlib import Path
from deep_translator import GoogleTranslator

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

# Language code mapping for Google Translate
LANG_MAP = {
    'hi': 'hi',  # Hindi
    'it': 'it',  # Italian
    'ja': 'ja',  # Japanese
    'ko': 'ko'   # Korean
}

def translate_text(text, target_lang):
    """Translate text from Spanish to target language"""
    try:
        translator = GoogleTranslator(source='es', target=LANG_MAP[target_lang])
        return translator.translate(text)
    except Exception as e:
        print(f"Translation error: {e}")
        return text  # Return original if translation fails

# Load Spanish source
es_data = load_json(Path('website/i18n/es/code.json'))

# Process each target language
for lang in ['hi', 'it', 'ja', 'ko']:
    print(f"\n{'='*60}")
    print(f"Translating to {lang.upper()}...")
    print('='*60)
    
    lang_path = Path(f'website/i18n/{lang}/code.json')
    lang_data = load_json(lang_path)
    
    total = len(lang_data)
    translated = 0
    
    for idx, (key, value) in enumerate(lang_data.items(), 1):
        if isinstance(value, dict) and 'message' in value and key in es_data:
            es_text = es_data[key]['message']
            
            # Translate from Spanish to target language
            try:
                translated_text = translate_text(es_text, lang)
                lang_data[key]['message'] = translated_text
                translated += 1
                
                # Progress indicator
                if idx % 50 == 0:
                    print(f"Progress: {idx}/{total} ({idx*100//total}%)")
                
                # Small delay to avoid rate limiting
                time.sleep(0.1)
                
            except Exception as e:
                print(f"Error translating '{key}': {e}")
                continue
    
    print(f"\nCompleted: {translated}/{total} entries translated")
    save_json(lang_path, lang_data)
    print(f"Saved: {lang_path}")

print("\n" + "="*60)
print("Translation complete for all languages!")
print("="*60)

