# Konfigurasi Work Profile

TikMatrix mendukung konfigurasi pengguna Work Profile terpisah untuk setiap perangkat, ini sangat berguna untuk menggunakan perangkat enterprise atau aplikasi dual.

## Apa itu Work Profile

Work Profile adalah fitur Android yang memungkinkan pembuatan lingkungan kerja independen di perangkat yang sama. Dengan mengkonfigurasi user ID yang berbeda, Anda dapat:

- Menggunakan TikMatrix secara normal di perangkat yang dikelola enterprise
- Mengatur konfigurasi pengguna berbeda untuk lingkungan aplikasi yang berbeda
- Mencapai manajemen perangkat dan kontrol izin yang lebih detail

## Menggunakan Alat Shelter untuk Mengkloning Aplikasi

Sebelum mengkonfigurasi Work Profile, Anda perlu menggunakan alat Shelter untuk mengkloning aplikasi TikTok dan TikMatrix:

### Apa itu Shelter

Shelter adalah aplikasi open source yang dapat membuat dan mengelola Work Profile di perangkat Android. Ini memungkinkan Anda menjalankan aplikasi duplikat dalam lingkungan kerja yang terisolasi.

### Menginstal Shelter

1. Unduh Shelter dari [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) atau [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Instal dan buka Shelter di perangkat
3. Ikuti wizard pengaturan untuk membuat Work Profile

### Mengkloning Aplikasi yang Diperlukan

Setelah mengatur Shelter, Anda perlu mengkloning aplikasi TikTok dan TikMatrix:

1. **Kloning Aplikasi TikTok**:
   - Buka Shelter dan buka tab "Main"
   - Temukan TikTok dalam daftar aplikasi
   - Klik tombol "Clone to Work Profile"
   - Tunggu proses kloning selesai

2. **Kloning Aplikasi TikMatrix**:
   - Di Shelter, temukan TikMatrix dalam daftar aplikasi
   - Klik tombol "Clone to Work Profile"
   - Konfirmasi operasi kloning

### Verifikasi Kloning Berhasil

Setelah kloning berhasil:

- Anda akan melihat TikTok dan TikMatrix dengan ikon briefcase di app drawer
- Ini adalah versi Work Profile dari aplikasi
- Aplikasi asli di profil utama tetap tidak berubah

## Cara Mengkonfigurasi Work Profile

### 1. Buka Toolbar Perangkat

Ketika perangkat Anda terhubung dan ditampilkan di antarmuka utama TikMatrix:

1. Klik dua kali kartu perangkat untuk masuk ke mode layar besar
2. Toolbar akan muncul di sisi kanan layar perangkat
3. Toolbar dalam keadaan tertutup secara default, akan otomatis terbuka saat mouse hover

### 2. Temukan Tombol Work Profile

Di bagian bawah toolbar, Anda akan melihat tombol ikon briefcase, ini adalah tombol konfigurasi Work Profile.

### 3. Atur User ID

1. Klik tombol ikon briefcase
2. Masukkan user ID di dialog yang muncul (misalnya: 10)
3. Klik tombol "Save"

### 4. Konfirmasi Konfigurasi

Setelah konfigurasi berhasil, sistem akan menampilkan pesan prompt "Pengaturan pengguna work profile telah disimpan".

## Penjelasan User ID

### User ID Umum

- **0**: Pengguna utama (pengguna default)
- **10**: Pengguna work profile pertama
- **11**: Pengguna work profile kedua
- User ID lebih lanjut dan seterusnya

### Cara Menemukan User ID

Jika Anda tidak yakin tentang user ID di perangkat, dapat mencarinya dengan cara berikut:

```bash
adb shell pm list users
```

Atau jalankan di alat debug TikMatrix:

```bash
pm list users
```

Contoh output:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Penyimpanan File Konfigurasi

Konfigurasi Work Profile akan otomatis tersimpan ke file `data/work_profile_user.json`, dengan format sebagai berikut:

```json
{
  "nomor_seri_perangkat1": "10",
  "nomor_seri_perangkat2": "0",
  "nomor_seri_perangkat3": "11"
}
```

## Mengelola Konfigurasi Perangkat

### Melihat Konfigurasi Saat Ini

Konfigurasi Work Profile setiap perangkat independen, Anda dapat:

1. Mengatur user ID yang berbeda untuk setiap perangkat
2. Memodifikasi konfigurasi pengguna perangkat yang ada kapan saja
3. Mengosongkan konfigurasi (masukkan nilai kosong dan simpan untuk menghapus konfigurasi)

### Manajemen Massal

Jika Anda perlu mengelola banyak perangkat, dapat langsung mengedit file `data/work_profile_user.json`:

1. Tutup aplikasi TikMatrix
2. Buka file konfigurasi
3. Tambahkan atau modifikasi konfigurasi perangkat sesuai format JSON
4. Restart TikMatrix

## Pemecahan Masalah

### Masalah Umum

#### Q: Eksekusi perintah gagal setelah mengatur Work Profile

A: Pastikan:

- Apakah user ID benar
- Apakah pengguna yang sesuai ada di perangkat
- Apakah memiliki izin yang cukup untuk mengakses pengguna tersebut

#### Q: Cara membatalkan konfigurasi Work Profile

A: Kosongkan kotak input user ID di dialog konfigurasi, lalu klik save.

#### Q: Bagaimana jika konfigurasi hilang

A: Konfigurasi disimpan di file JSON lokal, jika hilang dapat diatur ulang, atau restore file `data/work_profile_user.json` dari backup.

#### Q: Masalah terkait Shelter

A: Jika mengalami masalah terkait Shelter:

- **Kloning gagal**: Pastikan Anda memiliki izin administrator dan ruang penyimpanan yang cukup
- **Aplikasi kloning tidak terlihat**: Periksa apakah Work Profile di Shelter diaktifkan dengan benar
- **Aplikasi crash di Work Profile**: Coba kloning ulang aplikasi atau update Shelter
- **Tidak dapat menemukan aplikasi kloning**: Cari aplikasi dengan ikon briefcase di app drawer

## Praktik Terbaik

### Penggunaan Lingkungan Enterprise

1. **Manajemen Terpadu**: Atur user ID yang sama untuk semua perangkat enterprise
2. **Pemisahan Izin**: Gunakan user ID berbeda untuk membedakan tingkat izin berbeda
3. **Backup Konfigurasi**: Backup file `work_profile_user.json` secara berkala

### Penggunaan Pribadi

1. **Isolasi Aplikasi**: Atur lingkungan pengguna berbeda untuk aplikasi dengan tujuan berbeda
2. **Lingkungan Testing**: Gunakan user ID independen untuk testing aplikasi
3. **Perlindungan Privasi**: Tingkatkan keamanan privasi melalui pemisahan pengguna

### Manajemen Alat Shelter

1. **Update Berkala**: Jaga aplikasi Shelter tetap terkini untuk memastikan kompatibilitas
2. **Sinkronisasi Aplikasi**: Pastikan TikTok dan TikMatrix telah dikloning sebelum mengkonfigurasi Work Profile
3. **Backup Pengaturan Shelter**: Ekspor dan backup konfigurasi Shelter untuk pemulihan mudah
4. **Monitor Update Aplikasi**: Saat TikTok atau TikMatrix diupdate, Anda mungkin perlu memperbarui versi kloning

## Penjelasan Teknis

Fitur Work Profile dicapai dengan menambahkan parameter `--user` dalam perintah ADB:

```bash
# Tanpa menggunakan Work Profile
adb shell input tap 100 200

# Menggunakan Work Profile (user ID: 10)
adb shell --user 10 input tap 100 200
```

Ini memastikan perintah dijalankan dalam lingkungan pengguna yang benar, menghindari masalah izin dan konflik lingkungan.

---

Dengan mengkonfigurasi Work Profile secara wajar, Anda dapat menggunakan TikMatrix dengan lancar di berbagai lingkungan perangkat yang kompleks, meningkatkan efisiensi kerja dan kemudahan manajemen.
