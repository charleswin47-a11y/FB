import urllib.request

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/css/style.css',
    'http://localhost:3000/js/main.js',
    'http://localhost:3000/assets/img/monograma-oficial.png',
    'http://localhost:3000/assets/img/logo-oficial-light.png',
    'http://localhost:3000/assets/img/cartao-visita-oficial.webp',
    'http://localhost:3000/assets/img/dra-fabiana-placeholder.svg'
]

all_passed = True
for u in urls:
    try:
        with urllib.request.urlopen(u) as resp:
            print(f"PASSED [200]: {u} ({len(resp.read())} bytes)")
    except Exception as e:
        print(f"FAILED: {u} - {e}")
        all_passed = False

if all_passed:
    print("\nALL ASSETS VERIFIED SUCCESSFULLY 100%!")
