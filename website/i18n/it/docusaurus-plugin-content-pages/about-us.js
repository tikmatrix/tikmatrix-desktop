import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Chi Siamo"
            description="Scopri di più su TikMatrix - chi siamo, la nostra missione e visione">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Chi Siamo</h1>

                    <h2>Profilo Aziendale</h2>
                    <p>TikMatrix è sviluppato da TikMatrix LLC, registrata nello stato del Wyoming, Stati Uniti. Dalla nostra fondazione, ci siamo impegnati a creare strumenti innovativi di marketing sui social media per aiutare le aziende e i creatori di contenuti a massimizzare la loro influenza online.</p>

                    <h2>La Nostra Missione</h2>
                    <p>La nostra missione è sviluppare strumenti di marketing sui social media potenti e facili da usare per aiutare le aziende di tutte le dimensioni a far crescere la loro presenza online in modo efficiente. Ci sforziamo di rendere le tecnologie di marketing avanzate accessibili a tutti.</p>

                    <h2>I Nostri Prodotti</h2>
                    <p>Il nostro prodotto di punta, TikMatrix, è progettato per la gestione professionale degli account TikTok e l'automazione del marketing. Offriamo anche strumenti complementari per altre piattaforme:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Strumento professionale per la gestione degli account TikTok e il marketing</li>
                        <li><strong>IgMatrix</strong> - Soluzione di marketing e gestione degli account Instagram</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> - Strumento per la creazione e l'ottimizzazione di contenuti video</li>
                        <li><strong>YtMatrix</strong> - Piattaforma per la crescita e la gestione dei canali YouTube</li>
                    </ul>

                    <h2>La Nostra Tecnologia</h2>
                    <p>In TikMatrix, utilizziamo tecnologie all'avanguardia per fornire strumenti di marketing sui social media affidabili, efficienti e sicuri. Il nostro team di sviluppo lavora continuamente per migliorare i prodotti e incorporare le ultime innovazioni del settore, assicurando che i nostri utenti abbiano sempre accesso ai migliori strumenti di marketing.</p>

                    <h2>I Nostri Valori</h2>
                    <p>Crediamo fermamente in:</p>
                    <ul>
                        <li><strong>Innovazione</strong> - Migliorare continuamente i nostri prodotti per soddisfare le esigenze del mercato in evoluzione</li>
                        <li><strong>Affidabilità</strong> - Garantire il funzionamento stabile e sicuro dei nostri strumenti</li>
                        <li><strong>Accessibilità</strong> - Rendere gli strumenti di marketing avanzati disponibili per aziende di tutte le dimensioni</li>
                        <li><strong>Successo del Cliente</strong> - Dare priorità alla crescita e ai risultati degli utenti</li>
                    </ul>

                    <h2>Unisciti a Noi</h2>
                    <p>Che tu sia un piccolo imprenditore, un creatore di contenuti o un professionista del marketing, TikMatrix fornisce gli strumenti di cui hai bisogno per avere successo nell'ambiente competitivo dei social media di oggi. Il nostro team si impegna ad aiutarti a raggiungere i tuoi obiettivi di marketing ed espandere la tua presenza online.</p>

                    <h2>Contattaci</h2>
                    <p>Hai domande o hai bisogno di aiuto? Siamo qui per te!</p>
                    <p>Email: support@tikmatrix.com</p>
                    <p>Unisciti alla nostra comunità: <a href="https://t.me/tikmatrix_agent_bot">Gruppo di Supporto Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
}