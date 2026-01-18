---
sidebar_position: 5
title: Konfigurasi Comment Script
description: Referensi konfigurasi lengkap untuk comment script
---

Halaman ini memperkenalkan parameter konfigurasi untuk script `comment` yang digunakan dalam pembuatan task.

## Ringkasan

Script `comment` digunakan untuk secara otomatis memposting comment pada postingan TikTok atau Instagram. Ketika Anda memberikan beberapa URL postingan target melalui API, **satu task dibuat untuk setiap URL postingan target**. Anda dapat mengontrol waktu eksekusi setiap task menggunakan parameter `start_time`.

## Konfigurasi Script (`script_config`)

Objek `script_config` berisi parameter untuk comment script. Berikut adalah parameter yang tersedia:

### Parameter

| Parameter | Tipe | Wajib | Default | Deskripsi |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Ya* | [] | Array URL postingan target untuk diberi comment (satu task per URL) |
| target_post_url | string | Ya* | "" | URL postingan target tunggal atau beberapa URL dipisahkan dengan newline/koma |
| comment_content | string | Ya | "" | Konten teks comment. Dapat berisi beberapa comment dipisahkan dengan newline |
| comment_order | string | Tidak | "random" | Cara memilih comment: `random` (acak) atau `sequential` (berurutan) |
| insert_emoji | boolean | Tidak | false | Apakah menyisipkan emoji acak dalam comment |
| comment_image_path | string | Tidak | "" | Path file gambar untuk comment gambar (hanya TikTok). Mendukung path absolut atau path relatif terhadap work_dir/upload/ |

:::note
Harus menyediakan array `target_post_urls` atau string `target_post_url`. Jika keduanya disediakan, `target_post_urls` diprioritaskan.
:::

:::tip Comment Gambar (Hanya TikTok)
Parameter `comment_image_path` memungkinkan Anda melampirkan gambar pada comment. Fitur ini **hanya didukung di TikTok** - comment Instagram tidak mendukung lampiran gambar. Gambar akan di-push ke perangkat dan dipilih sebagai gambar pertama dari galeri.
:::

:::info Pembuatan Task
Ketika beberapa URL postingan target disediakan, API akan **membuat satu task untuk setiap URL postingan target**. Misalnya, jika Anda menentukan 3 URL postingan dan 2 perangkat, akan dibuat 6 task. Gunakan parameter `start_time` untuk mengontrol kapan task mulai dieksekusi.
:::

## Contoh

### Comment Postingan Tunggal

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "精彩内容!🔥"
    }
  }'
```

### Menggunakan Beberapa Opsi Comment

Menyediakan beberapa comment dipisahkan dengan newline. Sistem akan memilih salah satu berdasarkan `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "视频太棒了!\n喜欢这个内容!\n继续加油!👏\n真的很不错!",
      "comment_order": "random"
    }
  }'
```

### Comment Beberapa Postingan

Ketika memberi comment beberapa postingan, satu task dibuat untuk setiap postingan:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_urls": [
        "https://www.tiktok.com/@user1/video/111",
        "https://www.tiktok.com/@user2/video/222",
        "https://www.tiktok.com/@user3/video/333"
      ],
      "comment_content": "好视频!\n太棒了!\n喜欢!",
      "comment_order": "sequential"
    }
  }'
```

Ini akan membuat 3 task terpisah yang dieksekusi segera.

### Comment Terjadwal

Gunakan `start_time` untuk menjadwalkan kapan task mulai dieksekusi:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "定时评论!"
    },
    "start_time": "14:30"
  }'
```

### Comment dengan Penyisipan Emoji

Mengaktifkan penyisipan emoji otomatis untuk membuat comment lebih menarik:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "这太棒了",
      "insert_emoji": true
    }
  }'
```

### Comment dalam Mode Daftar Username

Membuat task comment langsung untuk akun tertentu:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "视频不错!"
    }
  }'
```

### Comment Batch pada Multi-Perangkat

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "内容很棒!\n出色的作品!\n太喜欢了!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Contoh Comment Instagram

API yang sama berlaku untuk postingan Instagram:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "美丽的照片!📸",
      "insert_emoji": true
    }
  }'
```

### Contoh Comment Gambar TikTok

Lampirkan gambar pada comment TikTok Anda (tidak didukung Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "看看这张图片!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Path Gambar
`comment_image_path` dapat berupa:

- **Path absolut**: `C:/images/my_image.jpg` atau `/home/user/images/my_image.jpg`
- **Path relatif**: `my_image.jpg` (relatif terhadap `work_dir/upload/`)

:::

## Response

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301, 302, 303],
    "created_count": 3
  }
}
```

## Urutan Comment

### Urutan Acak (`random`)

- Memilih comment secara acak dari daftar yang disediakan
- Cocok untuk membuat comment terlihat lebih alami
- Perilaku default

### Berurutan (`sequential`)

- Memilih comment secara berurutan berdasarkan `job_count`
- Task pertama menggunakan comment pertama, task kedua menggunakan comment kedua, dst
- Loop kembali ke awal saat mencapai akhir daftar
- Cocok untuk mendistribusikan comment berbeda di antara beberapa task

## Format URL Postingan

### TikTok

```text
https://www.tiktok.com/@username/video/1234567890123456
https://vm.tiktok.com/ABCDEFG/
```

### Instagram

```text
https://www.instagram.com/p/ABCDEFGHIJK/
https://www.instagram.com/reel/ABCDEFGHIJK/
```

## Best Practice

1. **Variasikan Comment Anda**: Sediakan beberapa opsi comment untuk menghindari terlihat seperti spam.

2. **Gunakan Mode Berurutan untuk Keragaman**: Ketika memberi comment beberapa postingan dengan perangkat yang sama, gunakan urutan `sequential` untuk mendistribusikan comment berbeda.

3. **Aktifkan Penyisipan Emoji**: Atur `insert_emoji: true` untuk membuat comment terlihat lebih alami dan menarik.

4. **Jadwalkan Task**: Gunakan parameter `start_time` untuk menyebarkan comment dalam periode waktu tertentu, mengurangi kemungkinan memicu batas frekuensi.

5. **Patuhi Batasan Platform**: Jangan membuat terlalu banyak task comment sekaligus. Sebagian besar platform memiliki batas frekuensi untuk comment.

## Kode Error

| Kode | Deskripsi |
|------|-------------|
| 40001 | URL postingan target atau konten comment hilang |
| 40003 | Script tidak didukung API |
| 40301 | Akses API memerlukan paket Pro+ |

## Lihat Juga

- [API Manajemen Task](./task-management.md) - Membuat, mencantumkan, dan mengelola task
- [Konfigurasi Post Script](./post-script.md) - Mengkonfigurasi parameter post script
- [Konfigurasi Follow Script](./follow-script.md) - Mengkonfigurasi parameter follow script
- [Ringkasan Local API](./local-api.md) - Ringkasan API dan panduan cepat
