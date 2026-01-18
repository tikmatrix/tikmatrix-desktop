import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Politique de confidentialité"
            description="Politique de confidentialité de TikMatrix - Comment nous collectons, utilisons et protégeons vos données">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Politique de confidentialité</h1>
                    <p>Dernière mise à jour : {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introduction</h2>
                    <p>Bienvenue chez TikMatrix (ci-après dénommé "nous", "notre" ou "la société"). Nous nous engageons à protéger vos informations personnelles et vos droits à la vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site Web ou utilisez nos services.</p>

                    <h2>2. Informations que nous collectons</h2>
                    <p>Nous pouvons collecter plusieurs catégories d'informations auprès des utilisateurs de notre site Web et de nos services, notamment :</p>
                    <ul>
                        <li><strong>Informations personnelles :</strong> Nom, adresse e-mail, numéro de téléphone et autres identifiants fournis lors de votre inscription à nos services ou de votre communication avec nous.</li>
                        <li><strong>Informations techniques :</strong> Adresse IP, type de navigateur, système d'exploitation et autres détails techniques lors de votre visite sur notre site Web.</li>
                        <li><strong>Informations d'utilisation :</strong> Comment vous interagissez avec notre site Web et nos services, y compris les fonctionnalités utilisées et le temps passé.</li>
                    </ul>

                    <h2>3. Comment nous utilisons vos informations</h2>
                    <p>Nous pouvons utiliser les informations collectées à diverses fins, notamment :</p>
                    <ul>
                        <li>Fournir, exploiter et maintenir nos services</li>
                        <li>Améliorer et personnaliser votre expérience</li>
                        <li>Communiquer avec vous concernant les mises à jour, le support et les promotions</li>
                        <li>Analyser les modèles d'utilisation pour améliorer nos services</li>
                        <li>Prévenir la fraude et assurer la sécurité</li>
                    </ul>

                    <h2>4. Partage et divulgation des informations</h2>
                    <p>Nous pouvons partager vos informations dans les situations suivantes :</p>
                    <ul>
                        <li><strong>Prestataires de services :</strong> Avec des tiers qui nous aident à exploiter notre entreprise et à fournir nos services.</li>
                        <li><strong>Exigences légales :</strong> Lorsque la loi l'exige ou pour protéger nos droits ou la sécurité des utilisateurs.</li>
                        <li><strong>Transfert d'entreprise :</strong> Dans le cadre d'une fusion, acquisition ou vente d'actifs.</li>
                    </ul>

                    <h2>5. Sécurité des données</h2>
                    <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles. Cependant, aucune méthode de transmission par Internet ou de stockage électronique n'est sûre à 100%, et nous ne pouvons garantir une sécurité absolue.</p>

                    <h2>6. Vos droits</h2>
                    <p>Selon votre localisation, vous pouvez disposer de certains droits concernant vos informations personnelles, notamment :</p>
                    <ul>
                        <li>Accéder à vos informations personnelles</li>
                        <li>Corriger les informations personnelles inexactes</li>
                        <li>Supprimer vos informations personnelles</li>
                        <li>Vous opposer à certaines activités de traitement</li>
                        <li>Portabilité des données</li>
                    </ul>

                    <h2>7. Confidentialité des enfants</h2>
                    <p>Nos services ne s'adressent pas aux personnes de moins de 16 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants.</p>

                    <h2>8. Modifications de cette politique de confidentialité</h2>
                    <p>Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de toute modification en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de "Dernière mise à jour".</p>

                    <h2>9. Contactez-nous</h2>
                    <p>Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :</p>
                    <p>Email : support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 