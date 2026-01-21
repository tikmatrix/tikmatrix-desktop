import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Hakkımızda"
            description="TikMatrix hakkında daha fazla bilgi edinin - Kimiz, misyonumuz ve vizyonumuz">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Hakkımızda</h1>

                    <h2>Şirket Hakkında</h2>
                    <p>TikMatrix, Wyoming, ABD'de kayıtlı TikMatrix LLC tarafından geliştirilmiştir. Kuruluşumuzdan bu yana, işletmelerin ve içerik oluşturucuların çevrimiçi etkilerini en üst düzeye çıkarmalarına yardımcı olmak için yenilikçi sosyal medya pazarlama araçları oluşturmaya kendimizi adadık.</p>

                    <h2>Misyonumuz</h2>
                    <p>Misyonumuz, her büyüklükteki işletmenin çevrimiçi varlığını verimli bir şekilde büyütmesine yardımcı olmak için güçlü ve kullanımı kolay sosyal medya pazarlama araçları geliştirmektir. Gelişmiş pazarlama teknolojisini herkes için erişilebilir hale getirmeye çalışıyoruz.</p>

                    <h2>Ürünlerimiz</h2>
                    <p>Amiral gemimiz ürünü TikMatrix, profesyonel TikTok hesap yönetimi ve pazarlama otomasyonu için tasarlanmıştır. Diğer platformlar için de tamamlayıcı araçlar sunuyoruz:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Profesyonel TikTok hesap yönetimi ve pazarlama aracı</li>
                        <li><strong>IgMatrix</strong> - Instagram pazarlama ve hesap yönetimi çözümü</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> - Video içerik oluşturma ve optimizasyon aracı</li>
                        <li><strong>YtMatrix</strong> - YouTube kanal büyüme ve yönetim platformu</li>
                    </ul>

                    <h2>Teknolojimiz</h2>
                    <p>TikMatrix'te, güvenilir, verimli ve güvenli sosyal medya pazarlama araçları sağlamak için en son teknolojiden yararlanıyoruz. Geliştirme ekibimiz, ürünlerimizi sürekli olarak geliştirmek ve en son endüstri yeniliklerini dahil etmek için çalışarak kullanıcılarımızın her zaman en iyi pazarlama araçlarına erişmesini sağlıyor.</p>

                    <h2>Değerlerimiz</h2>
                    <p>Şunlara inanıyoruz:</p>
                    <ul>
                        <li><strong>İnovasyon</strong> - Değişen pazar ihtiyaçlarını karşılamak için ürünlerimizi sürekli iyileştirme</li>
                        <li><strong>Güvenilirlik</strong> - Araçlarımızın sürekli, kararlı ve güvenli çalışmasını sağlama</li>
                        <li><strong>Erişilebilirlik</strong> - Gelişmiş pazarlama araçlarını her büyüklükteki işletme için erişilebilir kılma</li>
                        <li><strong>Müşteri Başarısı</strong> - Kullanıcılarımızın büyümesini ve başarısını önceliklendirme</li>
                    </ul>

                    <h2>Bize Katılın</h2>
                    <p>İster küçük bir işletme sahibi, ister içerik oluşturucu veya pazarlama uzmanı olun, TikMatrix günümüzün rekabetçi sosyal medya ortamında başarılı olmak için ihtiyacınız olan araçları sağlar. Ekibimiz, pazarlama hedeflerinize ulaşmanıza ve çevrimiçi varlığınızı genişletmenize yardımcı olmaya kendini adamıştır.</p>

                    <h2>Bize Ulaşın</h2>
                    <p>Sorularınız mı var veya yardıma mı ihtiyacınız var? Size yardımcı olmak için buradayız!</p>
                    <p>E-posta: support@tikmatrix.com</p>
                    <p>Topluluğumuza katılın: <a href="https://t.me/tikmatrix_agent_bot">Telegram Destek Grubu</a></p>
                </div>
            </div>
        </Layout>
    );
}