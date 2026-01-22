import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Användarvillkor"
            description="TikMatrix Användarvillkor - Regler och riktlinjer för att använda vår plattform">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Användarvillkor</h1>
                    <p>Senast uppdaterad: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Godkännande av Villkor</h2>
                    <p>Genom att få tillgång till eller använda TikMatrix webbplats och tjänster godkänner du att vara bunden av dessa användarvillkor och alla tillämpliga lagar och förordningar. Om du inte godkänner något av dessa villkor är du förbjuden att använda eller få tillgång till denna webbplats.</p>

                    <h2>2. Användningslicens</h2>
                    <p>Tillstånd ges att tillfälligt ladda ner en kopia av materialet på TikMatrix webbplats endast för personlig, icke-kommersiell tillfällig visning. Detta är beviljandet av en licens, inte en överföring av äganderätt, och under denna licens får du inte:</p>
                    <ul>
                        <li>Modifiera eller kopiera materialet</li>
                        <li>Använda materialet för något kommersiellt ändamål eller för någon offentlig visning</li>
                        <li>Försöka bakåtkompilera någon programvara som finns på TikMatrix webbplats</li>
                        <li>Ta bort någon upphovsrätt eller annan äganderättsanteckning från materialet</li>
                        <li>Överföra materialet till en annan person eller "spegla" materialet på någon annan server</li>
                    </ul>
                    <p>Denna licens upphör automatiskt om du bryter mot någon av dessa begränsningar och kan sägas upp av TikMatrix när som helst.</p>

                    <h2>3. Tjänster och Prenumeration</h2>
                    <p>TikMatrix tillhandahåller programvaruverktyg för TikTok-kontohantering och marknadsföringsautomation. Tillgång till dessa tjänster kan kräva en prenumeration eller engångsbetalning. Genom att prenumerera på våra tjänster samtycker du till att:</p>
                    <ul>
                        <li>Under provperioden kan du avbryta prenumerationen när som helst. Om prenumerationen inte avbryts kommer den automatiskt att konverteras till en betald prenumeration.</li>
                        <li>Tillhandahålla korrekt och fullständig faktureringsinformation</li>
                        <li>Betala alla avgifter till de priser som gäller när avgifterna uppstår</li>
                        <li>Inte använda tjänsterna för olagliga ändamål eller i strid med tillämpliga lagar eller förordningar</li>
                    </ul>

                    <h2>4. Användarbeteende</h2>
                    <p>När du använder våra tjänster samtycker du till att inte:</p>
                    <ul>
                        <li>Bryta mot tillämpliga lagar eller förordningar</li>
                        <li>Kränka andras rättigheter</li>
                        <li>Distribuera skadlig programvara eller delta i andra skadliga aktiviteter</li>
                        <li>Försöka få obehörig åtkomst till våra system eller andra användares konton</li>
                        <li>Använda våra tjänster på något sätt som kan skada, inaktivera, överbelasta eller försämra våra tjänster</li>
                    </ul>

                    <h2>5. Immateriell Egendom</h2>
                    <p>TikMatrix namn, logotyp, programvara och innehåll är exklusiv egendom för TikMatrix och dess licensgivare. Våra tjänster och allt innehåll som ingår i eller görs tillgängligt genom våra tjänster skyddas av lagar om immateriell egendom.</p>

                    <h2>6. Ansvarsfriskrivning</h2>
                    <p>Materialet på TikMatrix webbplats och de tjänster som tillhandahålls levereras "i befintligt skick". TikMatrix lämnar inga garantier, vare sig uttryckta eller underförstådda, och friskriver sig härmed från alla andra garantier, inklusive utan begränsning, underförstådda garantier om säljbarhet eller lämplighet för ett visst ändamål.</p>

                    <h2>7. Begränsning av Ansvar</h2>
                    <p>Under inga omständigheter ska TikMatrix eller dess leverantörer hållas ansvariga för några skador som uppstår på grund av användning eller oförmåga att använda materialet eller tjänsterna, även om TikMatrix har meddelats om möjligheten till sådan skada.</p>

                    <h2>8. Tillämplig Lag</h2>
                    <p>Dessa villkor ska styras av och tolkas i enlighet med lagarna i den jurisdiktion där TikMatrix är etablerat, utan hänsyn till dess lagvalsbestämmelser.</p>

                    <h2>9. Ändringar av Villkor</h2>
                    <p>TikMatrix förbehåller sig rätten att ändra dessa villkor när som helst. Vi kommer att meddela användare om eventuella ändringar genom att uppdatera datumet "Senast uppdaterad" för dessa villkor. Din fortsatta användning av vår webbplats och tjänster efter eventuella ändringar indikerar ditt godkännande av de ändrade villkoren.</p>

                    <h2>10. Kontakta Oss</h2>
                    <p>Om du har några frågor om dessa villkor, vänligen kontakta oss på:</p>
                    <p>E-post: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}
