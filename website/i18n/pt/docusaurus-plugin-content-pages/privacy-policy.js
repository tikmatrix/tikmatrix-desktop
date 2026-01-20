import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Política de Privacidade"
            description="Política de Privacidade da TikMatrix - Como coletamos, usamos e protegemos seus dados">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Política de Privacidade</h1>
                    <p>Última atualização: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introdução</h2>
                    <p>Bem-vindo à TikMatrix (doravante "nós", "nosso" ou "a empresa"). Estamos comprometidos em proteger suas informações pessoais e direitos de privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site ou usa nossos serviços.</p>

                    <h2>2. Informações que Coletamos</h2>
                    <p>Podemos coletar vários tipos de informações dos usuários de nosso site e serviços, incluindo:</p>
                    <ul>
                        <li><strong>Informações Pessoais:</strong> Nome, endereço de e-mail, número de telefone e outros identificadores fornecidos quando você se registra em nossos serviços ou se comunica conosco.</li>
                        <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, sistema operacional e outros detalhes técnicos quando você visita nosso site.</li>
                        <li><strong>Informações de Uso:</strong> Como você interage com nosso site e serviços, incluindo recursos utilizados e tempo gasto.</li>
                    </ul>

                    <h2>3. Como Usamos Suas Informações</h2>
                    <p>Podemos usar as informações coletadas para vários propósitos, incluindo:</p>
                    <ul>
                        <li>Fornecer, operar e manter nossos serviços</li>
                        <li>Melhorar e personalizar sua experiência</li>
                        <li>Comunicar-nos com você sobre atualizações, suporte e promoções</li>
                        <li>Analisar padrões de uso para aprimorar nossos serviços</li>
                        <li>Prevenir fraudes e garantir segurança</li>
                    </ul>

                    <h2>4. Compartilhamento e Divulgação de Informações</h2>
                    <p>Podemos compartilhar suas informações nas seguintes situações:</p>
                    <ul>
                        <li><strong>Provedores de Serviços:</strong> Com terceiros que nos ajudam a operar nosso negócio e fornecer serviços.</li>
                        <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou para proteger nossos direitos ou a segurança dos usuários.</li>
                        <li><strong>Transferências de Negócios:</strong> Em conexão com fusões, aquisições ou vendas de ativos.</li>
                    </ul>

                    <h2>5. Segurança de Dados</h2>
                    <p>Implementamos medidas de segurança apropriadas para proteger suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro, e não podemos garantir segurança absoluta.</p>

                    <h2>6. Seus Direitos</h2>
                    <p>Dependendo de sua localização, você pode ter certos direitos sobre suas informações pessoais, incluindo:</p>
                    <ul>
                        <li>Acessar suas informações pessoais</li>
                        <li>Corrigir informações pessoais imprecisas</li>
                        <li>Excluir suas informações pessoais</li>
                        <li>Opor-se a certas atividades de processamento</li>
                        <li>Portabilidade de dados</li>
                    </ul>

                    <h2>7. Privacidade de Crianças</h2>
                    <p>Nossos serviços não são direcionados a indivíduos menores de 16 anos. Não coletamos intencionalmente informações pessoais de crianças.</p>

                    <h2>8. Alterações nesta Política de Privacidade</h2>
                    <p>Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e atualizando a data da "Última atualização".</p>

                    <h2>9. Entre em Contato</h2>
                    <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:</p>
                    <p>E-mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}