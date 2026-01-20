import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Sobre Nós"
            description="Saiba mais sobre TikMatrix - quem somos, nossa missão e visão">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Sobre Nós</h1>

                    <h2>Perfil da Empresa</h2>
                    <p>TikMatrix é desenvolvido pela TikMatrix LLC, uma empresa registrada no estado de Wyoming, Estados Unidos. Desde a nossa fundação, temos nos dedicado a criar ferramentas inovadoras de marketing de mídia social para ajudar empresas e criadores de conteúdo a maximizar sua presença online.</p>

                    <h2>Nossa Missão</h2>
                    <p>Nossa missão é desenvolver ferramentas de marketing de mídia social poderosas e fáceis de usar que ajudem empresas de todos os tamanhos a expandir sua presença online de forma eficiente. Nos esforçamos para tornar tecnologias avançadas de marketing acessíveis a todos.</p>

                    <h2>Nossos Produtos</h2>
                    <p>Nosso produto principal, TikMatrix, é projetado para gerenciamento profissional de contas TikTok e automação de marketing. Também oferecemos ferramentas complementares para outras plataformas:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Ferramenta profissional de gerenciamento de contas e marketing para TikTok</li>
                        <li><strong>IgMatrix</strong> - Solução de marketing e gerenciamento de contas para Instagram</li>
                        <li><strong>VideoMagic</strong> - Ferramenta de criação e otimização de conteúdo de vídeo</li>
                        <li><strong>YtMatrix</strong> - Plataforma de crescimento e gerenciamento de canais do YouTube</li>
                    </ul>

                    <h2>Nossa Tecnologia</h2>
                    <p>Na TikMatrix, aproveitamos tecnologia de ponta para fornecer ferramentas de marketing de mídia social confiáveis, eficientes e seguras. Nossa equipe de desenvolvimento trabalha continuamente para melhorar nossos produtos e incorporar as últimas inovações do setor, garantindo que nossos usuários sempre tenham acesso às melhores ferramentas de marketing.</p>

                    <h2>Nossos Valores</h2>
                    <p>Acreditamos firmemente em:</p>
                    <ul>
                        <li><strong>Inovação</strong> - Melhorar continuamente nossos produtos para atender às necessidades do mercado em constante mudança</li>
                        <li><strong>Confiabilidade</strong> - Garantir que nossas ferramentas funcionem de forma estável e segura</li>
                        <li><strong>Acessibilidade</strong> - Tornar ferramentas avançadas de marketing disponíveis para empresas de todos os tamanhos</li>
                        <li><strong>Sucesso do Cliente</strong> - Priorizar o crescimento e as conquistas de nossos usuários</li>
                    </ul>

                    <h2>Junte-se a Nós</h2>
                    <p>Seja você proprietário de uma pequena empresa, criador de conteúdo ou profissional de marketing, TikMatrix oferece as ferramentas necessárias para ter sucesso no ambiente competitivo das mídias sociais de hoje. Nossa equipe está dedicada a ajudá-lo a alcançar seus objetivos de marketing e expandir sua presença online.</p>

                    <h2>Entre em Contato</h2>
                    <p>Tem perguntas ou precisa de ajuda? Estamos aqui para você!</p>
                    <p>E-mail: support@tikmatrix.com</p>
                    <p>Junte-se à nossa comunidade: <a href="https://t.me/tikmatrix_agent_bot">Grupo de Suporte no Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
}