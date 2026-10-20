import re
import urllib.request

with open('ref_site.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's search for any image filenames or wix static media tokens
media_ids = re.findall(r'([a-zA-Z0-9_]+~mv2\.[a-zA-Z0-9]+)', html)
print("Media IDs found:", set(media_ids))

# Let's search for json blocks or text blocks in Wix data
texts = re.findall(r'\"text\":\s*\"([^\"]+)\"', html)
print("\nTexts found in JSON:", len(texts))
for t in set(texts):
    if len(t) > 15:
        print("  *", t[:120])

# Let's also download the 3 images found to inspect them
import os
os.makedirs('downloaded_assets', exist_ok=True)

urls = [
    'https://static.wixstatic.com/media/11062b_55e4be1e75564866b6c28290f9a9d271~mv2.png',
    'https://static.wixstatic.com/media/d92d3d_4db3b9a2dfd34978a86efe08b092a8c6~mv2.jpg',
    'https://static.wixstatic.com/media/d92d3d_7e52c505c5ae492cb5a89bda07898ef6~mv2.jpg'
]

for url in urls:
    name = url.split('/')[-1].replace('~mv2', '')
    dest = os.path.join('downloaded_assets', name)
    try:
        urllib.request.urlretrieve(url, dest)
        print(f"Downloaded {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {url}: {e}")
