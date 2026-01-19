#!/usr/bin/env python3
"""
Professional translation from Spanish to Hindi, Italian, Japanese, Korean
Using established translation patterns from similar projects
"""
import json
from pathlib import Path

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

# Professional translation mappings based on common TikTok/Instagram terminology
# Spanish -> {hi, it, ja, ko}
PROFESSIONAL_TRANSLATIONS = {
    # Core features
    "Soporte 24/7": {
        "hi": "24/7 सहायता",
        "it": "Supporto 24/7",
        "ja": "24/7サポート",
        "ko": "24/7 지원"
    },
    "Asistente IA 24 horas": {
        "hi": "24 घंटे AI सहायक",
        "it": "Assistente AI 24 ore",
        "ja": "24時間AIアシスタント",
        "ko": "24시간 AI 어시스턴트"
    },
    "Locución con IA": {
        "hi": "AI वॉयसओवर",
        "it": "Voiceover AI",
        "ja": "AI ボイスオーバー",
        "ko": "AI 음성 해설"
    },
    "Comentarios generados por IA": {
        "hi": "AI-जनित टिप्पणियाँ",
        "it": "Commenti generati da AI",
        "ja": "AI生成コメント",
        "ko": "AI 생성 댓글"
    },
    "Protocolo API": {
        "hi": "API प्रोटोकॉल",
        "it": "Protocollo API",
        "ja": "APIプロトコル",
        "ko": "API 프로토콜"
    },
    "Seguridad de la cuenta": {
        "hi": "खाता सुरक्षा",
        "it": "Sicurezza dell'account",
        "ja": "アカウントセキュリティ",
        "ko": "계정 보안"
    },
    "Configuración de cuenta": {
        "hi": "खाता सेटअप",
        "it": "Configurazione account",
        "ja": "アカウント設定",
        "ko": "계정 설정"
    },
    "Gestión de cuentas": {
        "hi": "खाता प्रबंधन",
        "it": "Gestione account",
        "ja": "アカウント管理",
        "ko": "계정 관리"
    },
    "Calentamiento de cuenta": {
        "hi": "खाता वार्मअप",
        "it": "Riscaldamento account",
        "ja": "アカウントウォームアップ",
        "ko": "계정 양성"
    },
}

# Load Spanish data to use as translation source
es_data = load_json(Path('website/i18n/es/code.json'))

# Apply translations to each target language
for lang in ['hi', 'it', 'ja', 'ko']:
    lang_path = Path(f'website/i18n/{lang}/code.json')
    lang_data = load_json(lang_path)
    
    updates = 0
    for key, value in lang_data.items():
        if isinstance(value, dict) and 'message' in value:
            es_text = value['message']
            if es_text in PROFESSIONAL_TRANSLATIONS:
                lang_data[key]['message'] = PROFESSIONAL_TRANSLATIONS[es_text][lang]
                updates += 1
    
    print(f"{lang}: Applied {updates} professional translations")
    save_json(lang_path, lang_data)

