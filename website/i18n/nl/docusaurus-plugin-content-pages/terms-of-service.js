import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Servicevoorwaarden"
            description="TikMatrix Servicevoorwaarden - Regels en richtlijnen voor het gebruik van ons platform">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Servicevoorwaarden</h1>
                    <p>Laatst bijgewerkt: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Acceptatie van Voorwaarden</h2>
                    <p>Door toegang te krijgen tot of gebruik te maken van de website en diensten van TikMatrix, gaat u ermee akkoord gebonden te zijn aan deze Servicevoorwaarden en alle toepasselijke wetten en regelgeving. Als u het niet eens bent met een van deze voorwaarden, is het u verboden om deze site te gebruiken of te bezoeken.</p>

                    <h2>2. Gebruikslicentie</h2>
                    <p>Toestemming wordt verleend om tijdelijk één kopie van de materialen op de website van TikMatrix te downloaden voor persoonlijke, niet-commerciële tijdelijke weergave alleen. Dit is het verlenen van een licentie, geen overdracht van eigendom, en onder deze licentie mag u niet:</p>
                    <ul>
                        <li>De materialen wijzigen of kopiëren</li>
                        <li>De materialen gebruiken voor commerciële doeleinden of voor openbare weergave</li>
                        <li>Proberen software die op de website van TikMatrix staat te reverse-engineeren</li>
                        <li>Eventuele copyright- of andere eigendomsvermeldingen uit de materialen verwijderen</li>
                        <li>De materialen overdragen aan een andere persoon of de materialen op een andere server "spiegelen"</li>
                    </ul>
                    <p>Deze licentie wordt automatisch beëindigd als u een van deze beperkingen schendt en kan op elk moment door TikMatrix worden beëindigd.</p>

                    <h2>3. Diensten en Abonnement</h2>
                    <p>TikMatrix biedt softwaretools voor TikTok-accountbeheer en marketingautomatisering. Toegang tot deze diensten kan een abonnement of eenmalige betaling vereisen. Door u te abonneren op onze diensten, gaat u ermee akkoord:</p>
                    <ul>
                        <li>Tijdens de proefperiode kunt u het abonnement op elk moment opzeggen. Als het abonnement niet wordt opgezegd, wordt het automatisch omgezet in een betaald abonnement.</li>
                        <li>Nauwkeurige en volledige factureringsgegevens te verstrekken</li>
                        <li>Alle kosten te betalen tegen de tarieven die van kracht zijn op het moment dat de kosten worden gemaakt</li>
                        <li>De diensten niet te gebruiken voor illegale doeleinden of in strijd met toepasselijke wetten of regelgeving</li>
                    </ul>

                    <h2>4. Gebruikersgedrag</h2>
                    <p>Bij het gebruik van onze diensten gaat u ermee akkoord dat u het volgende niet zult doen:</p>
                    <ul>
                        <li>Toepasselijke wetten of regelgeving schenden</li>
                        <li>De rechten van anderen schenden</li>
                        <li>Malware verspreiden of deelnemen aan andere schadelijke activiteiten</li>
                        <li>Proberen ongeautoriseerde toegang te krijgen tot onze systemen of accounts van andere gebruikers</li>
                        <li>Onze diensten gebruiken op een manier die onze diensten kan beschadigen, uitschakelen, overbelasten of verstoren</li>
                    </ul>

                    <h2>5. Intellectueel Eigendom</h2>
                    <p>De naam, het logo, de software en de inhoud van TikMatrix zijn exclusief eigendom van TikMatrix en haar licentiegevers. Onze diensten en alle inhoud die via onze diensten wordt opgenomen of beschikbaar gesteld, worden beschermd door wetten inzake intellectueel eigendom.</p>

                    <h2>6. Disclaimer</h2>
                    <p>De materialen op de website van TikMatrix en de geleverde diensten worden "as is" geleverd. TikMatrix geeft geen garanties, expliciet of impliciet, en wijst hierbij alle andere garanties af, inclusief zonder beperking impliciete garanties van verkoopbaarheid of geschiktheid voor een bepaald doel.</p>

                    <h2>7. Beperking van Aansprakelijkheid</h2>
                    <p>In geen geval zullen TikMatrix of haar leveranciers aansprakelijk zijn voor enige schade die voortvloeit uit het gebruik of het onvermogen om de materialen of diensten te gebruiken, zelfs als TikMatrix op de hoogte is gesteld van de mogelijkheid van dergelijke schade.</p>

                    <h2>8. Toepasselijk Recht</h2>
                    <p>Deze Voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met de wetten van het rechtsgebied waarin TikMatrix is gevestigd, zonder rekening te houden met de bepalingen inzake wetsconflicten.</p>

                    <h2>9. Wijzigingen in Voorwaarden</h2>
                    <p>TikMatrix behoudt zich het recht voor om deze Voorwaarden op elk moment te wijzigen. We zullen gebruikers op de hoogte stellen van eventuele wijzigingen door de datum "Laatst bijgewerkt" van deze Voorwaarden bij te werken. Uw voortgezette gebruik van onze website en diensten na wijzigingen geeft uw acceptatie van de gewijzigde Voorwaarden aan.</p>

                    <h2>10. Contact Opnemen</h2>
                    <p>Als u vragen heeft over deze Voorwaarden, neem dan contact met ons op:</p>
                    <p>E-mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 