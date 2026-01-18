---
sidebar_position: 2
---

# Masalah yang Diketahui

## Kesalahan Konflik Port

Jika pesan kesalahan berikut muncul di log:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)"
```

Ini menunjukkan adanya masalah konflik port. Untuk menyelesaikan masalah ini:

1. **Restart sepenuhnya perangkat lunak TikMatrix/IgMatrix** lalu coba lagi
2. **Hindari menggunakan perangkat lunak kontrol lain saat menggunakan TikMatrix/IgMatrix**, karena mereka dapat menyebabkan konflik port
3. Pastikan tidak ada aplikasi lain yang menggunakan port komunikasi yang sama

Kesalahan ini biasanya terjadi ketika beberapa aplikasi kontrol perangkat berjalan secara bersamaan, menyebabkan konflik port komunikasi.

## Kegagalan Skrip Cloud Phone

Pastikan bandwidth jaringan antara komputer Anda dan pusat data cloud phone cukup dan stabil. Untuk hasil terbaik, disarankan untuk menempatkan komputer dan pusat data cloud phone di negara atau wilayah yang sama untuk mengurangi latensi dan packet loss, sehingga memastikan tugas otomasi berjalan dengan stabil dan andal.

## Skrip Berjalan Tidak Stabil, Kesalahan Acak, Hasil Setiap Eksekusi Tidak Konsisten

Biasanya terkait dengan kualitas koneksi ADB. Jika menggunakan koneksi USB, coba ganti kabel data atau port USB; jika menggunakan koneksi wireless ADB, pastikan koneksi jaringan antara komputer dan perangkat stabil, dan kekuatan sinyal baik.

## Kegagalan Skrip Akibat Pembaruan Aplikasi TikTok/Instagram

Aplikasi TikTok dan Instagram akan diperbarui secara berkala, terkadang dapat menyebabkan skrip otomasi tidak berjalan normal. Silakan kirim tiket, kami akan memperbarui skrip sesegera mungkin untuk beradaptasi dengan versi terbaru aplikasi.
