import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Over Ons"
            description="Leer meer over TikMatrix - wie we zijn, onze missie en visie">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Over Ons</h1>

                    <h2>Bedrijfsprofiel</h2>
                    <p>TikMatrix wordt ontwikkeld door TikMatrix LLC, geregistreerd in de staat Wyoming, Verenigde Staten. Sinds onze oprichting zijn we toegewijd aan het creëren van innovatieve social media marketing tools om bedrijven en contentmakers te helpen hun online invloed te maximaliseren.</p>

                    <h2>Onze Missie</h2>
                    <p>Onze missie is om krachtige, gebruiksvriendelijke social media marketing tools te ontwikkelen om bedrijven van elke omvang te helpen hun online aanwezigheid efficiënt uit te breiden. We streven ernaar geavanceerde marketingtechnologieën toegankelijk te maken voor iedereen.</p>

                    <h2>Onze Producten</h2>
                    <p>Ons vlaggenschipproduct TikMatrix is ontworpen voor professioneel TikTok-accountbeheer en marketingautomatisering. We bieden ook aanvullende tools voor andere platforms:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Professionele tool voor TikTok-accountbeheer en marketing</li>
                        <li><strong>IgMatrix</strong> - Instagram marketing en accountbeheeroplossing</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> - Tool voor het maken en optimaliseren van video-inhoud</li>
                        <li><strong>YtMatrix</strong> - Platform voor YouTube-kanaalgroei en -beheer</li>
                    </ul>

                    <h2>Onze Technologie</h2>
                    <p>Bij TikMatrix gebruiken we geavanceerde technologieën om betrouwbare, efficiënte en veilige social media marketing tools te bieden. Ons ontwikkelingsteam werkt voortdurend aan het verbeteren van producten en het integreren van de nieuwste innovaties in de industrie, zodat onze gebruikers altijd toegang hebben tot de beste marketingtools.</p>

                    <h2>Onze Waarden</h2>
                    <p>We geloven sterk in:</p>
                    <ul>
                        <li><strong>Innovatie</strong> - Voortdurend verbeteren van onze producten om aan veranderende marktbehoeften te voldoen</li>
                        <li><strong>Betrouwbaarheid</strong> - Zorgen voor stabiele en veilige werking van onze tools</li>
                        <li><strong>Toegankelijkheid</strong> - Geavanceerde marketingtools beschikbaar maken voor bedrijven van elke omvang</li>
                        <li><strong>Klantsucces</strong> - Prioriteit geven aan de groei en prestaties van gebruikers</li>
                    </ul>

                    <h2>Sluit Je Bij Ons Aan</h2>
                    <p>Of je nu een kleine ondernemer, contentmaker of marketingprofessional bent, TikMatrix biedt de tools die je nodig hebt om succesvol te zijn in de competitieve social media-omgeving van vandaag. Ons team is toegewijd om je te helpen je marketingdoelen te bereiken en je online aanwezigheid uit te breiden.</p>

                    <h2>Neem Contact Op</h2>
                    <p>Heb je vragen of hulp nodig? We zijn er voor je!</p>
                    <p>E-mail: support@tikmatrix.com</p>
                    <p>Sluit je aan bij onze community: <a href="https://t.me/tikmatrix_agent_bot">Telegram Support Groep</a></p>
                </div>
            </div>
        </Layout>
    );
}