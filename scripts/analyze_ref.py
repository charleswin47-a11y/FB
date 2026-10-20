import re
import json

with open('ref_site.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

print('--- TITLE & META ---')
for m in re.finditer(r'<title>(.*?)</title>', html, re.I):
    print('Title:', m.group(1))

# Extract headings
print('\n--- HEADINGS ---')
for tag in ['h1', 'h2', 'h3', 'p']:
    matches = re.findall(rf'<{tag}[^>]*>(.*?)</{tag}>', html, re.I | re.S)
    clean_matches = [re.sub(r'<[^>]+>', '', m).strip() for m in matches if len(re.sub(r'<[^>]+>', '', m).strip()) > 5]
    if clean_matches:
        print(f"\n[{tag.upper()}] ({len(clean_matches)} items)")
        for item in clean_matches[:10]:
            print(f"  - {item}")

# Extract image URLs
print('\n--- IMAGES ---')
imgs = re.findall(r'https?://[^\s\"\'\<\>]+?\.(?:jpg|jpeg|png|webp|svg)', html)
wix_imgs = set([img for img in imgs if 'wixstatic.com' in img or 'static.wixstatic.com' in img])
for img in sorted(wix_imgs):
    print(img)

# Search for color hex codes
print('\n--- HEX CODES ---')
hexes = set(re.findall(r'#[0-9a-fA-F]{6}', html))
print(sorted(list(hexes)))
