---
slug: how-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: Como corrigir vcruntime140.dll não encontrado ao abrir o TikMatrix
authors: tikMatrix
tags: [vcruntime140.ddl não encontrado, corrigido, tikmatrix]
---

O erro "vcruntime140.dll não encontrado" normalmente ocorre porque o pacote Microsoft Visual C++ Redistributable não está instalado ou está corrompido. Aqui estão as etapas para corrigir esse problema:
<!--truncate-->
---

1. **Baixe o Microsoft Visual C++ Redistributable**:
   - Vá para a [página de download do Microsoft Visual C++ Redistributable](https://support.microsoft.com/pt-br/help/2977003/the-latest-supported-visual-c-downloads).
   - Baixe a versão apropriada para seu sistema (geralmente a versão de 64 bits para computadores modernos, mas você pode precisar da versão de 32 bits se seu aplicativo especificamente requer).

2. **Instale o Pacote Redistributable**:
   - Execute o instalador baixado e siga as instruções na tela para instalá-lo.
   - Se você já o tiver instalado, pode querer reparar a instalação selecionando a opção "Reparar" durante o processo de instalação.

3. **Reinicie Seu Computador**:
   - Após instalar ou reparar o pacote, reinicie seu computador para garantir que todas as alterações tenham efeito.

4. **Verifique por Atualizações**:
   - Certifique-se de que seu Windows está atualizado. Vá para `Configurações > Atualização e Segurança > Windows Update` e verifique por atualizações.

5. **Reinstale o TikMatrix**:
   - Se as etapas acima não funcionarem, tente desinstalar e depois reinstalar o TikMatrix. Certifique-se de baixar a versão mais recente do site oficial.

Se o erro persistir após tentar essas etapas, você pode precisar verificar por problemas adicionais, como arquivos de sistema corrompidos, executando a ferramenta System File Checker:

1. **Execute o System File Checker (SFC)**:
   - Abra o Prompt de Comando como administrador (clique com o botão direito no botão Iniciar e selecione "Prompt de Comando (Admin)" ou "Windows PowerShell (Admin)").
   - Digite `sfc /scannow` e pressione Enter.
   - Aguarde o processo ser concluído. Se o SFC encontrar algum problema, tentará corrigi-los.

Essas etapas devem ajudar a resolver o erro "vcruntime140.dll não encontrado" e permitir que o TikMatrix funcione adequadamente.
