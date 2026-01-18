---
sidebar_position: 2
title: API Manajemen Tugas
description: Referensi lengkap untuk endpoint manajemen tugas
---

Halaman ini mendokumentasikan semua endpoint API yang tersedia untuk mengelola tugas TikMatrix.

## Membuat Tugas

Membuat tugas baru untuk satu atau beberapa perangkat atau username.

- **Endpoint:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Parameter Permintaan

API mendukung dua mode untuk membuat tugas:

**Mode 1: Mode Perangkat** - Gunakan `serials` untuk membuat tugas untuk perangkat
**Mode 2: Mode Username** - Gunakan `usernames` untuk langsung membuat tugas untuk akun tertentu

| Parameter | Tipe | Wajib | Deskripsi |
|------|------|------|------|
| serials | string[] | Wajib bersyarat | Array nomor seri perangkat (wajib jika `usernames` tidak disediakan) |
| usernames | string[] | Wajib bersyarat | Array username (wajib jika `serials` tidak disediakan). Ketika parameter ini disediakan, tugas dibuat langsung untuk akun-akun ini. |
| script_name | string | Ya | Nama script yang akan dieksekusi |
| script_config | object | Ya | Parameter konfigurasi untuk script (lihat dokumentasi script terkait) |
| enable_multi_account | boolean | Tidak | Apakah mengaktifkan mode multi-akun (default: false). Hanya berlaku dalam mode perangkat. |
| start_time | string | Tidak | Waktu eksekusi terjadwal, format "HH:MM" |

### Script yang Didukung

| Nama Script | Deskripsi | Dokumentasi |
|----------|------|------|
| post | Posting video atau gambar ke TikTok/Instagram | [Konfigurasi Script Post](./post-script.md) |

### Contoh

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Lihat video baru saya! #trending #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Untuk parameter detail `script_config` dan lebih banyak contoh, lihat [Konfigurasi Script Post](./post-script.md).

### Response

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

## Daftar Tugas

Query tugas dengan kondisi filter opsional.

- **Endpoint:** `GET /api/v1/task`

| Parameter | Tipe | Wajib | Deskripsi |
|------|------|------|------|
| status | integer | Tidak | Filter berdasarkan status (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | Tidak | Filter berdasarkan nomor seri perangkat |
| script_name | string | Tidak | Filter berdasarkan nama script |
| source | string | Tidak | Filter berdasarkan sumber ("ui" atau "api") |
| page | integer | Tidak | Nomor halaman (default: 1) |
| page_size | integer | Tidak | Jumlah item per halaman (default: 20, maksimal: 100) |

## Dapatkan Detail Tugas

Dapatkan informasi detail untuk tugas tertentu.

- **Endpoint:** `GET /api/v1/task/{task_id}`

## Hapus Tugas

Hapus tugas. Jika tugas sedang berjalan, akan mencoba menghentikannya terlebih dahulu.

- **Endpoint:** `DELETE /api/v1/task/{task_id}`

## Hapus Tugas Secara Batch

Hapus beberapa tugas sekaligus, tugas yang sedang berjalan akan dihentikan terlebih dahulu.

- **Endpoint:** `DELETE /api/v1/task/batch`
- **Request Body:** `{ "task_ids": [1, 2, 3] }`

## Hentikan Tugas

Hentikan tugas yang sedang berjalan.

- **Endpoint:** `POST /api/v1/task/{task_id}/stop`

## Coba Lagi Tugas yang Gagal

Coba lagi satu tugas yang gagal.

- **Endpoint:** `POST /api/v1/task/{task_id}/retry`

## Coba Lagi Semua Tugas yang Gagal

Coba lagi semua tugas yang gagal sekaligus.

- **Endpoint:** `POST /api/v1/task/retry-all`

## Dapatkan Statistik Tugas

Dapatkan data statistik keseluruhan tugas.

- **Endpoint:** `GET /api/v1/task/stats`
- **Response:** Mengembalikan jumlah total, pending, running, completed, failed.

## Periksa Lisensi API

Periksa apakah lisensi Anda mendukung akses API.

- **Endpoint:** `GET /api/v1/license/check`
- **Catatan:** Paket Starter akan mengembalikan kode error 40301; paket Pro/Team/Business dapat mengakses API.
