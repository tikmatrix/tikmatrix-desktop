---
sidebar_position: 1
title: Posicionamento e Roadmap do Produto TikMatrix/IgMatrix
sidebar_label: Roadmap
description: Roadmap oficial descrevendo o posicionamento do TikMatrix/IgMatrix, limites de capacidade e recomendações de implantação.
slug: roadmap
---

## Mapa de Processo Completo

![TikMatrix/IgMatrix Roadmap](/img/roadmap-en.svg)

---

## Para quem criamos valor

- **PMEs / MCNs / marcas / equipes de experimentos**: precisam de execução estável de ações operacionais diárias, mas semelhantes às humanas, em escala de 5–100 dispositivos.
- **Crescimento e operações de conteúdo**: precisam de orquestração em lote controlável (mas não mecânica) que equilibre segurança e eficiência.

---

## Propostas de valor principais (por que escolher TikMatrix/IgMatrix)

1. **Automação em lote componível**: construa pipelines reutilizáveis com o modelo "tarefa → script → fonte de dados", cobrindo aquecimento, publicação, engajamento e coleta.
2. **Comportamento semelhante ao humano e controle de risco**: o motor suporta temporização aleatória, controle de ritmo, simulação de gestos humanos e recuperação anormal para se assemelhar ao comportamento de usuários reais.
3. **Escalabilidade e estabilidade**: suporta dispositivos reais / dispositivos em nuvem híbridos, USB/TCP ADB, permitindo escalonamento linear de 5→20→50→100 dispositivos com agendamento confiável.
4. **Observabilidade**: logs de tarefas, espelhamento de dispositivos, estatísticas de contas e dados de resultados exportáveis.

---

## Mapa de capacidades (escopo da etapa 4)

### 1) Orquestração e agendamento de tarefas

- Estratégias de simultaneidade multi-conta / multi-dispositivo, ordem de execução aleatória
- Tentar novamente em caso de falha, retomar do ponto de interrupção, gerenciamento de recursos (ativos/contas/proxies)

### 2) Centro de scripts

- **Scripts de marketing avançado**: inclui Impulsionar usuários/postagens, DMs em massa, comentários em lote
- Scripts de aquecimento de contas: navegação diária, permanência, interações leves
- Scripts de publicação de conteúdo: gerenciamento de vídeo/legenda/tags/tópicos, publicação agendada
- Scripts de coleta de dados: coletar informações do usuário e construir próximas listas de alvos

### 3) Humano e controle de risco

- Randomização de toque/deslize/pausa/tempo de visualização
- Detecção de anomalias e limites de taxa para evitar comportamento de alta frequência repentino

> **Declaração de limites**: TikMatrix/IgMatrix NÃO fornece dispositivos, contas ou proxies; focamos na automação de ações operacionais.

---

## Recomendações de implantação (de 0 a escala)

1. **Validação (1–5 dispositivos)**: conectar dispositivos → contas → proxies → ciclo fechado mínimo de script único
2. **Piloto (10–20 dispositivos)**: introduzir scripts de marketing avançado + loop de coleta de dados; monitorar limites de risco
3. **Expansão (20–50 dispositivos)**: limitação de taxa de grupo, estratégias aleatórias, rotação de múltiplas fontes de dados
4. **Escala (50–100 dispositivos)**: agendamento em lote, execução escalonada

---

## Notas de riscos e conformidade

- O uso de automação pode violar os termos da plataforma; use por sua conta e risco e controle a frequência/padrões de comportamento
- Hardware do dispositivo, proxies, qualidade da conta e estratégia operacional afetam significativamente a estabilidade e os resultados

---

## FAQ

**P: O TikMatrix fornece contas/proxies?**  
R: Não. Focamos no motor de automação e execução de scripts.

**P: Vocês fornecem cloud phones?**  
R: Não. Os usuários devem preparar seus próprios ambientes de dispositivos.

**P: Vocês suportam cloud phones?**  
R: Qualquer dispositivo que possa ser conectado de forma estável via ADB (USB/TCP) pode ser agendado.

---

## Chamada para ação

- Experimente o plano Starter agora e construa seu ciclo fechado mínimo viável da etapa 4
- Leia a documentação dos scripts para começar com operações em lote
