---
slug: How-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: '"vcruntime140.dll Bulunamadı" Hatası Nasıl Düzeltilir'
authors:
  - "tikMatrix"
tags:
  - "vcruntime140.ddl not found"
  - "fixed"
  - "tikmatrix"
---
"vcruntime140.dll bulunamadı" hatası genellikle Microsoft Visual C++ Yeniden Dağıtılabilir paketinin yüklenmemiş veya bozulmuş olmasından kaynaklanır. İşte bu sorunu düzeltmek için adımlar:
<!--truncate-->
---

1. **Microsoft Visual C++ Yeniden Dağıtılabilir Paketini İndirin**:
   - [Microsoft Visual C++ Redistributable indirme sayfasına](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads) gidin.
   - Sisteminize uygun sürümü indirin (genellikle 64-bit sürüm, ancak uygulamanız 32-bit gerektiriyorsa ilgili sürümü indirin).

2. **Yeniden Dağıtılabilir Paketi Kurun**:
   - İndirilen yükleyiciyi çalıştırın ve ekrandaki talimatları izleyin.
   - Paketi zaten yüklediyseniz, yükleme sürecinde "Onar" seçeneğini seçerek kurulumu onarabilirsiniz.

3. **Bilgisayarı Yeniden Başlatın**:
   - Paketi yükledikten veya onardıktan sonra, tüm değişikliklerin etkili olmasını sağlamak için bilgisayarınızı yeniden başlatın.

4. **Güncellemeleri Kontrol Edin**:
   - Windows'unuzun en güncel olduğundan emin olun. `Ayarlar > Güncelleme ve Güvenlik > Windows Update`'e gidin ve güncellemeleri kontrol edin.

5. **TikMatrix'i Yeniden Yükleyin**:
   - Yukarıdaki adımlar işe yaramazsa, TikMatrix'i kaldırmayı ve yeniden yüklemeyi deneyin. En son sürümü resmi olarak indirdiğinizden emin olun.

Bu adımları denedikten sonra hata devam ederse, sistem dosyası hasarı gibi daha fazla sorun olup olmadığını kontrol etmek için Sistem Dosya Denetleyicisi aracını çalıştırmanız gerekebilir:

1. **Sistem Dosya Denetleyicisi (SFC) Çalıştırın**:
   - Komut İstemi'ni yönetici olarak açın (Başlat düğmesine sağ tıklayın ve "Komut İstemi (Yönetici)" veya "Windows PowerShell (Yönetici)" seçin).
   - `sfc /scannow` yazın ve Enter'a basın.
   - İşlemin tamamlanmasını bekleyin. SFC herhangi bir sorun bulursa, bunları onarmaya çalışacaktır.

Bu adımlar "vcruntime140.dll bulunamadı" hatasını çözmenize ve TikMatrix'in normal şekilde çalışmasını sağlamanıza yardımcı olmalıdır.
