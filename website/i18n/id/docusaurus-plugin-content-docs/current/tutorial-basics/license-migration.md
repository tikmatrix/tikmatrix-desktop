---
sidebar_position: 9
---

# Migrasi Lisensi

Transfer lisensi TikMatrix Anda dari satu komputer ke komputer lain. Ini sangat berguna saat upgrade hardware atau mengganti komputer.

## Persyaratan

- Lisensi valid di komputer saat ini (kode aktivasi atau langganan Stripe)
- Komputer target tidak memiliki lisensi TikMatrix yang ada
- Maksimum 5 kali migrasi per bulan diperbolehkan

## Langkah Migrasi

### Langkah 1: Buka Dialog Migrasi

1. Jalankan TikMatrix di komputer saat ini
2. Klik **ikon lisensi** di title bar
3. Klik tombol **"Migrate License"**

![Tombol migrasi lisensi](../img/migrate-button.webp)

### Langkah 2: Dapatkan ID Mesin Target

Di komputer target:

1. Instal dan jalankan TikMatrix
2. Klik **ikon lisensi** di title bar
3. Salin **Machine ID**
4. Kirim ID ini ke komputer saat ini

![ID mesin target](../img/target-machine-id.webp)

### Langkah 3: Validasi dan Migrasi

Kembali ke komputer saat ini:

1. Tempelkan **Target Machine ID** di dialog migrasi
2. Klik **"Validate"** untuk memeriksa kompatibilitas
3. Tinjau detail lisensi yang ditampilkan

![Validasi berhasil](../img/validation-success.webp)

1. Centang checkbox konfirmasi
2. Klik **"Migrate License"** dan konfirmasi

![Konfirmasi migrasi](../img/migration-confirm.webp)

### Langkah 4: Selesaikan Pengaturan

1. Tunggu migrasi selesai
2. Restart TikMatrix di komputer target
3. Lisensi Anda sekarang aktif di komputer baru

![Migrasi berhasil](../img/migration-success.webp)

## Peringatan Penting

⚠️ **Migrasi lisensi tidak dapat dibatalkan**

- Lisensi sepenuhnya ditransfer dari komputer sumber ke komputer target
- Komputer lama Anda segera kehilangan akses
- Maksimum 5 kali migrasi per bulan
- Kedua komputer memerlukan koneksi jaringan yang stabil

## Apa yang Dimigrasikan

### Pengguna Kode Aktivasi

- Status lisensi dan sisa hari
- Informasi kode lisensi

### Pengguna Langganan Stripe

- Status langganan dan informasi billing
- Tanggal perpanjangan dan detail paket

## Pemecahan Masalah

### Pesan Kesalahan Umum

#### "Target machine already has a license"

Komputer target sudah memiliki lisensi aktif. Migrasi hanya dapat dilakukan ke komputer yang tidak memiliki lisensi yang ada.

#### "Monthly migration limit exceeded"

Anda hanya dapat melakukan migrasi 5 kali per bulan. Tunggu hingga bulan depan atau hubungi customer service.

#### "Invalid machine ID format"

Pastikan Anda telah menyalin Machine ID lengkap dengan benar. Seharusnya minimal 10 karakter.

#### "Migration validation failed"

Periksa hal-hal berikut:

- Lisensi Anda saat ini aktif dan belum kadaluarsa
- Target machine ID benar
- Kedua komputer memiliki koneksi jaringan

### Mendapatkan Dukungan

Hubungi [Telegram customer service](https://t.me/tikmatrix_agent_bot) dan sediakan:

- Tangkapan layar pesan kesalahan
- Machine ID Anda saat ini dan target
- Deskripsi masalah

## FAQ

**Bisakah saya melakukan migrasi kembali ke komputer asli?**

Bisa, tetapi akan dihitung dalam batas migrasi bulanan Anda.

**Bagaimana dengan koneksi perangkat saya setelah migrasi?**

Koneksi perangkat terikat dengan komputer. Anda perlu menghubungkan ulang perangkat di komputer baru.

**Bisakah saya melakukan migrasi lisensi trial?**

Tidak bisa, hanya lisensi berbayar yang dapat dimigrasikan.

**Apakah migrasi memengaruhi sisa hari lisensi?**

Tidak, sisa hari Anda tetap sama setelah migrasi.
