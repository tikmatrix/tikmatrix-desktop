import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Términos de Servicio"
            description="Términos de Servicio de TikMatrix - Reglas y pautas para usar nuestra plataforma">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Términos de Servicio</h1>
                    <p>Última actualización: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Aceptación de los Términos</h2>
                    <p>Al acceder o utilizar el sitio web y los servicios de TikMatrix, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, se le prohíbe usar o acceder a este sitio.</p>

                    <h2>2. Licencia de Uso</h2>
                    <p>Se permite la descarga temporal de los materiales (información o software) en el sitio web de TikMatrix solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:</p>
                    <ul>
                        <li>Modificar o copiar los materiales</li>
                        <li>Usar los materiales para ningún propósito comercial o exhibición pública</li>
                        <li>Intentar realizar ingeniería inversa de cualquier software contenido en el sitio web de TikMatrix</li>
                        <li>Eliminar cualquier copyright u otras notaciones de propiedad de los materiales</li>
                        <li>Transferir los materiales a otra persona o "duplicar" los materiales en cualquier otro servidor</li>
                    </ul>
                    <p>Esta licencia terminará automáticamente si viola alguna de estas restricciones y puede ser terminada por TikMatrix en cualquier momento.</p>

                    <h2>3. Servicios y Suscripciones</h2>
                    <p>TikMatrix proporciona herramientas de software para la gestión de cuentas de TikTok y automatización de marketing. El acceso a estos servicios puede requerir una suscripción o pago único. Al suscribirse a nuestros servicios, usted acepta:</p>
                    <ul>
                        <li>Puede cancelar la suscripción en cualquier momento durante el período de prueba; si no cancela, se convertirá automáticamente en una suscripción de pago</li>
                        <li>Proporcionar información de facturación precisa y completa</li>
                        <li>Pagar todas las tarifas en vigor en el momento en que se generen los cargos</li>
                        <li>No usar los servicios para ningún propósito ilegal o que viole cualquier ley o regulación aplicable</li>
                    </ul>

                    <h2>4. Conducta del Usuario</h2>
                    <p>Al usar nuestros servicios, usted acepta no:</p>
                    <ul>
                        <li>Violar ninguna ley o regulación aplicable</li>
                        <li>Infringir los derechos de otros</li>
                        <li>Distribuir malware o participar en otras actividades dañinas</li>
                        <li>Intentar acceder sin autorización a nuestros sistemas o las cuentas de otros usuarios</li>
                        <li>Usar nuestros servicios de cualquier manera que pueda dañar, deshabilitar, sobrecargar o perjudicar nuestros servicios</li>
                    </ul>

                    <h2>5. Propiedad Intelectual</h2>
                    <p>El nombre, logotipo, software y contenido de TikMatrix son propiedad exclusiva de TikMatrix y sus licenciantes. Nuestros servicios y todo el contenido contenido o proporcionado a través de nuestros servicios están protegidos por leyes de propiedad intelectual.</p>

                    <h2>6. Descargo de Responsabilidad</h2>
                    <p>Los materiales en el sitio web de TikMatrix y los servicios proporcionados se entregan "tal cual". TikMatrix no ofrece garantías, expresas o implícitas, y por la presente niega todas las demás garantías, incluidas, entre otras, las garantías implícitas de comerciabilidad o idoneidad para un propósito particular.</p>

                    <h2>7. Limitación de Responsabilidad</h2>
                    <p>En ningún caso TikMatrix o sus proveedores serán responsables de ningún daño derivado del uso o la imposibilidad de usar los materiales o servicios, incluso si TikMatrix ha sido informado de la posibilidad de tales daños.</p>

                    <h2>8. Ley Aplicable</h2>
                    <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de la jurisdicción donde se constituyó TikMatrix, sin tener en cuenta sus disposiciones sobre conflictos de leyes.</p>

                    <h2>9. Cambios en los Términos</h2>
                    <p>TikMatrix se reserva el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios de cualquier cambio actualizando la fecha de "Última actualización" de estos términos. El uso continuado de nuestro sitio web y servicios después de cualquier cambio indica su aceptación de los términos modificados.</p>

                    <h2>10. Contáctenos</h2>
                    <p>Si tiene preguntas sobre estos términos, contáctenos en:</p>
                    <p>Correo electrónico: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
}
