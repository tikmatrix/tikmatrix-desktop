import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Termos de Serviço"
            description="Termos de Serviço da TikMatrix - Regras e diretrizes para uso de nossa plataforma">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Termos de Serviço</h1>
                    <p>Última atualização: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Aceitação dos Termos</h2>
                    <p>Ao acessar ou usar o site e os serviços da TikMatrix, você concorda em estar vinculado a estes Termos de Serviço e a todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, estará proibido de usar ou acessar este site.</p>

                    <h2>2. Licença de Uso</h2>
                    <p>É permitido o download temporário de materiais (informações ou software) no site da TikMatrix apenas para visualização pessoal e não comercial. Esta é uma concessão de licença, não uma transferência de propriedade, e sob esta licença você não pode:</p>
                    <ul>
                        <li>Modificar ou copiar os materiais</li>
                        <li>Usar os materiais para qualquer finalidade comercial ou exibição pública</li>
                        <li>Tentar fazer engenharia reversa de qualquer software contido no site da TikMatrix</li>
                        <li>Remover quaisquer direitos autorais ou outras marcas proprietárias dos materiais</li>
                        <li>Transferir os materiais para outra pessoa ou "espelhar" os materiais em qualquer outro servidor</li>
                    </ul>
                    <p>Esta licença será automaticamente encerrada se você violar qualquer uma dessas restrições e poderá ser rescindida pela TikMatrix a qualquer momento.</p>

                    <h2>3. Serviços e Assinaturas</h2>
                    <p>TikMatrix oferece ferramentas de software para gerenciamento de contas TikTok e automação de marketing. O acesso a esses serviços pode exigir assinatura ou pagamento único. Ao assinar nossos serviços, você concorda em:</p>
                    <ul>
                        <li>Cancelar a assinatura a qualquer momento durante o período de teste; se não cancelar, será automaticamente convertida em assinatura paga</li>
                        <li>Fornecer informações de cobrança precisas e completas</li>
                        <li>Pagar todas as taxas aplicáveis no momento em que os encargos forem incorridos</li>
                        <li>Não usar o serviço para qualquer finalidade ilegal ou em violação de qualquer lei ou regulamento aplicável</li>
                    </ul>

                    <h2>4. Conduta do Usuário</h2>
                    <p>Ao usar nossos serviços, você concorda em não:</p>
                    <ul>
                        <li>Violar quaisquer leis ou regulamentos aplicáveis</li>
                        <li>Infringir os direitos de terceiros</li>
                        <li>Distribuir malware ou envolver-se em outras atividades prejudiciais</li>
                        <li>Tentar obter acesso não autorizado aos nossos sistemas ou contas de outros usuários</li>
                        <li>Usar nossos serviços de qualquer forma que possa danificar, desabilitar, sobrecarregar ou prejudicar nossos serviços</li>
                    </ul>

                    <h2>5. Propriedade Intelectual</h2>
                    <p>O nome TikMatrix, logotipos, software e conteúdo são propriedade exclusiva da TikMatrix e seus licenciadores. Nossos serviços e todo o conteúdo contido ou fornecido por meio de nossos serviços são protegidos por leis de propriedade intelectual.</p>

                    <h2>6. Isenção de Responsabilidade</h2>
                    <p>Os materiais no site da TikMatrix e os serviços fornecidos são oferecidos "como estão". A TikMatrix não oferece garantias, expressas ou implícitas, e por este meio se isenta de todas as outras garantias, incluindo, sem limitação, garantias implícitas de comercialização ou adequação a uma finalidade específica.</p>

                    <h2>7. Limitação de Responsabilidade</h2>
                    <p>Em nenhuma circunstância a TikMatrix ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou incapacidade de usar os materiais ou serviços, mesmo que a TikMatrix tenha sido notificada da possibilidade de tais danos.</p>

                    <h2>8. Lei Aplicável</h2>
                    <p>Estes termos devem ser regidos e interpretados de acordo com as leis da jurisdição onde a TikMatrix foi constituída, sem considerar suas disposições de conflito de leis.</p>

                    <h2>9. Alterações nos Termos</h2>
                    <p>A TikMatrix reserva-se o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre quaisquer alterações atualizando a data da "Última atualização" destes termos. Seu uso contínuo de nosso site e serviços após quaisquer alterações indica sua aceitação dos termos modificados.</p>

                    <h2>10. Entre em Contato</h2>
                    <p>Se você tiver alguma dúvida sobre estes termos, entre em contato conosco:</p>
                    <p>E-mail: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 