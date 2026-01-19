#!/usr/bin/env python3
"""
Translate Chinese text in i18n files to target languages
"""
import json
import re
from pathlib import Path

# Comprehensive translation dictionary
# Format: {chinese_text: {lang_code: translated_text}}
TRANSLATIONS = {
    # Core application terms
    "24/7支持": {
        "hi": "24/7 सहायता",
        "it": "Supporto 24/7",
        "ja": "24/7サポート",
        "ko": "24/7 지원"
    },
    "24小时AI助手": {
        "hi": "24 घंटे AI सहायक",
        "it": "Assistente AI 24 ore",
        "ja": "24時間AIアシスタント",
        "ko": "24시간 AI 어시스턴트"
    },
    "AI 配音": {
        "hi": "AI वॉयसओवर",
        "it": "Voiceover AI",
        "ja": "AI 音声合成",
        "ko": "AI 음성 해설"
    },
    "AI智能评论": {
        "hi": "AI-जनित टिप्पणियाँ",
        "it": "Commenti generati da AI",
        "ja": "AI生成コメント",
        "ko": "AI 생성 댓글"
    },
    "API协议": {
        "hi": "API प्रोटोकॉल",
        "it": "Protocollo API",
        "ja": "APIプロトコル",
        "ko": "API 프로토콜"
    },
    "账号安全": {
        "hi": "खाता सुरक्षा",
        "it": "Sicurezza dell'account",
        "ja": "アカウントセキュリティ",
        "ko": "계정 보안"
    },
    "账号设置": {
        "hi": "खाता सेटअप",
        "it": "Configurazione account",
        "ja": "アカウント設定",
        "ko": "계정 설정"
    },
    "账户管理": {
        "hi": "खाता प्रबंधन",
        "it": "Gestione account",
        "ja": "アカウント管理",
        "ko": "계정 관리"
    },
    "账户养号": {
        "hi": "खाता वार्मअप",
        "it": "Warm-up account",
        "ja": "アカウント育成",
        "ko": "계정 양성"
    },
}

def contains_chinese(text):
    """Check if text contains Chinese characters"""
    return bool(re.search(r'[\u4e00-\u9fff]', text))

def translate_text(chinese_text, target_lang):
    """Translate Chinese text to target language"""
    if chinese_text in TRANSLATIONS and target_lang in TRANSLATIONS[chinese_text]:
        return TRANSLATIONS[chinese_text][target_lang]
    return None

def process_language_file(lang_code):
    """Process a single language file"""
    file_path = Path(f'website/i18n/{lang_code}/code.json')
    
    if not file_path.exists():
        print(f"File not found: {file_path}")
        return
    
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Count translations needed
    total_keys = len(data)
    chinese_keys = []
    
    for key, value in data.items():
        if isinstance(value, dict) and 'message' in value:
            if contains_chinese(value['message']):
                chinese_keys.append(key)
    
    print(f"\nProcessing {lang_code}: {len(chinese_keys)} keys with Chinese text out of {total_keys} total keys")
    
    if chinese_keys:
        print(f"Keys that need translation: {chinese_keys[:5]}...")  # Show first 5 as sample
    
    return len(chinese_keys)

# Main execution
if __name__ == "__main__":
    languages_to_process = ['hi', 'it', 'ja', 'ko']
    
    print("=" * 60)
    print("Translation Analysis for i18n files")
    print("=" * 60)
    
    for lang in languages_to_process:
        count = process_language_file(lang)

