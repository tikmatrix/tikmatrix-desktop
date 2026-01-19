---
sidebar_position: 1
title: TikMatrix/IgMatrix Ürün Konumlandırma & Yol Haritası
sidebar_label: Yol Haritası
description: TikMatrix/IgMatrix konumlandırması, kapasite sınırları ve kullanım önerilerini açıklayan resmi yol haritası.
slug: roadmap
---

## Tam Süreç Haritası

![TikMatrix/IgMatrix Roadmap](/img/roadmap-en.svg)

---

## Kimler için değer yaratıyoruz

- **KOBİ'ler / MCN'ler / markalar / deney ekipleri**: 5–100 cihaz ölçeğinde günlük ancak insan benzeri operasyonel eylemlerin istikrarlı yürütülmesine ihtiyaç duyar.
- **Büyüme ve içerik operasyonları**: Güvenlik ve verimliliği dengeleyen kontrol edilebilir toplu (ama mekanik olmayan) orkestrasyon gerektirir.

---

## Temel değer önerileri (neden TikMatrix/IgMatrix'i seçmelisiniz)

1. **Birleştirilebilir toplu otomasyon**: Isınma, yayınlama, etkileşim ve toplama kapsayan "görev → script → veri kaynağı" modeliyle yeniden kullanılabilir boru hatları oluşturun.
2. **İnsan benzeri davranış ve risk kontrolü**: Motor, gerçek kullanıcı davranışını taklit etmek için rastgeleleştirilmiş zamanlama, ritim kontrolü, insan jesti simülasyonu ve anormal kurtarma destekler.
3. **Ölçeklenebilirlik ve istikrar**: Gerçek cihazlar / bulut cihazları hibrit, USB/TCP ADB'yi destekler, güvenilir zamanlama ile 5→20→50→100 cihazların doğrusal ölçeklenmesini sağlar.
4. **Gözlemlenebilirlik**: Görev günlükleri, cihaz yansıtma, hesap istatistikleri ve dışa aktarılabilir sonuç verileri.

---

## Kapasite haritası (4. adımın kapsamı)

### 1) Görev orkestrasyonu ve zamanlama

- Çok hesaplı / çok cihazlı eşzamanlılık stratejileri, rastgeleleştirilmiş yürütme sırası
- Başarısızlıkta yeniden dene, kesme noktasından devam et, kaynak yönetimi (varlıklar/hesaplar/proxy'ler)

### 2) Script merkezi

- **Gelişmiş pazarlama scriptleri**: Kullanıcı/gönderi artırma, toplu DM'ler, toplu yorumları içerir
- Hesap ısınma scriptleri: Günlük gezinme, kalma, hafif etkileşimler
- İçerik yayınlama scriptleri: Video/altyazı/etiket/konu yönetimi, zamanlanmış yayınlama
- Veri toplama scriptleri: Kullanıcı bilgilerini topla ve sonraki hedef listelerini oluştur

### 3) İnsan ve risk kontrolü

- Dokunma/kaydırma/duraklama/görüntüleme zamanının rastgeleleştirilmesi
- Ani yüksek frekanslı davranışları önlemek için anomali algılama ve oran sınırları

> **Sınır beyanı**: TikMatrix/IgMatrix cihaz, hesap veya proxy sağlamaz; operasyonel eylemlerin otomasyonuna odaklanıyoruz.

---

## Kullanım önerileri (0'dan ölçeğe)

1. **Doğrulama (1–5 cihaz)**: Cihazları bağla → hesaplar → proxy'ler → tek script minimal kapalı döngü
2. **Pilot (10–20 cihaz)**: Gelişmiş pazarlama scriptleri + veri toplama döngüsü tanıt; risk eşiklerini izle
3. **Genişleme (20–50 cihaz)**: Grup oranı sınırlama, rastgeleleştirilmiş stratejiler, çok veri kaynağı rotasyonu
4. **Ölçek (50–100 cihaz)**: Toplu zamanlama, kademeli yürütme

---

## Riskler ve uyumluluk notları

- Otomasyon kullanımı platform şartlarını ihlal edebilir; kendi riskinizde kullanın ve frekans/davranış kalıplarını kontrol edin
- Cihaz donanımı, proxy'ler, hesap kalitesi ve operasyonel strateji istikrar ve sonuçları önemli ölçüde etkiler

---

## SSS

**S: TikMatrix hesap/proxy sağlıyor mu?**  
C: Hayır. Otomasyon motoruna ve script yürütmesine odaklanıyoruz.

**S: Bulut telefonları sağlıyor musunuz?**  
C: Hayır. Kullanıcılar cihaz ortamlarını kendileri hazırlamalıdır.

**S: Bulut telefonları destekliyor musunuz?**  
C: ADB (USB/TCP) yoluyla istikrarlı bir şekilde bağlanabilen herhangi bir cihaz zamanlanabilir.

---

## Harekete geçirme çağrısı

- Starter planını şimdi deneyin ve 4. adımınızın minimal uygulanabilir kapalı döngüsünü oluşturun
- Toplu operasyonlara başlamak için script belgelerini okuyun
