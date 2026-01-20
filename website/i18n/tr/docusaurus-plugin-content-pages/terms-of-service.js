import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Hizmet Şartları"
            description="TikMatrix Hizmet Şartları - Platformumuzu kullanma kuralları ve yönergeleri">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Hizmet Şartları</h1>
                    <p>Son güncelleme tarihi: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Şartların Kabulü</h2>
                    <p>TikMatrix web sitesine ve hizmetlerine erişerek veya bunları kullanarak, bu hizmet şartları ve tüm geçerli yasa ve yönetmeliklere bağlı kalmayı kabul edersiniz. Bu şartlardan herhangi birini kabul etmiyorsanız, bu web sitesini kullanmanız veya erişmeniz yasaktır.</p>

                    <h2>2. Kullanım Lisansı</h2>
                    <p>TikMatrix web sitesindeki materyallerin (bilgi veya yazılım) yalnızca kişisel, ticari olmayan geçici görüntüleme için geçici olarak indirilmesine izin verilir. Bu bir lisans verilmesidir, mülkiyet devri değildir ve bu lisans altında şunları yapamazsınız:</p>
                    <ul>
                        <li>Materyalleri değiştirmek veya kopyalamak</li>
                        <li>Materyalleri herhangi bir ticari amaç veya kamuya açık gösterim için kullanmak</li>
                        <li>TikMatrix web sitesinde bulunan herhangi bir yazılımda tersine mühendislik yapmaya çalışmak</li>
                        <li>Materyallerden herhangi bir telif hakkı veya diğer özel işaretleri kaldırmak</li>
                        <li>Materyalleri başka birine devretmek veya herhangi bir başka sunucuda materyalleri "yansıtmak"</li>
                    </ul>
                    <p>Bu kısıtlamalardan herhangi birini ihlal ederseniz, bu lisans otomatik olarak sona erecektir ve TikMatrix tarafından herhangi bir zamanda sonlandırılabilir.</p>

                    <h2>3. Hizmetler ve Abonelikler</h2>
                    <p>TikMatrix, TikTok hesap yönetimi ve pazarlama otomasyonu için yazılım araçları sağlar. Bu hizmetlere erişim abonelik veya tek seferlik ödeme gerektirebilir. Hizmetlerimize abone olarak şunları kabul edersiniz:</p>
                    <ul>
                        <li>Deneme süresi boyunca aboneliği istediğiniz zaman iptal edebilirsiniz, iptal etmezseniz otomatik olarak ücretli aboneliğe geçecektir</li>
                        <li>Doğru ve eksiksiz fatura bilgileri sağlamak</li>
                        <li>Ücretlerin oluştuğu sırada geçerli olan tüm ücretleri ödemek</li>
                        <li>Hizmeti herhangi bir yasadışı amaç için veya herhangi bir geçerli yasa veya düzenlemeyi ihlal edecek şekilde kullanmamak</li>
                    </ul>

                    <h2>4. Kullanıcı Davranışı</h2>
                    <p>Hizmetlerimizi kullanırken şunları yapmamayı kabul edersiniz:</p>
                    <ul>
                        <li>Herhangi bir geçerli yasa veya düzenlemeyi ihlal etmek</li>
                        <li>Başkalarının haklarını ihlal etmek</li>
                        <li>Kötü amaçlı yazılım dağıtmak veya diğer zararlı faaliyetlerde bulunmak</li>
                        <li>Sistemlerimize veya diğer kullanıcıların hesaplarına yetkisiz erişim sağlamaya çalışmak</li>
                        <li>Hizmetlerimize zarar verebilecek, devre dışı bırakabilecek, aşırı yükleyebilecek veya bozabilecek herhangi bir şekilde hizmetlerimizi kullanmak</li>
                    </ul>

                    <h2>5. Fikri Mülkiyet</h2>
                    <p>TikMatrix adı, logoları, yazılımı ve içeriği, TikMatrix ve lisans verenlerinin münhasır mülkiyetidir. Hizmetimiz ve hizmetimiz aracılığıyla içerilen veya sağlanan tüm içerik fikri mülkiyet yasaları tarafından korunmaktadır.</p>

                    <h2>6. Sorumluluk Reddi</h2>
                    <p>TikMatrix web sitesindeki materyaller ve sağlanan hizmetler "olduğu gibi" sağlanır. TikMatrix herhangi bir açık veya zımni garanti vermez ve özellikle belirli bir amaç için satılabilirlik veya uygunluk konusunda zımni garantiler dahil olmak üzere diğer tüm garantileri reddeder.</p>

                    <h2>7. Sorumluluk Sınırlaması</h2>
                    <p>Hiçbir durumda TikMatrix veya tedarikçileri, materyallerin veya hizmetlerin kullanımından veya kullanılamamasından kaynaklanan herhangi bir zarardan sorumlu tutulamaz; TikMatrix bu tür bir zararın olasılığı konusunda bilgilendirilmiş olsa bile.</p>

                    <h2>8. Uygulanacak Yasa</h2>
                    <p>Bu şartlar, TikMatrix'in kurulduğu yerin yasa ve yönetmeliklerine göre yönetilecek ve yorumlanacaktır; yasa çatışmaları hükümlerine bakılmaksızın.</p>

                    <h2>9. Şartlarda Değişiklikler</h2>
                    <p>TikMatrix, bu şartları herhangi bir zamanda değiştirme hakkını saklı tutar. Bu şartların "Son güncelleme tarihi"ni güncelleyerek kullanıcılara herhangi bir değişikliği bildireceğiz. Herhangi bir değişiklikten sonra web sitemizi ve hizmetlerimizi kullanmaya devam etmeniz, değiştirilmiş şartları kabul ettiğinizi gösterir.</p>

                    <h2>10. Bize Ulaşın</h2>
                    <p>Bu şartlar hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:</p>
                    <p>E-posta: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}