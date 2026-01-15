import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Nutzungsbedingungen"
            description="TikMatrix Nutzungsbedingungen - Regeln und Leitprinzipien für die Nutzung unserer Plattform">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Nutzungsbedingungen</h1>
                    <p>Datum der letzten Aktualisierung: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Annahme der Bedingungen</h2>
                    <p>Durch den Besuch oder die Nutzung der TikMatrix-Website und -Dienste erklären Sie sich damit einverstanden, diese Nutzungsbedingungen und alle geltenden Gesetze und Vorschriften einzuhalten. Wenn Sie mit einer dieser Bedingungen nicht einverstanden sind, ist Ihnen die Nutzung oder der Zugriff auf diese Website untersagt.</p>

                    <h2>2. Nutzungslizenz</h2>
                    <p>Es ist gestattet, Materialien (Informationen oder Software) von der TikMatrix-Website nur für persönliche, nichtkommerzielle vorübergehende Ansichtszwecke vorübergehend herunterzuladen. Dies ist die Gewährung einer Lizenz und keine Eigentumsübertragung, und im Rahmen dieser Lizenz dürfen Sie nicht:</p>
                    <ul>
                        <li>Die Materialien ändern oder kopieren</li>
                        <li>Die Materialien für kommerzielle Zwecke oder zur öffentlichen Anzeige verwenden</li>
                        <li>Versuchen, Software, die auf der TikMatrix-Website enthalten ist, rückzuentwickeln</li>
                        <li>Urheberrechts- oder andere Eigentumshinweise aus den Materialien entfernen</li>
                        <li>Die Materialien an eine andere Person übertragen oder die Materialien auf einem anderen Server "spiegeln"</li>
                    </ul>
                    <p>Diese Lizenz endet automatisch bei Verstoß gegen eine dieser Einschränkungen und kann von TikMatrix jederzeit beendet werden.</p>

                    <h2>3. Dienste und Abonnements</h2>
                    <p>TikMatrix bietet Software-Tools für die Verwaltung von TikTok-Konten und Marketing-Automatisierung. Der Zugriff auf diese Dienste kann ein Abonnement oder eine einmalige Zahlung erfordern. Mit dem Abonnement unserer Dienste stimmen Sie zu:</p>
                    <ul>
                        <li>Sie können das Abonnement jederzeit während der Testphase kündigen. Wenn Sie das Abonnement nicht kündigen, wird es automatisch auf ein kostenpflichtiges Abonnement umgestellt</li>
                        <li>Genaue und vollständige Rechnungsinformationen bereitzustellen</li>
                        <li>Alle geltenden Gebühren zu zahlen, die zum Zeitpunkt der Entstehung der Kosten gelten</li>
                        <li>Die Dienste nicht für illegale Zwecke oder unter Verstoß gegen geltende Gesetze oder Vorschriften zu verwenden</li>
                    </ul>

                    <h2>4. Benutzerverhalten</h2>
                    <p>Bei der Nutzung unserer Dienste stimmen Sie zu, nicht:</p>
                    <ul>
                        <li>Geltende Gesetze oder Vorschriften zu verletzen</li>
                        <li>Die Rechte anderer zu verletzen</li>
                        <li>Schadsoftware zu verbreiten oder sich an anderen schädlichen Aktivitäten zu beteiligen</li>
                        <li>Unbefugten Zugriff auf unsere Systeme oder die Konten anderer Benutzer zu erlangen</li>
                        <li>Unsere Dienste auf eine Weise zu verwenden, die unsere Dienste beschädigen, deaktivieren, überlasten oder beeinträchtigen könnte</li>
                    </ul>

                    <h2>5. Geistiges Eigentum</h2>
                    <p>Der Name TikMatrix, Logos, Software und Inhalte sind ausschließliches Eigentum von TikMatrix und seinen Lizenzgebern. Unsere Dienste und alle Inhalte, die in oder über unsere Dienste bereitgestellt werden, sind durch Gesetze zum geistigen Eigentum geschützt.</p>

                    <h2>6. Haftungsausschluss</h2>
                    <p>Die Materialien auf der TikMatrix-Website und die bereitgestellten Dienste werden "wie besehen" bereitgestellt. TikMatrix gibt keine ausdrücklichen oder stillschweigenden Garantien ab und lehnt hiermit alle anderen Garantien ab, einschließlich, ohne Einschränkung, stillschweigender Garantien der Marktgängigkeit oder Eignung für einen bestimmten Zweck.</p>

                    <h2>7. Haftungsbeschränkung</h2>
                    <p>Unter keinen Umständen haften TikMatrix oder seine Lieferanten für Schäden, die sich aus der Nutzung oder der Unmöglichkeit der Nutzung der Materialien oder Dienste ergeben, selbst wenn TikMatrix über die Möglichkeit solcher Schäden informiert wurde.</p>

                    <h2>8. Anwendbares Recht</h2>
                    <p>Diese Bedingungen werden gemäß den Gesetzen der Gerichtsbarkeit des Gründungsortes von TikMatrix geregelt und ausgelegt, ohne Berücksichtigung der Kollisionsnormen.</p>

                    <h2>9. Änderungen der Bedingungen</h2>
                    <p>TikMatrix behält sich das Recht vor, diese Bedingungen jederzeit zu ändern. Wir werden Benutzer über alle Änderungen informieren, indem wir das "Datum der letzten Aktualisierung" dieser Bedingungen aktualisieren. Ihre fortgesetzte Nutzung unserer Website und Dienste nach Änderungen bedeutet Ihre Annahme der geänderten Bedingungen.</p>

                    <h2>10. Kontaktieren Sie uns</h2>
                    <p>Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte:</p>
                    <p>E-Mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}
