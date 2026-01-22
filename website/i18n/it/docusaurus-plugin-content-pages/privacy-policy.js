import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Informativa sulla Privacy"
            description="Informativa sulla Privacy di TikMatrix - Come raccogliamo, utilizziamo e proteggiamo i tuoi dati">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Informativa sulla Privacy</h1>
                    <p>Ultimo aggiornamento: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introduzione</h2>
                    <p>Benvenuto su TikMatrix ("noi", "nostro" o "la società"). Ci impegniamo a proteggere le tue informazioni personali e il tuo diritto alla privacy. Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni quando visiti il nostro sito web o utilizzi i nostri servizi.</p>

                    <h2>2. Informazioni che Raccogliamo</h2>
                    <p>Possiamo raccogliere diversi tipi di informazioni da e sugli utenti del nostro sito web e servizi, tra cui:</p>
                    <ul>
                        <li><strong>Informazioni Personali:</strong> Nome, indirizzo email, numero di telefono e altri identificatori che fornisci quando ti registri ai nostri servizi o comunichi con noi.</li>
                        <li><strong>Informazioni Tecniche:</strong> Indirizzo IP, tipo di browser, sistema operativo e altri dettagli tecnici quando visiti il nostro sito web.</li>
                        <li><strong>Informazioni di Utilizzo:</strong> Come interagisci con il nostro sito web e servizi, incluse le funzionalità utilizzate e il tempo trascorso.</li>
                    </ul>

                    <h2>3. Come Utilizziamo le Tue Informazioni</h2>
                    <p>Possiamo utilizzare le informazioni che raccogliamo per vari scopi, tra cui:</p>
                    <ul>
                        <li>Fornire, gestire e mantenere i nostri servizi</li>
                        <li>Migliorare e personalizzare la tua esperienza</li>
                        <li>Comunicare con te riguardo aggiornamenti, supporto e promozioni</li>
                        <li>Analizzare i modelli di utilizzo per migliorare i nostri servizi</li>
                        <li>Prevenire frodi e garantire la sicurezza</li>
                    </ul>

                    <h2>4. Condivisione e Divulgazione delle Informazioni</h2>
                    <p>Possiamo condividere le tue informazioni nelle seguenti situazioni:</p>
                    <ul>
                        <li><strong>Fornitori di Servizi:</strong> Con terze parti che ci aiutano a gestire la nostra attività e fornire servizi.</li>
                        <li><strong>Requisiti Legali:</strong> Quando richiesto dalla legge o per proteggere i nostri diritti o la sicurezza degli utenti.</li>
                        <li><strong>Trasferimenti Aziendali:</strong> In connessione con una fusione, acquisizione o vendita di beni.</li>
                    </ul>

                    <h2>5. Sicurezza dei Dati</h2>
                    <p>Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali. Tuttavia, nessun metodo di trasmissione su Internet o archiviazione elettronica è sicuro al 100%, e non possiamo garantire la sicurezza assoluta.</p>

                    <h2>6. I Tuoi Diritti</h2>
                    <p>A seconda della tua posizione, potresti avere determinati diritti riguardo alle tue informazioni personali, tra cui:</p>
                    <ul>
                        <li>Accedere alle tue informazioni personali</li>
                        <li>Correggere informazioni personali imprecise</li>
                        <li>Eliminare le tue informazioni personali</li>
                        <li>Opporsi a determinate attività di elaborazione</li>
                        <li>Portabilità dei dati</li>
                    </ul>

                    <h2>7. Privacy dei Bambini</h2>
                    <p>I nostri servizi non sono destinati a persone di età inferiore ai 16 anni. Non raccogliamo consapevolmente informazioni personali da bambini.</p>

                    <h2>8. Modifiche a Questa Informativa sulla Privacy</h2>
                    <p>Potremmo aggiornare la nostra Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina e aggiornando la data "Ultimo aggiornamento".</p>

                    <h2>9. Contattaci</h2>
                    <p>Se hai domande su questa Informativa sulla Privacy, contattaci a:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 