import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Privacybeleid"
            description="TikMatrix Privacybeleid - Hoe we uw gegevens verzamelen, gebruiken en beschermen">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Privacybeleid</h1>
                    <p>Laatst bijgewerkt: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introductie</h2>
                    <p>Welkom bij TikMatrix ("wij", "ons" of "het bedrijf"). Wij zijn toegewijd aan het beschermen van uw persoonlijke informatie en uw recht op privacy. Dit Privacybeleid legt uit hoe we uw informatie verzamelen, gebruiken, openbaar maken en beschermen wanneer u onze website bezoekt of onze diensten gebruikt.</p>

                    <h2>2. Informatie die we Verzamelen</h2>
                    <p>We kunnen verschillende soorten informatie verzamelen van en over gebruikers van onze website en diensten, waaronder:</p>
                    <ul>
                        <li><strong>Persoonlijke Informatie:</strong> Naam, e-mailadres, telefoonnummer en andere identificatiegegevens die u verstrekt bij het registreren voor onze diensten of het communiceren met ons.</li>
                        <li><strong>Technische Informatie:</strong> IP-adres, browsertype, besturingssysteem en andere technische details wanneer u onze website bezoekt.</li>
                        <li><strong>Gebruiksinformatie:</strong> Hoe u interageert met onze website en diensten, inclusief gebruikte functies en bestede tijd.</li>
                    </ul>

                    <h2>3. Hoe we Uw Informatie Gebruiken</h2>
                    <p>We kunnen de informatie die we verzamelen gebruiken voor verschillende doeleinden, waaronder:</p>
                    <ul>
                        <li>Het leveren, bedienen en onderhouden van onze diensten</li>
                        <li>Het verbeteren en personaliseren van uw ervaring</li>
                        <li>Communiceren met u over updates, ondersteuning en promoties</li>
                        <li>Analyseren van gebruikspatronen om onze diensten te verbeteren</li>
                        <li>Het voorkomen van fraude en het waarborgen van beveiliging</li>
                    </ul>

                    <h2>4. Delen en Openbaarmaking van Informatie</h2>
                    <p>We kunnen uw informatie delen in de volgende situaties:</p>
                    <ul>
                        <li><strong>Dienstverleners:</strong> Met derde partijen die ons helpen bij het bedrijven van ons bedrijf en het leveren van diensten.</li>
                        <li><strong>Wettelijke Vereisten:</strong> Wanneer vereist door de wet of om onze rechten of de veiligheid van gebruikers te beschermen.</li>
                        <li><strong>Bedrijfsoverdrachten:</strong> In verband met een fusie, overname of verkoop van activa.</li>
                    </ul>

                    <h2>5. Gegevensbeveiliging</h2>
                    <p>We implementeren passende beveiligingsmaatregelen om uw persoonlijke informatie te beschermen. Echter, geen enkele methode van overdracht via internet of elektronische opslag is 100% veilig, en we kunnen geen absolute beveiliging garanderen.</p>

                    <h2>6. Uw Rechten</h2>
                    <p>Afhankelijk van uw locatie kunt u bepaalde rechten hebben met betrekking tot uw persoonlijke informatie, waaronder:</p>
                    <ul>
                        <li>Toegang tot uw persoonlijke informatie</li>
                        <li>Het corrigeren van onjuiste persoonlijke informatie</li>
                        <li>Het verwijderen van uw persoonlijke informatie</li>
                        <li>Bezwaar maken tegen bepaalde verwerkingsactiviteiten</li>
                        <li>Gegevensportabiliteit</li>
                    </ul>

                    <h2>7. Privacy van Kinderen</h2>
                    <p>Onze diensten zijn niet bedoeld voor personen jonger dan 16 jaar. We verzamelen niet bewust persoonlijke informatie van kinderen.</p>

                    <h2>8. Wijzigingen in dit Privacybeleid</h2>
                    <p>We kunnen ons Privacybeleid van tijd tot tijd bijwerken. We zullen u op de hoogte stellen van eventuele wijzigingen door het nieuwe Privacybeleid op deze pagina te plaatsen en de datum "Laatst bijgewerkt" bij te werken.</p>

                    <h2>9. Contact Opnemen</h2>
                    <p>Als u vragen heeft over dit Privacybeleid, neem dan contact met ons op:</p>
                    <p>E-mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 