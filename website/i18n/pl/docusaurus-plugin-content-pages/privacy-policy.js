import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Polityka Prywatności"
            description="Polityka Prywatności TikMatrix - Jak zbieramy, wykorzystujemy i chronimy Twoje dane">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Polityka Prywatności</h1>
                    <p>Ostatnia aktualizacja: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Wprowadzenie</h2>
                    <p>Witamy w TikMatrix („my", „nasz" lub „firma"). Jesteśmy zaangażowani w ochronę Twoich danych osobowych i prawa do prywatności. Niniejsza Polityka Prywatności wyjaśnia, jak zbieramy, wykorzystujemy, ujawniamy i chronimy Twoje informacje, gdy odwiedzasz naszą stronę internetową lub korzystasz z naszych usług.</p>

                    <h2>2. Informacje, które Zbieramy</h2>
                    <p>Możemy zbierać kilka rodzajów informacji od i o użytkownikach naszej strony internetowej i usług, w tym:</p>
                    <ul>
                        <li><strong>Dane Osobowe:</strong> Imię, adres e-mail, numer telefonu i inne identyfikatory, które podajesz podczas rejestracji w naszych usługach lub komunikacji z nami.</li>
                        <li><strong>Informacje Techniczne:</strong> Adres IP, typ przeglądarki, system operacyjny i inne szczegóły techniczne podczas odwiedzania naszej strony internetowej.</li>
                        <li><strong>Informacje o Użytkowaniu:</strong> Jak wchodzisz w interakcję z naszą stroną internetową i usługami, w tym używane funkcje i spędzony czas.</li>
                    </ul>

                    <h2>3. Jak Wykorzystujemy Twoje Informacje</h2>
                    <p>Możemy wykorzystywać zebrane informacje do różnych celów, w tym:</p>
                    <ul>
                        <li>Świadczenie, obsługa i utrzymanie naszych usług</li>
                        <li>Ulepszanie i personalizowanie Twojego doświadczenia</li>
                        <li>Komunikacja z Tobą na temat aktualizacji, wsparcia i promocji</li>
                        <li>Analiza wzorców użytkowania w celu ulepszenia naszych usług</li>
                        <li>Zapobieganie oszustwom i zapewnienie bezpieczeństwa</li>
                    </ul>

                    <h2>4. Udostępnianie i Ujawnianie Informacji</h2>
                    <p>Możemy udostępniać Twoje informacje w następujących sytuacjach:</p>
                    <ul>
                        <li><strong>Usługodawcy:</strong> Z osobami trzecimi, które pomagają nam prowadzić naszą działalność i świadczyć usługi.</li>
                        <li><strong>Wymagania Prawne:</strong> Gdy jest to wymagane przez prawo lub w celu ochrony naszych praw lub bezpieczeństwa użytkowników.</li>
                        <li><strong>Transfery Biznesowe:</strong> W związku z fuzją, przejęciem lub sprzedażą aktywów.</li>
                    </ul>

                    <h2>5. Bezpieczeństwo Danych</h2>
                    <p>Wdrażamy odpowiednie środki bezpieczeństwa w celu ochrony Twoich danych osobowych. Jednak żadna metoda transmisji przez Internet ani elektronicznego przechowywania nie jest w 100% bezpieczna i nie możemy zagwarantować absolutnego bezpieczeństwa.</p>

                    <h2>6. Twoje Prawa</h2>
                    <p>W zależności od Twojej lokalizacji możesz mieć pewne prawa dotyczące Twoich danych osobowych, w tym:</p>
                    <ul>
                        <li>Dostęp do Twoich danych osobowych</li>
                        <li>Poprawianie niedokładnych danych osobowych</li>
                        <li>Usuwanie Twoich danych osobowych</li>
                        <li>Sprzeciw wobec określonych działań przetwarzania</li>
                        <li>Przenośność danych</li>
                    </ul>

                    <h2>7. Prywatność Dzieci</h2>
                    <p>Nasze usługi nie są przeznaczone dla osób poniżej 16 roku życia. Nie zbieramy świadomie danych osobowych od dzieci.</p>

                    <h2>8. Zmiany w Polityce Prywatności</h2>
                    <p>Możemy od czasu do czasu aktualizować naszą Politykę Prywatności. Powiadomimy Cię o wszelkich zmianach, publikując nową Politykę Prywatności na tej stronie i aktualizując datę „Ostatnia aktualizacja".</p>

                    <h2>9. Kontakt</h2>
                    <p>Jeśli masz pytania dotyczące tej Polityki Prywatności, skontaktuj się z nami:</p>
                    <p>E-mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 