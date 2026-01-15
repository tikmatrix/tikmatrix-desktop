import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Datenschutzrichtlinie"
            description="TikMatrix Datenschutzrichtlinie - wie wir Ihre Daten sammeln, verwenden und schützen">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Datenschutzrichtlinie</h1>
                    <p>Datum der letzten Aktualisierung: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Einleitung</h2>
                    <p>Willkommen bei TikMatrix (im Folgenden "wir", "unser" oder "Unternehmen"). Wir sind dem Schutz Ihrer persönlichen Informationen und Datenschutzrechte verpflichtet. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unsere Website besuchen oder unsere Dienste nutzen.</p>

                    <h2>2. Informationen, die wir sammeln</h2>
                    <p>Wir können mehrere Kategorien von Informationen von Benutzern der Website und Dienste sammeln, einschließlich:</p>
                    <ul>
                        <li><strong>Persönliche Informationen:</strong> Name, E-Mail-Adresse, Telefonnummer und andere Identifikatoren, die bei der Registrierung für unsere Dienste oder bei der Kommunikation mit uns bereitgestellt werden.</li>
                        <li><strong>Technische Informationen:</strong> IP-Adresse, Browsertyp, Betriebssystem und andere technische Details beim Besuch unserer Website.</li>
                        <li><strong>Nutzungsinformationen:</strong> Wie Sie mit unserer Website und unseren Diensten interagieren, einschließlich verwendeter Funktionen und verbrachter Zeit.</li>
                    </ul>

                    <h2>3. Wie wir Ihre Informationen verwenden</h2>
                    <p>Wir können die gesammelten Informationen für verschiedene Zwecke verwenden, einschließlich:</p>
                    <ul>
                        <li>Bereitstellung, Betrieb und Wartung unserer Dienste</li>
                        <li>Verbesserung und Personalisierung Ihrer Erfahrung</li>
                        <li>Kommunikation mit Ihnen bezüglich Updates, Support und Aktionen</li>
                        <li>Analyse von Nutzungsmustern zur Verbesserung unserer Dienste</li>
                        <li>Betrugsprävention und Gewährleistung der Sicherheit</li>
                    </ul>

                    <h2>4. Informationsaustausch und Offenlegung</h2>
                    <p>Wir können Ihre Informationen unter folgenden Umständen weitergeben:</p>
                    <ul>
                        <li><strong>Dienstleister:</strong> Mit Dritten, die uns bei der Verwaltung unseres Geschäfts und der Bereitstellung von Diensten helfen.</li>
                        <li><strong>Gesetzliche Anforderungen:</strong> Wenn dies gesetzlich vorgeschrieben ist oder zum Schutz unserer Rechte oder der Sicherheit der Benutzer erforderlich ist.</li>
                        <li><strong>Geschäftsübertragung:</strong> Im Zusammenhang mit einer Fusion, Übernahme oder dem Verkauf von Vermögenswerten.</li>
                    </ul>

                    <h2>5. Datensicherheit</h2>
                    <p>Wir implementieren angemessene Sicherheitsmaßnahmen zum Schutz Ihrer persönlichen Informationen. Jedoch ist keine Methode der Übertragung über das Internet oder der elektronischen Speicherung zu 100% sicher, und wir können keine absolute Sicherheit garantieren.</p>

                    <h2>6. Ihre Rechte</h2>
                    <p>Abhängig von Ihrem Standort haben Sie möglicherweise bestimmte Rechte in Bezug auf Ihre persönlichen Informationen, einschließlich:</p>
                    <ul>
                        <li>Zugriff auf Ihre persönlichen Informationen</li>
                        <li>Korrektur ungenauer persönlicher Informationen</li>
                        <li>Löschung Ihrer persönlichen Informationen</li>
                        <li>Widerspruch gegen bestimmte Arten der Verarbeitung</li>
                        <li>Datenportabilität</li>
                    </ul>

                    <h2>7. Datenschutz von Kindern</h2>
                    <p>Unsere Dienste richten sich nicht an Personen unter 16 Jahren. Wir sammeln wissentlich keine persönlichen Informationen von Kindern.</p>

                    <h2>8. Änderungen an dieser Datenschutzrichtlinie</h2>
                    <p>Wir können unsere Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über alle Änderungen informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das "Datum der letzten Aktualisierung" aktualisieren.</p>

                    <h2>9. Kontaktieren Sie uns</h2>
                    <p>Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte:</p>
                    <p>E-Mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}
