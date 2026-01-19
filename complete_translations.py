#!/usr/bin/env python3
import json
import re
from pathlib import Path

def contains_chinese(text):
    return bool(re.search(r'[\u4e00-\u9fff]', text))

# Load all necessary files
def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f, object_pairs_hook=dict)

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved: {filepath}")

# Create comprehensive translation dictionary using Spanish as reference
zh_path = Path('website/i18n/zh-Hans/code.json')
es_path = Path('website/i18n/es/code.json')

zh_data = load_json(zh_path)
es_data = load_json(es_path)

# Build translation mappings
translations = {}

for key in zh_data:
    zh_msg = zh_data[key].get('message', '')
    es_msg = es_data[key].get('message', '') if key in es_data else ''
    
    if contains_chinese(zh_msg) and es_msg and not contains_chinese(es_msg):
        translations[key] = {
            'zh': zh_msg,
            'es': es_msg
        }

print(f"Found {len(translations)} entries to translate")

# Generate translations for target languages
# Based on Spanish translations and professional translation patterns

