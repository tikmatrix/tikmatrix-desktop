---
sidebar_position: 1
title: Gambaran Umum API Lokal
description: API Lokal TikMatrix untuk mengelola tugas secara terprogram
---

TikMatrix menyediakan RESTful API lokal yang memungkinkan Anda mengelola tugas secara terprogram. Ini sangat berguna untuk mengintegrasikan TikMatrix ke dalam sistem otomasi Anda sendiri, membangun alur kerja kustom, atau membuat operasi batch.

## Persyaratan

:::warning Persyaratan Lisensi
**API Lokal hanya tersedia untuk pengguna paket Pro, Team, dan Business.** Paket Starter tidak menyediakan akses API.
:::

## Base URL

API berjalan secara lokal di:

```text
http://localhost:50809/api/v1/
```

:::note
Port `50809` adalah port default. Pastikan TikMatrix sedang berjalan sebelum mengirim permintaan.
:::

## Format Response

Semua response API mengikuti format berikut:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Penjelasan Kode Response

| Code | Deskripsi |
|------|------|
| 0 | Sukses |
| 40001 | Kesalahan parameter - Parameter permintaan tidak valid |
| 40002 | Kesalahan parameter - script_name tidak ada |
| 40003 | Kesalahan parameter - Script belum mendukung pemanggilan API |
| 40301 | Terlarang - Akses API memerlukan paket Pro+ |
| 40401 | Tidak ditemukan - Resource tidak ada |
| 50001 | Kesalahan internal server |

## Memulai Cepat

### 1. Periksa Akses API

Pertama, konfirmasi apakah lisensi Anda mendukung API:

```bash
curl http://localhost:50809/api/v1/license/check
```

Contoh response:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "plan_name": "Pro",
    "api_enabled": true,
    "device_limit": 20,
    "message": "API access enabled"
  }
}
```

### 2. Membuat Tugas

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Lihat video baru saya! #trending"
    },
    "enable_multi_account": false
  }'
```

### 3. Query Daftar Tugas

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Script yang Tersedia

:::info Dukungan Saat Ini
Saat ini, API Lokal mendukung script `post`, `follow`, `unfollow`, `account_warmup`, dan `comment`. Lebih banyak script akan ditambahkan di versi mendatang.
:::

Parameter `script_name` dapat menerima nilai berikut:

| Nama Script | Deskripsi | Dukungan API |
|--------|------|----------|
| `post` | Posting konten | ✅ Didukung |
| `follow` | Mengikuti pengguna | ✅ Didukung |
| `unfollow` | Berhenti mengikuti | ✅ Didukung |
| `account_warmup` | Pemanasan akun | ✅ Didukung |
| `comment` | Komentar | ✅ Didukung |
| `like` | Suka | 🔜 Segera hadir |
| `message` | Pesan pribadi | 🔜 Segera hadir |
| `super_marketing` | Kampanye pemasaran super | 🔜 Segera hadir |
| `profile` | Perbarui profil | 🔜 Segera hadir |
| `scrape_user` | Scrape data pengguna | 🔜 Segera hadir |

## Status Tugas

| Kode Status | Teks Status | Deskripsi |
|--------|----------|------|
| 0 | pending | Tugas menunggu eksekusi |
| 1 | running | Tugas sedang dieksekusi |
| 2 | completed | Tugas berhasil dieksekusi |
| 3 | failed | Tugas gagal dieksekusi |

## Selanjutnya

- [API Manajemen Tugas](./task-management) - Membuat, query, dan mengelola tugas
- [Konfigurasi Script Post](./post-script) - Konfigurasi parameter script post
- [Konfigurasi Script Follow](./follow-script) - Konfigurasi parameter script follow
- [Konfigurasi Script Unfollow](./unfollow-script) - Konfigurasi parameter script unfollow
- [Konfigurasi Script Account Warmup](./account-warmup-script) - Konfigurasi parameter script account warmup
- [Konfigurasi Script Comment](./comment-script) - Konfigurasi parameter script comment
- [Contoh API](./examples) - Contoh kode dalam berbagai bahasa
