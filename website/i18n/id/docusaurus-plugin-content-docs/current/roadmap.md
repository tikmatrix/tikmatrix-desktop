---
sidebar_position: 1
title: Posisi dan Roadmap Perangkat Lunak TikMatrix/IgMatrix
sidebar_label: Roadmap
description: Roadmap versi resmi, menjelaskan posisi TikMatrix/IgMatrix dalam ekosistem operasi otomatis, batasan kemampuan, dan rekomendasi peluncuran.
slug: roadmap
---

## Peta Alur Lengkap

![Roadmap TikMatrix/IgMatrix](/img/roadmap-zh.svg)

---

## Untuk Siapa Kami Menciptakan Nilai

- **Tim Kecil-Menengah/MCN/Brand/Tim Uji Coba**: Memerlukan eksekusi stabil "tindakan operasional berulang harian yang memerlukan simulasi manusia" pada skala 5～100 perangkat.
- **Pertumbuhan & Operasi Konten**: Memerlukan orkestrasi perilaku "massal namun tidak mekanis" yang dapat dikontrol tinggi, menyeimbangkan strategi keamanan dan efisiensi.

---

## Proposisi Nilai Inti (Mengapa Memilih TikMatrix/IgMatrix)

1. **Otomasi Massal yang Dapat Diorkestrasi**: Membangun pipeline yang dapat digunakan kembali dengan model "tugas → skrip → sumber data", mencakup tindakan penuh dari pemanasan, publikasi, interaksi, hingga pengumpulan data.
2. **Simulasi Manusia & Strategi Kontrol Risiko**: Mesin dilengkapi dengan mekanisme randomisasi urutan waktu, kontrol ritme, simulasi gerakan manusia-mesin, pemulihan gangguan, dll., untuk mendekati karakteristik perilaku manusia nyata.
3. **Skalabilitas & Stabilitas**: Mendukung campuran perangkat fisik/cloud, koneksi USB/TCP ADB, menjamin skalabilitas linear dan penjadwalan stabil dari 5→20→50→100 perangkat.
4. **Observabilitas Data**: Log tugas, screen mirroring perangkat, statistik akun, dan ekspor data hasil.

---

## Peta Fungsionalitas (Batasan Kemampuan Langkah 4)

### 1) Orkestrasi & Penjadwalan Tugas

- Strategi konkurensi multi-akun/multi-perangkat, randomisasi urutan eksekusi
- Retry kegagalan, lanjutan dari titik henti, manajemen penggunaan sumber daya (konten/akun/proxy)

### 2) Pusat Skrip

- **Skrip Super Marketing**: Telah mengintegrasikan kemampuan Boost pengguna/postingan, kirim DM massal, komentar massal, dll.
- Skrip pemanasan akun: browsing harian, durasi kunjungan, interaksi ringan
- Skrip publikasi konten: manajemen video/teks/tag/topik, publikasi terjadwal
- Skrip pengumpulan data: scraping informasi nama pengguna, membangun daftar target putaran berikutnya

### 3) Simulasi Manusia & Kontrol Risiko

- Randomisasi sentuhan/geser/jeda/durasi menonton
- Deteksi anomali dan pembatasan kecepatan, menghindari perilaku frekuensi tinggi sekali jalan

> **Deklarasi Batasan**: TikMatrix/IgMatrix tidak menyediakan perangkat, akun, atau proxy itu sendiri; kami fokus pada **otomasi tindakan operasional**.

---

## Rekomendasi Peluncuran (Dari 0 ke Skala)

1. **Periode Validasi (1–5 perangkat)**: Menghubungkan perangkat→akun→proxy→skrip tunggal dalam loop tertutup minimal
2. **Periode Pilot (10–20 perangkat)**: Memperkenalkan skrip Super Marketing + loop pengumpulan data; mengamati ambang batas kontrol risiko
3. **Periode Ekspansi (20–50 perangkat)**: Pembatasan kecepatan grup, strategi randomisasi, rotasi multi-sumber data
4. **Periode Skala (50-100 perangkat)**: Penjadwalan batch, eksekusi terstagger

---

## Peringatan Risiko & Kepatuhan

- Penggunaan alat otomasi mungkin melanggar ketentuan layanan platform; harap **tanggung risiko sendiri** dan kontrol frekuensi serta pola perilaku secara wajar
- Lingkungan perangkat keras ponsel, proxy, kualitas akun, dan strategi operasi akan secara signifikan mempengaruhi stabilitas dan hasil

---

## Pertanyaan Umum

**Q: Apakah TikMatrix menyediakan akun/proxy?**  
A: Tidak. Kami fokus pada mesin otomasi dan eksekusi skrip.

**Q: Apakah menyediakan cloud phone?**  
A: Tidak. Pengguna perlu menyiapkan lingkungan perangkat sendiri.

**Q: Apakah mendukung cloud phone?**  
A: Selama dapat terhubung stabil melalui ADB (USB/TCP), dapat dimasukkan ke dalam penjadwalan.

---

## Ajakan Bertindak

- Coba paket Starter sekarang, bangun loop tertutup "langkah 4" minimum yang layak
- Baca dokumentasi skrip, kuasai operasi massal dengan cepat
