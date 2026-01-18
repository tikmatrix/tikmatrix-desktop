import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Conditions d'utilisation"
            description="Conditions d'utilisation de TikMatrix - Règles et directives pour utiliser notre plateforme">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Conditions d'utilisation</h1>
                    <p>Dernière mise à jour : {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Acceptation des conditions</h2>
                    <p>En accédant ou en utilisant le site Web et les services de TikMatrix, vous acceptez d'être lié par ces conditions d'utilisation ainsi que par toutes les lois et réglementations applicables. Si vous n'acceptez pas l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site.</p>

                    <h2>2. Licence d'utilisation</h2>
                    <p>Une autorisation est accordée pour télécharger temporairement les éléments (informations ou logiciels) sur le site Web de TikMatrix uniquement pour un usage personnel et non commercial temporaire. Il s'agit d'une licence, et non d'un transfert de propriété. En vertu de cette licence, vous ne devez pas :</p>
                    <ul>
                        <li>Modifier ou copier les éléments</li>
                        <li>Utiliser les éléments à des fins commerciales ou pour un affichage public</li>
                        <li>Tenter de décompiler ou de faire de l'ingénierie inverse de tout logiciel contenu sur le site Web de TikMatrix</li>
                        <li>Supprimer tout droit d'auteur ou autre mention de propriété des éléments</li>
                        <li>Transférer les éléments à une autre personne ou "refléter" les éléments sur un autre serveur</li>
                    </ul>
                    <p>Cette licence sera automatiquement résiliée si vous violez l'une de ces restrictions et peut être résiliée à tout moment par TikMatrix.</p>

                    <h2>3. Services et abonnements</h2>
                    <p>TikMatrix propose des outils logiciels pour la gestion de comptes TikTok et l'automatisation du marketing. L'accès à ces services peut nécessiter un abonnement ou un paiement unique. En souscrivant à nos services, vous acceptez de :</p>
                    <ul>
                        <li>Vous pouvez annuler votre abonnement à tout moment pendant la période d'essai. Si vous n'annulez pas, l'abonnement sera automatiquement converti en abonnement payant</li>
                        <li>Fournir des informations de facturation précises et complètes</li>
                        <li>Payer tous les frais en vigueur au moment de la facturation</li>
                        <li>Ne pas utiliser les services à des fins illégales ou en violation de toute loi ou réglementation applicable</li>
                    </ul>

                    <h2>4. Comportement des utilisateurs</h2>
                    <p>Lors de l'utilisation de nos services, vous acceptez de ne pas :</p>
                    <ul>
                        <li>Violer les lois ou réglementations applicables</li>
                        <li>Porter atteinte aux droits d'autrui</li>
                        <li>Distribuer des logiciels malveillants ou se livrer à d'autres activités nuisibles</li>
                        <li>Tenter d'accéder sans autorisation à nos systèmes ou aux comptes d'autres utilisateurs</li>
                        <li>Utiliser nos services d'une manière qui pourrait endommager, désactiver, surcharger ou altérer nos services</li>
                    </ul>

                    <h2>5. Propriété intellectuelle</h2>
                    <p>Le nom TikMatrix, le logo, les logiciels et le contenu sont la propriété exclusive de TikMatrix et de ses concédants de licence. Nos services et tout le contenu inclus ou fourni via nos services sont protégés par les lois sur la propriété intellectuelle.</p>

                    <h2>6. Clause de non-responsabilité</h2>
                    <p>Les éléments sur le site Web de TikMatrix et les services fournis sont fournis "tels quels". TikMatrix ne fait aucune garantie, expresse ou implicite, et décline par la présente toutes les autres garanties, y compris, sans s'y limiter, les garanties implicites de qualité marchande ou d'adéquation à un usage particulier.</p>

                    <h2>7. Limitation de responsabilité</h2>
                    <p>En aucun cas, TikMatrix ou ses fournisseurs ne seront responsables de tout dommage résultant de l'utilisation ou de l'impossibilité d'utiliser les éléments ou les services, même si TikMatrix a été informé de la possibilité de tels dommages.</p>

                    <h2>8. Droit applicable</h2>
                    <p>Ces conditions sont régies et interprétées conformément aux lois de la juridiction du lieu de constitution de TikMatrix, sans égard à ses dispositions relatives aux conflits de lois.</p>

                    <h2>9. Modifications des conditions</h2>
                    <p>TikMatrix se réserve le droit de modifier ces conditions à tout moment. Nous informerons les utilisateurs de tout changement en mettant à jour la date de "Dernière mise à jour" de ces conditions. Votre utilisation continue de notre site Web et de nos services après tout changement indique votre acceptation des conditions modifiées.</p>

                    <h2>10. Contactez-nous</h2>
                    <p>Si vous avez des questions concernant ces conditions, veuillez nous contacter :</p>
                    <p>Email : support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 