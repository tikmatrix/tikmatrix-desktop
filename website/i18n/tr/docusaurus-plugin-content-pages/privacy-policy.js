import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Gizlilik Politikası"
            description="TikMatrix Gizlilik Politikası - Verilerinizi nasıl topluyoruz, kullanıyoruz ve koruyoruz">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Gizlilik Politikası</h1>
                    <p>Son güncelleme tarihi: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Giriş</h2>
                    <p>TikMatrix'e ("biz", "bizim" veya "şirket" olarak anılacaktır) hoş geldiniz. Kişisel bilgilerinizi ve gizlilik haklarınızı korumaya kararlıyız. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı, ifşa ettiğimizi ve koruduğumuzu açıklamaktadır.</p>

                    <h2>2. Topladığımız Bilgiler</h2>
                    <p>Web sitemizin ve hizmetlerimizin kullanıcılarından aşağıdakiler dahil olmak üzere çeşitli bilgi kategorileri toplayabiliriz:</p>
                    <ul>
                        <li><strong>Kişisel Bilgiler:</strong> Hizmetlerimize kaydolduğunuzda veya bizimle iletişime geçtiğinizde sağladığınız ad, e-posta adresi, telefon numarası ve diğer tanımlayıcılar.</li>
                        <li><strong>Teknik Bilgiler:</strong> Web sitemizi ziyaret ettiğinizde IP adresi, tarayıcı türü, işletim sistemi ve diğer teknik ayrıntılar.</li>
                        <li><strong>Kullanım Bilgileri:</strong> Web sitemiz ve hizmetlerimizle nasıl etkileşimde bulunduğunuz, kullanılan özellikler ve harcanan zaman dahil.</li>
                    </ul>

                    <h2>3. Bilgilerinizi Nasıl Kullanıyoruz</h2>
                    <p>Topladığımız bilgileri aşağıdakiler dahil olmak üzere çeşitli amaçlar için kullanabiliriz:</p>
                    <ul>
                        <li>Hizmetlerimizi sağlamak, işletmek ve sürdürmek</li>
                        <li>Deneyiminizi geliştirmek ve kişiselleştirmek</li>
                        <li>Güncellemeler, destek ve promosyonlar hakkında sizinle iletişim kurmak</li>
                        <li>Hizmetlerimizi geliştirmek için kullanım kalıplarını analiz etmek</li>
                        <li>Dolandırıcılığı önlemek ve güvenliği sağlamak</li>
                    </ul>

                    <h2>4. Bilgi Paylaşımı ve İfşası</h2>
                    <p>Bilgilerinizi aşağıdaki durumlarda paylaşabiliriz:</p>
                    <ul>
                        <li><strong>Hizmet Sağlayıcılar:</strong> İşimizi yürütmemize ve hizmetlerimizi sağlamamıza yardımcı olan üçüncü taraflarla.</li>
                        <li><strong>Yasal Gereklilikler:</strong> Yasal olarak gerekli olduğunda veya haklarımızı veya kullanıcı güvenliğini korumak için.</li>
                        <li><strong>İş Devri:</strong> Birleşme, devralma veya varlık satışı ile ilgili durumlarda.</li>
                    </ul>

                    <h2>5. Veri Güvenliği</h2>
                    <p>Kişisel bilgilerinizi korumak için uygun güvenlik önlemleri uyguluyoruz. Ancak, internet üzerinden iletimin veya elektronik depolamanın hiçbir yöntemi %100 güvenli değildir ve mutlak güvenliği garanti edemeyiz.</p>

                    <h2>6. Haklarınız</h2>
                    <p>Bulunduğunuz yere bağlı olarak, kişisel bilgileriniz üzerinde aşağıdakiler dahil olmak üzere belirli haklara sahip olabilirsiniz:</p>
                    <ul>
                        <li>Kişisel bilgilerinize erişim</li>
                        <li>Yanlış kişisel bilgileri düzeltme</li>
                        <li>Kişisel bilgilerinizi silme</li>
                        <li>Belirli işleme faaliyetlerine itiraz etme</li>
                        <li>Veri taşınabilirliği</li>
                    </ul>

                    <h2>7. Çocukların Gizliliği</h2>
                    <p>Hizmetlerimiz 16 yaşın altındaki bireylere yönelik değildir. Çocuklardan bilerek kişisel bilgi toplamayız.</p>

                    <h2>8. Bu Gizlilik Politikasındaki Değişiklikler</h2>
                    <p>Gizlilik politikamızı zaman zaman güncelleyebiliriz. Bu sayfada yeni gizlilik politikasını yayınlayarak ve "Son güncelleme tarihi"ni güncelleyerek herhangi bir değişikliği size bildireceğiz.</p>

                    <h2>9. Bize Ulaşın</h2>
                    <p>Bu gizlilik politikası hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:</p>
                    <p>E-posta: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}