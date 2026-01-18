---
sidebar_position: 4
title: Konfigurasi Script Follow
description: Referensi konfigurasi lengkap script follow
---

Halaman ini menjelaskan parameter konfigurasi untuk script `follow` saat membuat tugas.

## Ringkasan

Script `follow` digunakan untuk mengikuti pengguna secara otomatis di TikTok atau Instagram. Ketika Anda menyediakan beberapa pengguna target melalui API, **sistem akan membuat satu tugas untuk setiap pengguna target**. Anda dapat menggunakan parameter `start_time` untuk mengontrol waktu eksekusi tugas.

## Konfigurasi Script (`script_config`)

Objek `script_config` berisi parameter konfigurasi untuk script follow. Berikut adalah parameter yang tersedia:

### Parameter

| Parameter | Tipe | Wajib | Default | Deskripsi |
|------|------|------|--------|------|
| target_users | string[] | Ya* | [] | Array nama pengguna target yang akan diikuti (satu tugas per pengguna) |
| target_user | string | Ya* | "" | Nama pengguna tunggal, atau beberapa nama pengguna dipisahkan baris baru/koma |
| access_method | string | Tidak | "direct" | Cara navigasi ke profil pengguna: `direct` (melalui URL) atau `search` |

:::note
Anda harus menyediakan array `target_users` atau string `target_user`. Jika keduanya disediakan, `target_users` akan diprioritaskan.
:::

:::info Pembuatan Tugas
Ketika beberapa pengguna target disediakan, API akan **membuat satu tugas untuk setiap pengguna target**. Misalnya, jika Anda menentukan 3 pengguna target dan 2 perangkat, akan dibuat 6 tugas. Gunakan parameter `start_time` untuk mengontrol waktu eksekusi tugas.
:::

## Contoh

### Mengikuti Pengguna Tunggal

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@username_to_follow"],
      "access_method": "direct"
    }
  }'
```

### Mengikuti Beberapa Pengguna

Saat mengikuti beberapa pengguna, satu tugas dibuat per pengguna:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

Ini akan membuat 3 tugas terpisah yang dieksekusi segera.

### Menjadwalkan Tugas dengan Waktu Mulai

Gunakan `start_time` untuk menjadwalkan waktu mulai tugas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Mengikuti Pengguna dengan Metode Pencarian

Gunakan metode pencarian ketika akses URL langsung tidak bekerja:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Follow Batch Multi-Perangkat

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@influencer_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Response

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [201, 202, 203],
    "created_count": 3
  }
}
```

## Metode Akses

### Akses Langsung (`direct`)

- Membuka profil pengguna melalui URL: `tiktok.com/@username` atau `instagram.com/username`
- Lebih cepat dan lebih andal
- Direkomendasikan untuk sebagian besar kasus

### Akses Pencarian (`search`)

- Navigasi ke pencarian, masukkan nama pengguna, klik hasil
- Lebih lambat tetapi efektif ketika akses URL langsung diblokir
- Mungkin kurang akurat jika ada beberapa nama pengguna serupa

## Praktik Terbaik

1. **Gunakan start_time untuk Penjadwalan**: Gunakan parameter `start_time` untuk menjadwalkan waktu eksekusi tugas (format: "HH:MM").

2. **Prioritaskan Akses Langsung**: Metode akses `direct` lebih cepat dan lebih andal daripada `search`.

3. **Batch yang Wajar**: Jangan mengikuti terlalu banyak pengguna sekaligus. Sistem membuat satu tugas untuk setiap pengguna target, sehingga daftar besar akan menghasilkan banyak tugas.

## Lihat Juga

- [API Manajemen Tugas](./task-management.md) - Membuat, query, dan mengelola tugas
- [Konfigurasi Script Post](./post-script.md) - Konfigurasi parameter script post
- [Konfigurasi Script Unfollow](./unfollow-script.md) - Konfigurasi parameter script unfollow
