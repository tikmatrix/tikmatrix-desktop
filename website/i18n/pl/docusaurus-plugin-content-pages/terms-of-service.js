import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Warunki Usługi"
            description="Warunki Usługi TikMatrix - Zasady i wytyczne korzystania z naszej platformy">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Warunki Usługi</h1>
                    <p>Ostatnia aktualizacja: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Akceptacja Warunków</h2>
                    <p>Uzyskując dostęp do strony internetowej i usług TikMatrix lub korzystając z nich, zgadzasz się być związany niniejszymi Warunkami Usługi oraz wszystkimi obowiązującymi przepisami i regulacjami. Jeśli nie zgadzasz się z którymikolwiek z tych warunków, zabronione jest korzystanie z tej strony lub dostęp do niej.</p>

                    <h2>2. Licencja Użytkowania</h2>
                    <p>Zezwala się na tymczasowe pobranie jednej kopii materiałów ze strony internetowej TikMatrix wyłącznie do celów osobistych, niekomercyjnych i tymczasowego przeglądania. Jest to udzielenie licencji, a nie przeniesienie tytułu własności, a na podstawie tej licencji nie możesz:</p>
                    <ul>
                        <li>Modyfikować ani kopiować materiałów</li>
                        <li>Używać materiałów do celów komercyjnych lub w celu publicznej prezentacji</li>
                        <li>Próbować inżynierii wstecznej dowolnego oprogramowania zawartego na stronie internetowej TikMatrix</li>
                        <li>Usuwać żadnych praw autorskich ani innych oznaczeń własności z materiałów</li>
                        <li>Przekazywać materiały innej osobie lub „lustrzanie" materiałów na jakimkolwiek innym serwerze</li>
                    </ul>
                    <p>Ta licencja zostanie automatycznie rozwiązana, jeśli naruszysz którekolwiek z tych ograniczeń i może zostać rozwiązana przez TikMatrix w dowolnym momencie.</p>

                    <h2>3. Usługi i Subskrypcja</h2>
                    <p>TikMatrix udostępnia narzędzia programowe do zarządzania kontami TikTok i automatyzacji marketingu. Dostęp do tych usług może wymagać subskrypcji lub jednorazowej płatności. Subskrybując nasze usługi, zgadzasz się:</p>
                    <ul>
                        <li>Podczas okresu próbnego możesz anulować subskrypcję w dowolnym momencie. Jeśli subskrypcja nie zostanie anulowana, zostanie automatycznie przekonwertowana na płatną subskrypcję.</li>
                        <li>Podać dokładne i kompletne informacje rozliczeniowe</li>
                        <li>Płacić wszystkie opłaty według stawek obowiązujących w momencie ich poniesienia</li>
                        <li>Nie używać usług do celów nielegalnych lub z naruszeniem jakichkolwiek obowiązujących przepisów lub regulacji</li>
                    </ul>

                    <h2>4. Zachowanie Użytkownika</h2>
                    <p>Podczas korzystania z naszych usług zgadzasz się nie:</p>
                    <ul>
                        <li>Naruszać obowiązujących przepisów lub regulacji</li>
                        <li>Naruszać praw innych osób</li>
                        <li>Rozpowszechniać złośliwego oprogramowania ani angażować się w inne szkodliwe działania</li>
                        <li>Próbować uzyskać nieautoryzowany dostęp do naszych systemów lub kont innych użytkowników</li>
                        <li>Używać naszych usług w sposób, który może uszkodzić, wyłączyć, przeciążyć lub zakłócić nasze usługi</li>
                    </ul>

                    <h2>5. Własność Intelektualna</h2>
                    <p>Nazwa, logo, oprogramowanie i treść TikMatrix są wyłączną własnością TikMatrix i jej licencjodawców. Nasze usługi i wszystkie treści zawarte lub udostępniane za pośrednictwem naszych usług są chronione prawami własności intelektualnej.</p>

                    <h2>6. Zastrzeżenie</h2>
                    <p>Materiały na stronie internetowej TikMatrix oraz świadczone usługi są dostarczane „tak jak są". TikMatrix nie udziela żadnych gwarancji, wyraźnych ani dorozumianych, i niniejszym zrzeka się wszelkich innych gwarancji, w tym między innymi gwarancji dorozumianych przydatności handlowej lub przydatności do określonego celu.</p>

                    <h2>7. Ograniczenie Odpowiedzialności</h2>
                    <p>W żadnym wypadku TikMatrix ani jej dostawcy nie ponoszą odpowiedzialności za jakiekolwiek szkody wynikające z użytkowania lub niemożności użytkowania materiałów lub usług, nawet jeśli TikMatrix zostało powiadomione o możliwości wystąpienia takiej szkody.</p>

                    <h2>8. Prawo Właściwe</h2>
                    <p>Niniejsze Warunki podlegają prawu obowiązującemu w jurysdykcji, w której TikMatrix ma siedzibę, i będą interpretowane zgodnie z tym prawem, bez względu na jego przepisy dotyczące konfliktu przepisów.</p>

                    <h2>9. Zmiany w Warunkach</h2>
                    <p>TikMatrix zastrzega sobie prawo do modyfikacji niniejszych Warunków w dowolnym momencie. Powiadomimy użytkowników o wszelkich zmianach poprzez aktualizację daty „Ostatnia aktualizacja" niniejszych Warunków. Dalsze korzystanie z naszej strony internetowej i usług po wprowadzeniu zmian oznacza akceptację zmodyfikowanych Warunków.</p>

                    <h2>10. Kontakt</h2>
                    <p>Jeśli masz pytania dotyczące niniejszych Warunków, skontaktuj się z nami:</p>
                    <p>E-mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 