import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="À propos de nous"
            description="En savoir plus sur TikMatrix - qui nous sommes, notre mission et notre vision">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>À propos de nous</h1>

                    <h2>Présentation de l'entreprise</h2>
                    <p>TikMatrix est développé par TikMatrix LLC, une société enregistrée dans l'État du Wyoming, États-Unis. Depuis notre création, nous nous consacrons à la création d'outils innovants de marketing sur les réseaux sociaux, aidant les entreprises et les créateurs de contenu à maximiser leur présence en ligne.</p>

                    <h2>Notre mission</h2>
                    <p>Notre mission est de développer des outils de marketing sur les réseaux sociaux puissants et faciles à utiliser, aidant les entreprises de toutes tailles à développer efficacement leur présence en ligne. Nous nous efforçons de rendre les technologies de marketing avancées accessibles à tous.</p>

                    <h2>Nos produits</h2>
                    <p>Notre produit phare TikMatrix est conçu pour la gestion professionnelle de comptes TikTok et l'automatisation du marketing. Nous proposons également des outils complémentaires pour d'autres plateformes :</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Gestion professionnelle de comptes TikTok et outil de marketing</li>
                        <li><strong>IgMatrix</strong> - Solution de marketing et gestion de comptes Instagram</li>
                        <li><strong>VideoMagic</strong> - Outil de création et d'optimisation de contenu vidéo</li>
                        <li><strong>YtMatrix</strong> - Plateforme de croissance et gestion de chaînes YouTube</li>
                    </ul>

                    <h2>Notre technologie</h2>
                    <p>Chez TikMatrix, nous exploitons des technologies de pointe pour fournir des outils de marketing sur les réseaux sociaux fiables, efficaces et sécurisés. Notre équipe de développement travaille constamment à améliorer nos produits et à intégrer les dernières innovations du secteur, garantissant à nos utilisateurs un accès permanent aux meilleurs outils de marketing.</p>

                    <h2>Nos valeurs</h2>
                    <p>Nous croyons fermement en :</p>
                    <ul>
                        <li><strong>Innovation</strong> - Améliorer continuellement nos produits pour répondre aux besoins changeants du marché</li>
                        <li><strong>Fiabilité</strong> - Assurer un fonctionnement stable et sécurisé de nos outils</li>
                        <li><strong>Accessibilité</strong> - Rendre les outils de marketing avancés disponibles pour toutes les entreprises</li>
                        <li><strong>Succès client</strong> - Prioriser la croissance et la réussite de nos utilisateurs</li>
                    </ul>

                    <h2>Rejoignez-nous</h2>
                    <p>Que vous soyez propriétaire de petite entreprise, créateur de contenu ou professionnel du marketing, TikMatrix offre les outils dont vous avez besoin pour réussir dans l'environnement concurrentiel actuel des réseaux sociaux. Notre équipe est dédiée à vous aider à atteindre vos objectifs marketing et à étendre votre présence en ligne.</p>

                    <h2>Contactez-nous</h2>
                    <p>Des questions ou besoin d'aide ? Nous sommes toujours là pour vous !</p>
                    <p>Email : support@tikmatrix.com</p>
                    <p>Rejoignez notre communauté : <a href="https://t.me/tikmatrix_agent_bot">Groupe de support Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
} 