import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Integritetspolicy"
            description="TikMatrix Integritetspolicy - Hur vi samlar in, använder och skyddar dina uppgifter">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Integritetspolicy</h1>
                    <p>Senast uppdaterad: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introduktion</h2>
                    <p>Välkommen till TikMatrix ("vi", "vår" eller "oss"). Vi är engagerade i att skydda din personliga information och din rätt till integritet. Denna integritetspolicy förklarar hur vi samlar in, använder, avslöjar och skyddar din information när du besöker vår webbplats eller använder våra tjänster.</p>

                    <h2>2. Information Vi Samlar In</h2>
                    <p>Vi kan samla in flera typer av information från och om användare av vår webbplats och tjänster, inklusive:</p>
                    <ul>
                        <li><strong>Personlig Information:</strong> Namn, e-postadress, telefonnummer och andra identifierare du tillhandahåller när du registrerar dig för våra tjänster eller kommunicerar med oss.</li>
                        <li><strong>Teknisk Information:</strong> IP-adress, webbläsartyp, operativsystem och andra tekniska detaljer när du besöker vår webbplats.</li>
                        <li><strong>Användningsinformation:</strong> Hur du interagerar med vår webbplats och tjänster, inklusive använda funktioner och tid som spenderats.</li>
                    </ul>

                    <h2>3. Hur Vi Använder Din Information</h2>
                    <p>Vi kan använda informationen vi samlar in för olika ändamål, inklusive:</p>
                    <ul>
                        <li>Tillhandahålla, driva och underhålla våra tjänster</li>
                        <li>Förbättra och personalisera din upplevelse</li>
                        <li>Kommunicera med dig om uppdateringar, support och kampanjer</li>
                        <li>Analysera användningsmönster för att förbättra våra tjänster</li>
                        <li>Förhindra bedrägeri och säkerställa säkerhet</li>
                    </ul>

                    <h2>4. Informationsdelning och Avslöjande</h2>
                    <p>Vi kan dela din information i följande situationer:</p>
                    <ul>
                        <li><strong>Tjänsteleverantörer:</strong> Med tredje parter som hjälper oss att driva vår verksamhet och leverera tjänster.</li>
                        <li><strong>Juridiska Krav:</strong> När det krävs enligt lag eller för att skydda våra rättigheter eller användarnas säkerhet.</li>
                        <li><strong>Affärsöverföringar:</strong> I samband med en fusion, förvärv eller försäljning av tillgångar.</li>
                    </ul>

                    <h2>5. Datasäkerhet</h2>
                    <p>Vi implementerar lämpliga säkerhetsåtgärder för att skydda din personliga information. Dock är ingen metod för överföring över Internet eller elektronisk lagring 100% säker, och vi kan inte garantera absolut säkerhet.</p>

                    <h2>6. Dina Rättigheter</h2>
                    <p>Beroende på din plats kan du ha vissa rättigheter gällande din personliga information, inklusive:</p>
                    <ul>
                        <li>Få tillgång till din personliga information</li>
                        <li>Korrigera felaktig personlig information</li>
                        <li>Radera din personliga information</li>
                        <li>Invända mot vissa behandlingsaktiviteter</li>
                        <li>Dataportabilitet</li>
                    </ul>

                    <h2>7. Barns Integritet</h2>
                    <p>Våra tjänster är inte avsedda för individer under 16 år. Vi samlar inte medvetet in personlig information från barn.</p>

                    <h2>8. Ändringar av Denna Integritetspolicy</h2>
                    <p>Vi kan uppdatera vår integritetspolicy från tid till annan. Vi kommer att meddela dig om eventuella ändringar genom att publicera den nya integritetspolicyn på denna sida och uppdatera datumet "Senast uppdaterad".</p>

                    <h2>9. Kontakta Oss</h2>
                    <p>Om du har några frågor om denna integritetspolicy, vänligen kontakta oss på:</p>
                    <p>E-post: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}
