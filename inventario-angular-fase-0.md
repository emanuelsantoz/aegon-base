# Fase 0 — inventário inicial para migração Angular

**Prioridade:** layout e migração gradual do HTML. Usar Angular 22, atualmente em suporte ativo; fase LTS prevista a partir de junho de 2027, com suporte total previsto até junho de 2028. Referência: https://angular.dev/reference/releases. Fonte: `snapshot/public/index.html` e camadas posteriores. Isto é um recorte inicial de leitura estática; não representa verificação completa do comportamento em execução.

| Origem no HTML | Função identificada | Tratamento inicial Angular |
|---|---|---|
| `homeView`, linha 2461 | Visão geral, indicadores, saldo, execução, pendências e atalhos. | Página de visão geral; cartões KPI, painel e navegação reutilizáveis. |
| `inboxView`, 2634 | Documentos/caixa de entrada. | Página posterior de evidências; estados vazios e ações explícitas. |
| `expenseView`, 2642 | Registrar despesa com contexto orçamentário. | Formulário reativo; campos, validação e confirmação a inventariar. |
| `budgetView`, 2647 | Orçamento por rubrica, aprovado, ajustes, execução e saldo; exportação. | Tabela reutilizável, filtros, KPIs e formatação monetária. |
| `transactionsView`, 2662 | Lançamentos. | Lista/tabela, filtros e detalhe. |
| `planningView`, 2669 | Exercício, premissas, rubricas, proposta e aprovação. | Página e formulários de planejamento; distribuição mensal e estados. |
| `exceptionsView`, 2764 | Pendências e exceções, filtros, histórico e registro manual. | Primeira tela candidata: filtros, lista, vazio e formulário de exceção. |
| `reportsView`, 2769 | Relatórios e exportações. | Catálogo visual; exportação real depende da API. |
| `monthlyView`, 4337 | Agenda mensal e despesas programadas. | Planejar após jornadas básicas; dependências a mapear. |
| `approvalsView`, 4341 | Fila de decisões, filtros e ações. | Cards/tabela de decisão, aprovação, reprovação e devolução com motivo. |

Identificadores/linhas são pistas para navegação no snapshot e podem coexistir com lógica gerada ou substituída por scripts posteriores. `donationsView`, `inventoryView` e infraestrutura pertencem a etapas posteriores. As regras, precedência das camadas, persistência e efeitos de cada ação exigem análise específica.

## Sequência de trabalho

1. Mapear navegação e estados efetivos; catalogar diferenças entre marca do legado e tokens Aegon.
2. Definir projeto Angular, rotas, capacidades por módulo e componentes de shell; reconstruir componentes em Angular seguindo os tokens e exemplos do design system. O bundle fornecido é React 18 e não é componente Angular pronto.
3. Migrar pendências e exceções como primeiro recorte visual, incluindo vazio, filtros e cadastro simulado; depois visão geral, orçamento, planejamento, despesas e aprovações.
4. Usar contratos locais e dados sintéticos para a interface; demonstrar claramente que ações são simulações. Nenhuma credencial, autorização ou persistência de produção é afirmada nesta fase.
5. Conferir desktop, tablet, navegação por teclado, foco, rótulos e estados; revisar regras financeiras com exemplos antes de implementação real.

## Critério da primeira entrega

Shell responsivo e tela de pendências usando cores, tipografia e espaçamento Aegon, com navegação funcional para os recortes disponíveis, filtro e estado vazio testáveis; criar exceção simulada somente em memória, com rótulo explícito. Construção e execução local documentadas. Sem publicar, conectar serviços ou migrar dados reais.


