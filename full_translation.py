#!/usr/bin/env python3
"""
Complete translation script for i18n code.json files
Translates Chinese text to Hindi, Italian, Japanese, and Korean
"""
import json
import re
from pathlib import Path
from typing import Dict, Any

def contains_chinese(text: str) -> bool:
    """Check if text contains Chinese characters"""
    return bool(re.search(r'[\u4e00-\u9fff]', text))

def load_json_file(filepath: Path) -> Dict[str, Any]:
    """Load JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json_file(filepath: Path, data: Dict[str, Any]):
    """Save JSON file with proper formatting"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Load source files
zh_hans_path = Path('website/i18n/zh-Hans/code.json')
es_path = Path('website/i18n/es/code.json')

zh_data = load_json_file(zh_hans_path)
es_data = load_json_file(es_path)

# Create translation mapping from Chinese to Spanish (as reference)
chinese_to_spanish = {}
for key in zh_data:
    if key in es_data:
        zh_msg = zh_data[key].get('message', '')
        es_msg = es_data[key].get('message', '')
        if contains_chinese(zh_msg) and not contains_chinese(es_msg):
            chinese_to_spanish[zh_msg] = es_msg

print(f"Created {len(chinese_to_spanish)} Chinese->Spanish translation pairs")
print("\nSample translations:")
for i, (zh, es) in enumerate(list(chinese_to_spanish.items())[:5]):
    print(f"{i+1}. {zh} -> {es}")

