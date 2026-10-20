import os
from PIL import Image

os.makedirs('assets/img', exist_ok=True)

logo_src = 'downloaded_assets/d92d3d_4db3b9a2dfd34978a86efe08b092a8c6.jpg'
img = Image.open(logo_src).convert('RGBA')

datas = img.getdata()
new_data = []
new_data_light = []

for item in datas:
    # item is (r, g, b, a)
    # Check if pixel is white or near white
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))
        new_data_light.append((255, 255, 255, 0))
    else:
        new_data.append(item)
        # If dark navy (r < 70, g < 70, b < 95), make it off-white for dark backgrounds
        if item[0] < 70 and item[1] < 70 and item[2] < 95:
            new_data_light.append((245, 243, 240, item[3]))
        else:
            new_data_light.append(item)

trans_logo = Image.new('RGBA', img.size)
trans_logo.putdata(new_data)

bbox = trans_logo.getbbox()
print("BBox:", bbox)
tight_logo = trans_logo.crop(bbox)
tight_logo.save('assets/img/logo-oficial.png', 'PNG')

# Also crop monogram only (the top part containing F B and scales)
# Let's inspect height: the text 'FABIANA BARBOSA ADVOGADA' is below the monogram
w, h = tight_logo.size
# Monogram is roughly the top 60% of the cropped area
monogram = tight_logo.crop((0, 0, w, int(h * 0.65)))
mono_bbox = monogram.getbbox()
if mono_bbox:
    monogram = monogram.crop(mono_bbox)
    monogram.save('assets/img/monograma-oficial.png', 'PNG')
    print("Saved monogram:", monogram.size)

# Dark-mode logo
logo_light = Image.new('RGBA', img.size)
logo_light.putdata(new_data_light)
tight_logo_light = logo_light.crop(bbox)
tight_logo_light.save('assets/img/logo-oficial-light.png', 'PNG')

# WebP version
tight_logo.save('assets/img/logo-oficial.webp', 'WEBP', quality=95)

# Business card
card = Image.open('downloaded_assets/d92d3d_7e52c505c5ae492cb5a89bda07898ef6.jpg')
card.save('assets/img/cartao-visita-oficial.webp', 'WEBP', quality=90)

print("All assets successfully processed!")
