import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Política de Privacidad"
            description="Política de Privacidad de TikMatrix - Cómo recopilamos, usamos y protegemos sus datos">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Política de Privacidad</h1>
                    <p>Última actualización: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introducción</h2>
                    <p>Bienvenido a TikMatrix (en adelante, "nosotros", "nuestro" o "la empresa"). Estamos comprometidos con la protección de su información personal y sus derechos de privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios.</p>

                    <h2>2. Información que Recopilamos</h2>
                    <p>Podemos recopilar varias categorías de información de los usuarios de nuestro sitio web y servicios, incluyendo:</p>
                    <ul>
                        <li><strong>Información Personal:</strong> Nombre, dirección de correo electrónico, número de teléfono y otros identificadores que proporciona al registrarse en nuestros servicios o comunicarse con nosotros.</li>
                        <li><strong>Información Técnica:</strong> Dirección IP, tipo de navegador, sistema operativo y otros detalles técnicos cuando visita nuestro sitio web.</li>
                        <li><strong>Información de Uso:</strong> Cómo interactúa con nuestro sitio web y servicios, incluidas las funciones utilizadas y el tiempo dedicado.</li>
                    </ul>

                    <h2>3. Cómo Usamos su Información</h2>
                    <p>Podemos usar la información recopilada para varios propósitos, incluyendo:</p>
                    <ul>
                        <li>Proporcionar, operar y mantener nuestros servicios</li>
                        <li>Mejorar y personalizar su experiencia</li>
                        <li>Comunicarnos con usted sobre actualizaciones, soporte y promociones</li>
                        <li>Analizar patrones de uso para mejorar nuestros servicios</li>
                        <li>Prevenir fraudes y garantizar la seguridad</li>
                    </ul>

                    <h2>4. Compartir y Divulgar Información</h2>
                    <p>Podemos compartir su información en las siguientes circunstancias:</p>
                    <ul>
                        <li><strong>Proveedores de Servicios:</strong> Con terceros que nos ayudan a operar nuestro negocio y proporcionar servicios.</li>
                        <li><strong>Requisitos Legales:</strong> Cuando la ley lo requiera o para proteger nuestros derechos o la seguridad de los usuarios.</li>
                        <li><strong>Transferencias Comerciales:</strong> En relación con fusiones, adquisiciones o ventas de activos.</li>
                    </ul>

                    <h2>5. Seguridad de los Datos</h2>
                    <p>Implementamos medidas de seguridad apropiadas para proteger su información personal. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, y no podemos garantizar seguridad absoluta.</p>

                    <h2>6. Sus Derechos</h2>
                    <p>Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, incluyendo:</p>
                    <ul>
                        <li>Acceder a su información personal</li>
                        <li>Corregir información personal inexacta</li>
                        <li>Eliminar su información personal</li>
                        <li>Oponerse a ciertas actividades de procesamiento</li>
                        <li>Portabilidad de datos</li>
                    </ul>

                    <h2>7. Privacidad de Menores</h2>
                    <p>Nuestros servicios no están dirigidos a personas menores de 16 años. No recopilamos intencionalmente información personal de menores.</p>

                    <h2>8. Cambios a esta Política de Privacidad</h2>
                    <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización".</p>

                    <h2>9. Contáctenos</h2>
                    <p>Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:</p>
                    <p>Correo electrónico: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}
