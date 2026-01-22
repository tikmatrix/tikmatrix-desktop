import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Om Oss"
            description="Lär dig mer om TikMatrix - vilka vi är, vår mission och vision">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Om Oss</h1>

                    <h2>Vårt Företag</h2>
                    <p>TikMatrix utvecklas av TikMatrix LLC, registrerat i Wyoming, USA. Sedan vår grundning har vi fokuserat på att skapa innovativa marknadsföringsverktyg för sociala medier för att hjälpa företag och skapare att maximera sin närvaro online.</p>

                    <h2>Vår Mission</h2>
                    <p>Vår mission är att utveckla kraftfulla, användarvänliga marknadsföringsverktyg för sociala medier som ger företag av alla storlekar möjlighet att växa effektivt och framgångsrikt. Vi strävar efter att göra avancerad marknadsföringsteknologi tillgänglig för alla.</p>

                    <h2>Våra Produkter</h2>
                    <p>Vår flaggskeppsprodukt, TikMatrix, är utformad för professionell TikTok-kontohantering och marknadsföringsautomation. Vi erbjuder även verktyg för andra plattformar:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> – Professionellt verktyg för TikTok-kontohantering och marknadsföring</li>
                        <li><strong>IgMatrix</strong> – Lösning för Instagram-marknadsföring och kontohantering</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> – Verktyg för videoinnehållsskapande och optimering</li>
                        <li><strong>YtMatrix</strong> – Plattform för YouTube-kanaltillväxt och hantering</li>
                    </ul>

                    <h2>Vår Teknologi</h2>
                    <p>Vi utnyttjar banbrytande teknologi för att tillhandahålla pålitliga, effektiva och säkra verktyg för marknadsföring i sociala medier. Vårt team förbättrar kontinuerligt våra produkter och införlivar de senaste branschinnovationerna, vilket säkerställer att användare alltid har tillgång till de bästa verktygen som finns tillgängliga.</p>

                    <h2>Våra Värderingar</h2>
                    <p>Vi tror på:</p>
                    <ul>
                        <li><strong>Innovation</strong> – Ständigt förbättra våra produkter för att möta utvecklande marknadsbehov</li>
                        <li><strong>Tillförlitlighet</strong> – Säkerställa att våra verktyg fungerar konsekvent och säkert</li>
                        <li><strong>Tillgänglighet</strong> – Göra avancerade marknadsföringsverktyg tillgängliga för företag av alla storlekar</li>
                        <li><strong>Kundens Framgång</strong> – Prioritera våra användares tillväxt och prestation</li>
                    </ul>

                    <h2>Gå Med Oss</h2>
                    <p>Oavsett om du är företagare, innehållsskapare eller marknadsföringsprofessionell har TikMatrix de verktyg du behöver för att lyckas i dagens sociala medielandskap. Vårt team är dedikerat till att hjälpa dig uppnå dina marknadsföringsmål och utöka din närvaro online.</p>

                    <h2>Kontakta Oss</h2>
                    <p>Har du frågor eller behöver hjälp? Vi är här för att hjälpa!</p>
                    <p>E-post: support@tikmatrix.com</p>
                    <p>Gå med i vår community: <a href="https://t.me/tikmatrix_agent_bot">Telegram-kanal</a></p>
                </div>
            </div>
        </Layout>
    );
}
