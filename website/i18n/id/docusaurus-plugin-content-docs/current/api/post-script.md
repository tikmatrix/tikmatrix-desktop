---
sidebar_position: 3
title: Konfigurasi Script Post
description: Referensi konfigurasi lengkap untuk script Post
---

Halaman ini mendokumentasikan parameter konfigurasi untuk script `post` yang digunakan dalam pembuatan tugas.

## Ringkasan

Script `post` digunakan untuk memposting konten (video atau gambar) secara otomatis ke TikTok atau Instagram. Script ini mendukung berbagai metode posting, sumber material, dan opsi audio.

## Konfigurasi Script (`script_config`)

Objek `script_config` berisi parameter untuk script posting. Berikut adalah parameter yang tersedia:

### Parameter Umum (TikTok dan Instagram)

| Parameter | Tipe | Wajib | Default | Deskripsi |
|------|------|------|--------|------|
| content_type | integer | Tidak | 0 | Tipe konten: `0` = video, `1` = gambar |
| image_count | integer | Tidak | 1 | Jumlah gambar yang dipilih (ketika content_type = 1) |
| captions | string | Tidak | "" | Teks caption posting. Mendukung format spintax: `{opsi1\|opsi2\|opsi3}` |
| post_way | string | Tidak | "share" | Metode posting: `share`, `addButton`, atau `useSound` |
| material_source | string | Tidak | "materialLibrary" | Sumber material: `materialLibrary` (perpustakaan material) atau `localFolder` (folder lokal), diabaikan jika material_list disediakan |
| material_path | string | Wajib bersyarat | "" | Path folder lokal (wajib ketika material_source = "localFolder") |
| material_list | string[] | Tidak | [] | **Langsung meneruskan array path file material.** Ketika parameter ini disediakan, logika material_source dan material_path akan dilewati. Direkomendasikan untuk skenario otomasi API. |
| materials_tags | string | Tidak | "" | Tag material dipisahkan koma untuk filter dari perpustakaan material |
| upload_wait_time | integer | Tidak | 30 | Detik untuk menunggu upload selesai |
| sound_wait_time | integer | Tidak | 10 | Detik untuk menunggu audio dimuat |
| add_sound | string/integer | Tidak | "-1" | Opsi audio: `-1` = default, `0` = nonaktif, `1` = aktif, `custom` = gunakan audio kustom |
| sound_name | string | Wajib bersyarat | "" | Nama/URL audio (wajib ketika post_way = "useSound") |
| custom_sound_keyword | string | Wajib bersyarat | "" | Kata kunci untuk mencari audio kustom (wajib ketika add_sound = "custom") |
| origin_sound_volume | integer | Tidak | 50 | Volume audio asli (0-100) |
| add_sound_volume | integer | Tidak | 50 | Volume audio tambahan (0-100) |

### Parameter Khusus TikTok

| Parameter | Tipe | Wajib | Default | Deskripsi |
|------|------|------|--------|------|
| add_product_link | integer | Tidak | 0 | Tambahkan link produk: `0` = tidak, `1` = ya |

### Parameter Khusus Instagram

| Parameter | Tipe | Wajib | Default | Deskripsi |
|------|------|------|--------|------|
| placement | string | Tidak | "reel" | Lokasi posting: `reel` (reel) atau `story` (story) |

## Contoh

### Tugas Posting Dasar - Langsung Meneruskan Path Material

Ini adalah cara yang direkomendasikan untuk otomasi API - langsung meneruskan path file material, tanpa bergantung pada perpustakaan material atau pemindaian folder:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Lihat video baru saya! #trending #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Posting Menggunakan Perpustakaan Material (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Lihat video baru saya! #trending #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Membuat Tugas Posting Berdasarkan Daftar Username

Mode ini memungkinkan Anda membuat tugas langsung untuk akun tertentu, tanpa perlu mengetahui nomor seri perangkat mereka:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Lihat video baru saya! #trending #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Posting Menggunakan Folder Lokal (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Konten luar biasa! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Posting dengan Audio Kustom

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Menari dengan musik trending ini!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "trending dance 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Posting Menggunakan URL Audio Tertentu

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Menggunakan musik keren ini!",
      "material_source": "materialLibrary"
    }
  }'
```

### Posting Gambar (Carousel)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Lihat foto-foto ini! #carousel",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Response

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [101, 102],
    "created_count": 2
  }
}
```

## Dokumentasi Terkait

- [API Manajemen Tugas](./task-management.md) - Membuat, daftar, dan mengelola tugas
