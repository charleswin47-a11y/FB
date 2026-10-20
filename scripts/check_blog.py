import urllib.request
import urllib.parse
import re

urls = [
    'https://www.fabianabarbosaadvogada.com.br/blog',
    'https://www.fabianabarbosaadvogada.com.br/post/audi%C3%AAncia-de-cust%C3%B3dia-o-que-a-fam%C3%ADlia-precisa-saber-e-como-pode-ajudar',
    'https://www.fabianabarbosaadvogada.com.br/post/familiar-preso-o-que-voc%C3%AA-deve-saber-nos-primeiros-momentos'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print('URL:', u, 'Len:', len(content))
            imgs = re.findall(r'https?://static\.wixstatic\.com/media/[^\s\"\'\<\>]+', content)
            print('  Found images:', len(imgs))
            for img in set(imgs):
                print('    -', img[:100])
    except Exception as e:
        print('Error fetching', u, e)
