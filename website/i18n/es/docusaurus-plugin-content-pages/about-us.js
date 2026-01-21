import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Sobre Nosotros"
            description="Conoce más sobre TikMatrix - quiénes somos, nuestra misión y visión">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Sobre Nosotros</h1>

                    <h2>Perfil de la Empresa</h2>
                    <p>TikMatrix es desarrollado por TikMatrix LLC, una empresa registrada en Wyoming, Estados Unidos. Desde nuestra fundación, nos hemos dedicado a crear herramientas innovadoras de marketing en redes sociales que ayudan a empresas y creadores de contenido a maximizar su presencia en línea.</p>

                    <h2>Nuestra Misión</h2>
                    <p>Nuestra misión es desarrollar herramientas de marketing en redes sociales potentes y fáciles de usar que ayuden a empresas de todos los tamaños a hacer crecer eficientemente su presencia en línea. Nos esforzamos por hacer que la tecnología de marketing avanzada sea accesible para todos.</p>

                    <h2>Nuestros Productos</h2>
                    <p>Nuestro producto insignia TikMatrix está diseñado para la gestión profesional de cuentas de TikTok y automatización de marketing. También ofrecemos herramientas complementarias para otras plataformas:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Herramienta profesional de gestión de cuentas y marketing de TikTok</li>
                        <li><strong>IgMatrix</strong> - Solución de marketing y gestión de cuentas de Instagram</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> - Herramienta de creación y optimización de contenido de video</li>
                        <li><strong>YtMatrix</strong> - Plataforma de crecimiento y gestión de canales de YouTube</li>
                    </ul>

                    <h2>Nuestra Tecnología</h2>
                    <p>En TikMatrix, aprovechamos tecnología de vanguardia para proporcionar herramientas de marketing en redes sociales confiables, eficientes y seguras. Nuestro equipo de desarrollo trabaja constantemente para mejorar los productos e incorporar las últimas innovaciones de la industria, asegurando que nuestros usuarios siempre tengan acceso a las mejores herramientas de marketing.</p>

                    <h2>Nuestros Valores</h2>
                    <p>Creemos firmemente en:</p>
                    <ul>
                        <li><strong>Innovación</strong> - Mejorar continuamente nuestros productos para satisfacer las demandas cambiantes del mercado</li>
                        <li><strong>Confiabilidad</strong> - Garantizar que nuestras herramientas funcionen de manera consistente, estable y segura</li>
                        <li><strong>Accesibilidad</strong> - Hacer que las herramientas de marketing avanzadas estén disponibles para empresas de todos los tamaños</li>
                        <li><strong>Éxito del Cliente</strong> - Priorizar el crecimiento y los logros de nuestros usuarios</li>
                    </ul>

                    <h2>Únete a Nosotros</h2>
                    <p>Ya seas propietario de una pequeña empresa, creador de contenido o profesional del marketing, TikMatrix ofrece las herramientas que necesitas para tener éxito en el competitivo panorama actual de las redes sociales. Nuestro equipo está dedicado a ayudarte a alcanzar tus objetivos de marketing y expandir tu presencia en línea.</p>

                    <h2>Contáctanos</h2>
                    <p>¿Tienes preguntas o necesitas ayuda? ¡Estamos aquí para ti!</p>
                    <p>Correo electrónico: support@tikmatrix.com</p>
                    <p>Únete a nuestra comunidad: <a href="https://t.me/tikmatrix_agent_bot">Grupo de Soporte en Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
}
