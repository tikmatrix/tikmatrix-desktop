---
sidebar_position: 9
---

# Pengaturan Fitur White Label

:::info Memerlukan Langganan Tahunan
Fitur white label hanya tersedia untuk pengguna **langganan tahunan**. Setelah membeli paket tahunan, hubungi customer service melalui [Telegram](https://t.me/tikmatrix_agent_bot) untuk mendapatkan kode unlock.
:::

Fitur white label memungkinkan Anda menyesuaikan identitas brand TikMatrix agar sesuai dengan citra perusahaan Anda. Anda dapat memodifikasi nama aplikasi, Logo, dan informasi brand untuk membuat versi TikMatrix yang dipersonalisasi.

## Fitur-fitur

### Pengaturan Dasar

- **Nama Aplikasi**: Sesuaikan nama tampilan aplikasi
- **Upload Logo**: Upload Logo utama kustom Anda (disarankan 128x128px)
- **Favicon**: Atur ikon kustom aplikasi

### Pengaturan Brand

- **Email Dukungan**: Alamat email dukungan pelanggan
- **Link Tutorial**: Link tutorial/dokumentasi kustom
- **Link Telegram**: Atur link grup atau channel Telegram Anda

### Saklar Fitur

- **Tampilkan Link Tutorial**: Kontrol tampilan link tutorial
- **Tampilkan Informasi Brand**: Kontrol tampilan informasi brand

## Metode Pengaturan

### Metode 1: Konfigurasi Antarmuka

1. Jalankan aplikasi TikMatrix
2. Klik ikon palet di title bar 🎨
3. Konfigurasikan parameter di dialog pengaturan white label:
   - **Nama Aplikasi**: Masukkan nama aplikasi kustom Anda
   - **Logo Utama**: Upload file logo Anda (PNG/JPG, disarankan 128x128px)
   - **Email Dukungan**: Masukkan alamat email dukungan Anda
   - **Link Tutorial**: Masukkan link tutorial kustom Anda
   - **Link Telegram**: Masukkan link grup/channel Telegram Anda
   - **Saklar Fitur**: Aktifkan/nonaktifkan tampilan link tutorial dan informasi brand
4. Klik "Save" untuk menerapkan pengaturan

### Metode 2: File Konfigurasi

1. Salin file konfigurasi contoh:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Edit file konfigurasi:

   ```json
   {
     "appName": "Nama Aplikasi Anda",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@yourcompany.com",
       "tutorialUrl": "https://yourcompany.com/docs",
       "telegramUrl": "https://t.me/yourgroup"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Simpan file dan restart aplikasi

### Metode 3: Alat Command Line

1. Masuk ke direktori proyek:

   ```bash
   cd tikmatrix-desktop
   ```

2. Jalankan alat konfigurasi:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Ikuti prompt untuk mengkonfigurasi setiap parameter secara bertahap

## Build Versi Kustom

### 1. Siapkan File Resource

```bash
# Letakkan file logo Anda di posisi yang benar
src/assets/your-logo.webp       # Logo Utama
public/your-favicon.ico        # Favicon Web
src-tauri/icons/               # Ikon Aplikasi (berbagai ukuran)
```

### 2. Konfigurasi Parameter Build

Gunakan alat command line atau edit konfigurasi secara manual:

```bash
# Menggunakan alat command line
node scripts/whitelabel-config.js

# Atau edit manual
src/config/whitelabel-build.json
```

### 3. Build Aplikasi

```bash
# Mode development
npm run dev

# Build production
npm run build

# Build aplikasi Tauri
npm run tauri build
```

## Prioritas Konfigurasi

Sistem menggunakan konfigurasi dalam urutan prioritas berikut:

1. **Konfigurasi Runtime**: `whitelabel_config` di LocalStorage browser
2. **Konfigurasi Build**: `src/config/whitelabel-build.json` (digunakan saat build)
3. **Konfigurasi Contoh**: `examples/whitelabel-config.json`
4. **Konfigurasi Default**: Nilai default bawaan

## Persyaratan Logo

### Logo Utama

- **Format**: PNG, JPG, atau SVG
- **Ukuran**: 128x128px (disarankan)
- **Background**: Background transparan (format PNG)
- **Penggunaan**: Title bar, splash screen, dialog about

### Favicon

- **Format**: ICO atau PNG
- **Ukuran**: 32x32px atau 16x16px
- **Penggunaan**: Tab browser, ikon jendela

### Ikon Aplikasi (untuk build)

- **Format**: PNG, ICO, ICNS
- **Ukuran**: 32x32, 128x128, 256x256, 512x512
- **Lokasi**: Direktori `src-tauri/icons/`

## Integrasi API

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Dapatkan konfigurasi saat ini
const config = getWhiteLabelConfig();

// Simpan konfigurasi baru
saveWhiteLabelConfig(newConfig);

// Reset ke nilai default
resetWhiteLabelConfig();

// Validasi konfigurasi
validateWhiteLabelConfig(config);
```

### Fungsi Utilitas

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Inisialisasi white label saat startup aplikasi
initWhiteLabel();

// Update judul dokumen
updateDocumentTitle('Nama Aplikasi Anda');

// Update ikon
updateFavicon('/path/to/favicon.ico');
```

## Praktik Terbaik

### Desain Logo

- Gunakan gambar resolusi tinggi untuk tampilan yang jernih
- Pertahankan citra brand yang konsisten di semua ukuran logo
- Uji efek logo pada background terang dan gelap
- Pastikan logo tetap terbaca di ukuran kecil

### Konsistensi Brand

- Gunakan warna dan font yang konsisten di seluruh antarmuka
- Tetap konsisten dengan pedoman brand Anda yang ada
- Uji antarmuka kustom di berbagai ukuran layar
- Pertahankan tampilan profesional

### Konfigurasi Link

- Gunakan HTTPS untuk semua link eksternal
- Uji semua link sebelum deployment
- Pastikan saluran dukungan dipantau dengan baik
- Jaga link dokumentasi tetap terkini

## Pemecahan Masalah

### Masalah Umum

**Logo tidak ditampilkan:**

- Periksa path file dan izin
- Verifikasi format gambar didukung
- Pastikan ukuran gambar sesuai
- Hapus cache browser dan restart aplikasi

**Konfigurasi tidak tersimpan:**

- Periksa izin file system
- Verifikasi sintaks JSON benar
- Pastikan direktori konfigurasi ada
- Coba jalankan sebagai administrator (jika diperlukan)

**Build gagal:**

- Verifikasi semua file resource ada
- Periksa sintaks file konfigurasi
- Pastikan format file ikon benar
- Lihat log build untuk kesalahan spesifik

### Mendapatkan Bantuan

Jika mengalami masalah dalam proses pengaturan white label:

1. Lihat bagian pemecahan masalah di atas
2. Periksa sintaks file konfigurasi
3. Hubungi dukungan teknis melalui [Telegram](https://t.me/tikmatrix_agent_bot)
4. Sertakan file konfigurasi dan informasi kesalahan Anda saat melaporkan masalah

## Lisensi dan Penggunaan

- Fitur white label hanya tersedia untuk pengguna langganan tahunan
- Hak brand kustom termasuk dalam langganan Anda
- Distribusi versi kustom mungkin memerlukan lisensi tambahan
- Hubungi customer service untuk opsi lisensi enterprise

---

**Perlu kode unlock?** Hubungi tim customer service melalui [Telegram](https://t.me/tikmatrix_agent_bot) dengan detail langganan tahunan Anda.
