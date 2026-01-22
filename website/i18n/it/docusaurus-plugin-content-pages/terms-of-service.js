import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Termini di Servizio"
            description="Termini di Servizio di TikMatrix - Regole e linee guida per l'utilizzo della nostra piattaforma">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Termini di Servizio</h1>
                    <p>Ultimo aggiornamento: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Accettazione dei Termini</h2>
                    <p>Accedendo o utilizzando il sito web e i servizi di TikMatrix, accetti di essere vincolato da questi Termini di Servizio e da tutte le leggi e regolamenti applicabili. Se non accetti uno qualsiasi di questi termini, ti è vietato utilizzare o accedere a questo sito.</p>

                    <h2>2. Licenza d'Uso</h2>
                    <p>È concesso il permesso di scaricare temporaneamente una copia dei materiali sul sito web di TikMatrix solo per visualizzazione personale, non commerciale e temporanea. Questa è la concessione di una licenza, non un trasferimento di titolo, e sotto questa licenza non puoi:</p>
                    <ul>
                        <li>Modificare o copiare i materiali</li>
                        <li>Utilizzare i materiali per scopi commerciali o per qualsiasi esposizione pubblica</li>
                        <li>Tentare di decodificare qualsiasi software contenuto nel sito web di TikMatrix</li>
                        <li>Rimuovere qualsiasi copyright o altra notazione proprietaria dai materiali</li>
                        <li>Trasferire i materiali a un'altra persona o "specchiare" i materiali su qualsiasi altro server</li>
                    </ul>
                    <p>Questa licenza terminerà automaticamente se violi una qualsiasi di queste restrizioni e può essere terminata da TikMatrix in qualsiasi momento.</p>

                    <h2>3. Servizi e Abbonamento</h2>
                    <p>TikMatrix fornisce strumenti software per la gestione degli account TikTok e l'automazione del marketing. L'accesso a questi servizi può richiedere un abbonamento o un pagamento unico. Sottoscrivendo i nostri servizi, accetti di:</p>
                    <ul>
                        <li>Durante il periodo di prova, puoi cancellare l'abbonamento in qualsiasi momento. Se l'abbonamento non viene cancellato, verrà automaticamente convertito in un abbonamento a pagamento.</li>
                        <li>Fornire informazioni di fatturazione accurate e complete</li>
                        <li>Pagare tutti gli addebiti alle tariffe in vigore quando gli addebiti vengono sostenuti</li>
                        <li>Non utilizzare i servizi per scopi illegali o in violazione di leggi o regolamenti applicabili</li>
                    </ul>

                    <h2>4. Condotta dell'Utente</h2>
                    <p>Quando utilizzi i nostri servizi, accetti di non:</p>
                    <ul>
                        <li>Violare leggi o regolamenti applicabili</li>
                        <li>Violare i diritti di altri</li>
                        <li>Distribuire malware o impegnarsi in altre attività dannose</li>
                        <li>Tentare di ottenere accesso non autorizzato ai nostri sistemi o agli account di altri utenti</li>
                        <li>Utilizzare i nostri servizi in modo tale da danneggiare, disabilitare, sovraccaricare o compromettere i nostri servizi</li>
                    </ul>

                    <h2>5. Proprietà Intellettuale</h2>
                    <p>Il nome, il logo, il software e il contenuto di TikMatrix sono di proprietà esclusiva di TikMatrix e dei suoi licenzianti. I nostri servizi e tutti i contenuti inclusi o resi disponibili attraverso i nostri servizi sono protetti dalle leggi sulla proprietà intellettuale.</p>

                    <h2>6. Esclusione di Responsabilità</h2>
                    <p>I materiali sul sito web di TikMatrix e i servizi forniti sono forniti "così come sono". TikMatrix non fornisce alcuna garanzia, espressa o implicita, e con la presente declina tutte le altre garanzie, incluse senza limitazioni, garanzie implicite di commerciabilità o idoneità per uno scopo particolare.</p>

                    <h2>7. Limitazione di Responsabilità</h2>
                    <p>In nessun caso TikMatrix o i suoi fornitori saranno responsabili per eventuali danni derivanti dall'uso o dall'impossibilità di utilizzare i materiali o i servizi, anche se TikMatrix è stata avvisata della possibilità di tali danni.</p>

                    <h2>8. Legge Applicabile</h2>
                    <p>Questi Termini saranno regolati e interpretati in conformità con le leggi della giurisdizione in cui TikMatrix è stabilita, senza riguardo alle sue disposizioni sui conflitti di legge.</p>

                    <h2>9. Modifiche ai Termini</h2>
                    <p>TikMatrix si riserva il diritto di modificare questi Termini in qualsiasi momento. Informeremo gli utenti di eventuali modifiche aggiornando la data "Ultimo aggiornamento" di questi Termini. Il tuo uso continuato del nostro sito web e dei servizi dopo eventuali modifiche indica la tua accettazione dei Termini modificati.</p>

                    <h2>10. Contattaci</h2>
                    <p>Se hai domande su questi Termini, contattaci a:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 