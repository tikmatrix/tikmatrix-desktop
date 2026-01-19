---
sidebar_position: 2
---

# Problemas Conhecidos

## Erro de Conflito de Porta

Se você ver o seguinte erro nos logs:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)
```

Isso indica um conflito de porta. Para resolver este problema:

1. Reinicie completamente a aplicação TikMatrix/IgMatrix e tente novamente.
2. Evite executar outro software de controle de dispositivos simultaneamente com TikMatrix/IgMatrix, pois eles podem causar conflitos de porta.
3. Certifique-se de que nenhuma outra aplicação está usando a mesma porta de comunicação.

Este erro geralmente ocorre quando múltiplas aplicações de controle de dispositivos são executadas ao mesmo tempo e entram em conflito pela porta de comunicação.

## Falhas de Script em Telefone na Nuvem

Certifique-se de ter largura de banda de rede suficiente e estável entre seu PC e o datacenter do telefone na nuvem. Para melhores resultados, coloque o PC e o datacenter do telefone na nuvem no mesmo país ou região para reduzir latência e perda de pacotes, o que ajuda as tarefas de automação a executarem de forma confiável.

## Execução de Script Instável, Erros Aleatórios, Resultados Inconsistentes

Isso é frequentemente relacionado à qualidade da conexão ADB. Se você usa conexão USB, tente um cabo diferente ou porta USB diferente. Se você usa ADB sem fio, certifique-se de ter conexão de rede estável e boa intensidade de sinal entre o PC e o dispositivo.

## Scripts Quebrados por Atualizações de Aplicativo TikTok/Instagram

TikTok e Instagram atualizam frequentemente e podem causar falhas nos scripts de automação. Por favor, envie um ticket de suporte e atualizaremos os scripts para se adaptar às versões mais recentes do aplicativo o mais rápido possível.
