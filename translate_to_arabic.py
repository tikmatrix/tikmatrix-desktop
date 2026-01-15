#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Translate all Chinese Markdown files to Arabic for TikMatrix documentation
"""

import os
import re

# Translation mapping for common terms
TERM_MAPPING = {
    # Product names (keep as-is)
    "TikMatrix": "TikMatrix",
    "IgMatrix": "IgMatrix",
    "VideoMagic": "VideoMagic",
    "TikTok": "TikTok",
    "Instagram": "Instagram",
    "Android": "Android",
    "Windows": "Windows",
    "Mac": "Mac",
    "iPhone": "iPhone",
    "USB": "USB",
    "API": "API",
    "ROI": "ROI",
    "PC": "PC",
    
    # Common technical terms
    "shadowban": "shadowban",
    "proxy": "بروكسي",
    "IP": "IP",
    "VPN": "VPN",
    "script": "سكريبت",
    "bot": "بوت",
}

# Files to translate
ar_blog_dir = "/home/runner/work/tikmatrix-desktop/tikmatrix-desktop/website/i18n/ar/docusaurus-plugin-content-blog"
ar_docs_dir = "/home/runner/work/tikmatrix-desktop/tikmatrix-desktop/website/i18n/ar/docusaurus-plugin-content-docs/current"
ar_pages_dir = "/home/runner/work/tikmatrix-desktop/tikmatrix-desktop/website/i18n/ar/docusaurus-plugin-content-pages"

def translate_file(filepath):
    """Placeholder for actual translation - will be done manually"""
    print(f"Processing: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file contains Chinese characters
    if re.search(r'[\u4e00-\u9fff]', content):
        print(f"  ✓ Contains Chinese - needs translation")
        return True
    else:
        print(f"  ✗ No Chinese found - skipping")
        return False

def main():
    files_to_translate = []
    
    # Find all markdown files
    for root, dirs, files in os.walk(ar_blog_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                if translate_file(filepath):
                    files_to_translate.append(filepath)
    
    for root, dirs, files in os.walk(ar_docs_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                if translate_file(filepath):
                    files_to_translate.append(filepath)
    
    for root, dirs, files in os.walk(ar_pages_dir):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                filepath = os.path.join(root, file)
                if translate_file(filepath):
                    files_to_translate.append(filepath)
    
    print(f"\n{'='*60}")
    print(f"Total files needing translation: {len(files_to_translate)}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
