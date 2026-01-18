---
sidebar_position: 6
title: Konfigurasi Script Pemanasan Akun
description: Referensi konfigurasi lengkap untuk script pemanasan akun
---

Halaman ini mendokumentasikan parameter konfigurasi untuk script `account_warmup` yang digunakan dalam pembuatan task.

## Ringkasan

Script `account_warmup` digunakan untuk memanaskan akun TikTok atau Instagram dengan mensimulasikan perilaku pengguna alami. Script ini akan menonton video dan secara acak melakukan like, follow, bookmark, dan comment berdasarkan probabilitas yang dikonfigurasi. Ini membantu akun baru membangun riwayat interaksi dan menghindari deteksi sebagai bot.

## Konfigurasi Script (`script_config`)

Objek `script_config` berisi parameter untuk script pemanasan akun. Berikut adalah parameter yang tersedia:

### Parameter

| Parameter | Tipe | Wajib | Default | Deskripsi |
|-----|------|------|-------|------|
| task_duration | number | Tidak | 600 | Durasi total task pemanasan (detik) |
| topic | string | Tidak | "" | Kata kunci topik pencarian (satu per baris, dipilih secara acak) |
| min_duration | number | Tidak | 15 | Durasi minimum menonton video (detik) |
| max_duration | number | Tidak | 30 | Durasi maksimum menonton video (detik) |
| like_probable | number | Tidak | 0 | Probabilitas untuk like video (0-100) |
| floow_probable | number | Tidak | 0 | Probabilitas untuk follow pembuat video (0-100) |
| collect_probable | number | Tidak | 0 | Probabilitas untuk bookmark video (0-100) |
| comment_probable | number | Tidak | 0 | Probabilitas untuk comment video (0-100) |
| comment | string | Tidak | "" | Template comment (satu per baris, dipilih secara acak) |
| insert_emoji | boolean | Tidak | false | Apakah menyisipkan emoji acak dalam comment |
| comment_order | string | Tidak | "random" | Urutan pemilihan comment: `random` (acak) atau `sequential` (berurutan) |
| generate_by_chatgpt | boolean | Tidak | false | Apakah menggunakan ChatGPT untuk menghasilkan comment |
| chatgpt_settings | object | Tidak | {} | Pengaturan konfigurasi ChatGPT (lihat di bawah) |

### Struktur Pengaturan ChatGPT

Ketika `generate_by_chatgpt` diatur ke `true`, Anda dapat mengkonfigurasi pembuatan comment ChatGPT menggunakan objek `chatgpt_settings`:

| Parameter | Tipe | Wajib | Deskripsi |
|-----|------|------|------|
| api_key | string | Ya | API key OpenAI Anda |
| model | string | Tidak | Model yang digunakan (default: "gpt-3.5-turbo"). Pilihan: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Tidak | Custom prompt untuk menghasilkan comment. Default menghasilkan comment ramah dan relevan |
| max_tokens | number | Tidak | Jumlah maksimum token untuk response (default: 100) |
| temperature | number | Tidak | Tingkat kreativitas 0-2 (default: 0.7). Nilai lebih tinggi = lebih kreatif |
| base_url | string | Tidak | URL endpoint API kustom (untuk Azure OpenAI atau API yang kompatibel) |

Contoh objek `chatgpt_settings`:

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "针对这个视频生成一条简短友好的中文评论",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip Rekomendasi
Untuk akun baru, disarankan mulai dari probabilitas interaksi rendah (5-15%) dan kemudian tingkatkan secara bertahap seiring waktu. Ini mensimulasikan perilaku pengguna alami.
:::

## Contoh

### Pemanasan Akun Dasar

Pemanasan sederhana dengan hanya menonton video:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 10,
      "max_duration": 30
    }
  }'
```

### Pemanasan dengan Pencarian Topik

Memanaskan akun dengan mencari topik tertentu:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "搞笑猫咪\n狗狗视频\n宠物合集",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### Pemanasan dengan Interaksi

Pemanasan lengkap termasuk like, follow, dan comment:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "美食\n食谱\n烹饪",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "太棒了!🔥\n喜欢这个内容!\n太好了!👏\n哇,太厉害了!",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### Pemanasan dengan Comment ChatGPT

Menggunakan ChatGPT untuk menghasilkan comment cerdas:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "科技评测\n数码产品",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "针对这个视频生成一条简短友好的评论"
      }
    }
  }'
```

### Pemanasan Batch Multi-Perangkat

Menjalankan pemanasan secara bersamaan pada beberapa perangkat:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20
    },
    "enable_multi_account": true
  }'
```

### Task Pemanasan Terjadwal

Menjadwalkan pemanasan untuk berjalan pada waktu tertentu:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "音乐\n舞蹈\n热门",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### Pemanasan Berdasarkan Daftar Username

Membuat task pemanasan untuk akun tertentu:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20,
      "floow_probable": 5
    }
  }'
```

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

## Best Practice

1. **Mulai dari Probabilitas Rendah**: Untuk akun baru, gunakan probabilitas interaksi rendah (5-15%) dan kemudian tingkatkan secara bertahap dalam beberapa hari/minggu.

2. **Gunakan Topik Relevan**: Pilih topik yang relevan dengan positioning akun Anda untuk membangun riwayat interaksi yang relevan.

3. **Variasikan Durasi Menonton**: Atur rentang antara min_duration dan max_duration untuk mensimulasikan pola menonton alami.

4. **Durasi Task Moderat**: Jalankan sesi pemanasan 2-3 kali per hari selama 10-30 menit setiap kali, daripada sesi panjang berkelanjutan.

5. **Gunakan Comment yang Beragam**: Sediakan beberapa template comment untuk menghindari pola berulang yang dapat memicu deteksi spam.

6. **Jadwalkan dengan Bijak**: Gunakan `start_time` untuk menjalankan task pemanasan selama jam aktif zona waktu audiens target Anda.

## Lihat Juga

- [API Manajemen Task](./task-management.md) - Membuat, mencantumkan, dan mengelola task
- [Konfigurasi Post Script](./post-script.md) - Mengkonfigurasi parameter post script
- [Konfigurasi Follow Script](./follow-script.md) - Mengkonfigurasi parameter follow script
- [Konfigurasi Unfollow Script](./unfollow-script.md) - Mengkonfigurasi parameter unfollow script
