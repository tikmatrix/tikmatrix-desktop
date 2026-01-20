import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="O Nas"
            description="Dowiedz się więcej o TikMatrix - kim jesteśmy, nasza misja i wizja">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>O Nas</h1>

                    <h2>Profil Firmy</h2>
                    <p>TikMatrix jest rozwijany przez TikMatrix LLC, zarejestrowaną w stanie Wyoming, Stany Zjednoczone. Od momentu założenia jesteśmy zaangażowani w tworzenie innowacyjnych narzędzi marketingu w mediach społecznościowych, aby pomóc firmom i twórcom treści zmaksymalizować ich wpływ online.</p>

                    <h2>Nasza Misja</h2>
                    <p>Naszą misją jest rozwijanie potężnych, łatwych w użyciu narzędzi marketingu w mediach społecznościowych, aby pomóc firmom każdej wielkości w skutecznym rozwijaniu ich obecności online. Dążymy do tego, aby zaawansowane technologie marketingowe były dostępne dla wszystkich.</p>

                    <h2>Nasze Produkty</h2>
                    <p>Nasz flagowy produkt TikMatrix został zaprojektowany do profesjonalnego zarządzania kontami TikTok i automatyzacji marketingu. Oferujemy również narzędzia uzupełniające dla innych platform:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Profesjonalne narzędzie do zarządzania kontami TikTok i marketingu</li>
                        <li><strong>IgMatrix</strong> - Rozwiązanie do marketingu i zarządzania kontami Instagram</li>
                        <li><strong>VideoMagic</strong> - Narzędzie do tworzenia i optymalizacji treści wideo</li>
                        <li><strong>YtMatrix</strong> - Platforma do rozwoju i zarządzania kanałami YouTube</li>
                    </ul>

                    <h2>Nasza Technologia</h2>
                    <p>W TikMatrix wykorzystujemy najnowocześniejsze technologie, aby zapewnić niezawodne, wydajne i bezpieczne narzędzia marketingu w mediach społecznościowych. Nasz zespół programistów nieustannie pracuje nad ulepszaniem produktów i wdrażaniem najnowszych innowacji branżowych, zapewniając naszym użytkownikom zawsze dostęp do najlepszych narzędzi marketingowych.</p>

                    <h2>Nasze Wartości</h2>
                    <p>Mocno wierzymy w:</p>
                    <ul>
                        <li><strong>Innowacyjność</strong> - Ciągłe ulepszanie naszych produktów, aby sprostać zmieniającym się potrzebom rynku</li>
                        <li><strong>Niezawodność</strong> - Zapewnienie stabilnego i bezpiecznego działania naszych narzędzi</li>
                        <li><strong>Dostępność</strong> - Udostępnienie zaawansowanych narzędzi marketingowych firmom każdej wielkości</li>
                        <li><strong>Sukces Klienta</strong> - Priorytetowe traktowanie rozwoju i osiągnięć użytkowników</li>
                    </ul>

                    <h2>Dołącz Do Nas</h2>
                    <p>Niezależnie od tego, czy jesteś właścicielem małej firmy, twórcą treści, czy specjalistą ds. marketingu, TikMatrix zapewnia narzędzia potrzebne do odniesienia sukcesu w dzisiejszym konkurencyjnym środowisku mediów społecznościowych. Nasz zespół jest zaangażowany w pomoc w osiągnięciu celów marketingowych i rozszerzeniu obecności online.</p>

                    <h2>Skontaktuj Się Z Nami</h2>
                    <p>Masz pytania lub potrzebujesz pomocy? Jesteśmy tu dla Ciebie!</p>
                    <p>E-mail: support@tikmatrix.com</p>
                    <p>Dołącz do naszej społeczności: <a href="https://t.me/tikmatrix_agent_bot">Grupa Wsparcia Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
}