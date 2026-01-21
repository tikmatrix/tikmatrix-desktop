import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Über uns"
            description="Erfahren Sie mehr über TikMatrix - wer wir sind, unsere Mission und Vision">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Über uns</h1>

                    <h2>Über das Unternehmen</h2>
                    <p>TikMatrix wird von TikMatrix LLC entwickelt, die im Bundesstaat Wyoming, USA, registriert ist. Seit unserer Gründung widmen wir uns der Entwicklung innovativer Tools für Social-Media-Marketing und helfen Unternehmen und Content-Erstellern, ihre Online-Präsenz zu maximieren.</p>

                    <h2>Unsere Mission</h2>
                    <p>Unsere Mission ist es, leistungsstarke, benutzerfreundliche Tools für Social-Media-Marketing zu entwickeln, die Unternehmen jeder Größe helfen, ihre Online-Präsenz effektiv auszubauen. Wir streben danach, fortschrittliche Marketing-Technologien für alle zugänglich zu machen.</p>

                    <h2>Unsere Produkte</h2>
                    <p>Unser Flaggschiffprodukt TikMatrix ist für professionelles TikTok-Account-Management und Marketing-Automatisierung konzipiert. Wir bieten auch zusätzliche Tools für andere Plattformen:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Professionelles Tool für TikTok-Account-Management und Marketing</li>
                        <li><strong>IgMatrix</strong> - Lösung für Instagram-Marketing und Account-Verwaltung</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> - Tool zur Erstellung und Optimierung von Videoinhalten</li>
                        <li><strong>YtMatrix</strong> - Plattform für YouTube-Kanalwachstum und -verwaltung</li>
                    </ul>

                    <h2>Unsere Technologie</h2>
                    <p>Bei TikMatrix verwenden wir fortschrittliche Technologien, um zuverlässige, effiziente und sichere Social-Media-Marketing-Tools bereitzustellen. Unser Entwicklerteam arbeitet kontinuierlich an der Verbesserung der Produkte und der Implementierung der neuesten Brancheninnovationen, um unseren Benutzern stets die besten Marketing-Tools zu bieten.</p>

                    <h2>Unsere Werte</h2>
                    <p>Wir glauben fest an:</p>
                    <ul>
                        <li><strong>Innovation</strong> - Kontinuierliche Verbesserung unserer Produkte, um den sich ändernden Marktbedürfnissen gerecht zu werden</li>
                        <li><strong>Zuverlässigkeit</strong> - Gewährleistung stabilen und sicheren Betriebs unserer Tools</li>
                        <li><strong>Zugänglichkeit</strong> - Bereitstellung fortschrittlicher Marketing-Tools für Unternehmen jeder Größe</li>
                        <li><strong>Kundenerfolg</strong> - Priorisierung des Wachstums und der Erfolge der Benutzer</li>
                    </ul>

                    <h2>Schließen Sie sich uns an</h2>
                    <p>Ob Sie Kleinunternehmer, Content-Ersteller oder Marketing-Spezialist sind, TikMatrix bietet die Tools, die Sie für den Erfolg in der heutigen wettbewerbsintensiven Social-Media-Umgebung benötigen. Unser Team ist bestrebt, Ihnen bei der Erreichung Ihrer Marketing-Ziele und der Erweiterung Ihrer Online-Präsenz zu helfen.</p>

                    <h2>Kontaktieren Sie uns</h2>
                    <p>Haben Sie Fragen oder benötigen Hilfe? Wir sind immer für Sie da!</p>
                    <p>E-Mail: support@tikmatrix.com</p>
                    <p>Treten Sie unserer Community bei: <a href="https://t.me/tikmatrix_agent_bot">Telegram Support-Gruppe</a></p>
                </div>
            </div>
        </Layout>
    );
}
