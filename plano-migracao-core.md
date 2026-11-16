# Plano de migração — Gestão Financeira e Orçamentária

**Situação:** proposta inicial aprovada, com direcionamento adicional de arquitetura · **Atualização:** 15/11/2026. A Fase 0 está autorizada; a prioridade inicial é a migração visual para Angular. O backend tem plano separado.

## 1. Fontes e limite da análise

- Dossiê: `C:\Users\emanu\Downloads\Handoff_Produto_Comercial_COMPLETO\Handoff_Produto_Gestao_Financeira_Orcamentaria\01_DOSSIE\Dossie_Produto_Gestao_Financeira_Orcamentaria.docx`.
- Código: `C:\Users\emanu\Downloads\Handoff_Produto_Comercial_COMPLETO\Handoff_Produto_Gestao_Financeira_Orcamentaria\04_CODIGO_REFERENCIA_ANONIMIZADO\Codigo_Referencia_Anonimizado\snapshot`, principalmente `public/index.html`, scripts e estilos complementares e funções `netlify`.
- Design system: `C:\Users\emanu\Downloads\aegon-design-system-assets-20261115T134317Z-1-001\aegon-design-system-assets\DESIGN_SYSTEM.md`, `tokens.json`, componentes e assets.
- Imagem da tela de pendências fornecida pelo responsável.

O dossiê é visão de produto, não especificação final. O snapshot foi anonimizado: dados e modelo oficial foram removidos; não é release de produção. A leitura do código foi exploratória, ainda não um inventário exaustivo nem validação de todos os fluxos em execução. As regras abaixo são hipóteses de referência até sua conferência com o responsável e com o comportamento efetivo.

## 2. Diagnóstico

O produto conecta planejar → aprovar → executar → comprovar → monitorar → revisar. O `public/index.html` tem cerca de 1 MB e contém interface e lógica, com camadas complementares `v1327` a `v1340` e funções serverless. A leitura identifica orçamento vigente, pago, comprometido e saldo; planejamento por exercício e rubrica; despesas; aprovações; pendências e exceções. Há código de detecção de conflito na sincronização compartilhada. O dossiê aponta estado global, JSON compartilhado, acoplamento ao DOM, seleção de perfil e ausência de suíte formal. A existência de telas de login no HTML não comprova autenticação nem isolamento adequados: isso deve ser verificado de ponta a ponta.

A imagem é referência funcional de pendências e navegação; cores verdes e o layout do legado não definem a identidade do novo produto. O design system Aegon será a referência visual.

## 3. Limite do produto e núcleo inicial

**Plataforma compartilhada:** organização, usuários, identidade, permissões, configuração, navegação e auditoria. **Módulo financeiro inicial:** exercício, centros de custo, rubricas, planejamento, orçamento, despesas, aprovações, documentos, pendências e relatórios básicos. As capacidades financeiras não são pré-requisito comercial para uso isolado do estoque.

**Módulos posteriores:** estoque, compras e recebimento, ativos e licenças, projetos, doações, integrações e análises avançadas. O cliente poderá contratar somente estoque, uma combinação de módulos ou o conjunto completo. Estoque continua posterior no cronograma, mas sua independência é requisito desde a arquitetura inicial.

**Conceitos a preservar e validar:** disponível = orçamento vigente − pago − comprometido; orçamento vigente considera orçamento aprovado e ajustes; compromisso não equivale a pagamento; recebimento físico é evento separado. Evitar contagem dupla quando um compromisso se torna pago; definir como tratar pagamentos parciais, estornos, cancelamentos e despesas sem compromisso. Pendência é algo a corrigir; exceção é situação fora da regra com justificativa ou decisão.

## 3.1. Comercialização por módulos

A contratação é por organização: cada empresa tem seu conjunto de módulos habilitados, inclusive apenas estoque ou todos. Uma plataforma comum fornece identidade, organizações, permissões e navegação. Estoque deve manter catálogo, saldos e movimentações próprios suficientes para operar sem orçamento ou despesas. Vínculos financeiros e com compras são integrações opcionais quando os respectivos módulos estiverem ativos; dependências exatas serão especificadas antes da implementação de estoque.

No frontend, navegação e rotas refletem capacidades contratadas e permissões; guardas são apenas experiência de interface. Na API, toda operação verifica identidade, organização, licença do módulo e permissão da ação, inclusive acesso direto por URL. O licenciamento precisa existir por organização no backend e na base. Desabilitação não pode apagar dados automaticamente; retenção, leitura e reativação serão definidas no plano comercial. Critérios: empresa com apenas estoque pode realizar as operações essenciais de estoque sem finanças; não acessa endpoints financeiros; outra empresa com ambos pode usar integrações; mudança de contrato preserva isolamento e dados.
## 4. Versões propostas e critérios de passagem

A numeração é nova para o produto reconstruído; `13.40.0` identifica o snapshot, não uma versão já entregue da nova aplicação. Usar `MAJOR.MINOR.PATCH` e sufixos de pré-lançamento. Alfa, beta e delta descrevem etapas internas planejadas, não promessa de estabilidade. Delta é nome de uma etapa interna escolhida para este projeto, sem significado universal; usar `1.0.0-delta.1`, antes da versão candidata `1.0.0-rc.1`. Correções incrementam o último número; novas funções compatíveis incrementam MINOR; mudanças incompatíveis incrementam MAJOR.

| Marco proposto | Objetivo e entregas | Critério para avançar |
|---|---|---|
| Fase 0 — análise | Mapear HTML e scripts, fluxos visuais, regras e componentes; definir cortes da migração Angular. | Catálogo e critérios de aceite suficientes para iniciar a primeira tela. |
| `0.1.0-alpha.1` — fundação visual | Criar aplicação Angular, shell e tokens Aegon, navegação e primeira jornada com dados sintéticos. | Build e navegação verificadas; layout responsivo e estados essenciais apresentados. |
| `0.2.0-alpha.1` — planejamento e orçamento | Migrar consultas e jornada visual de planejamento, exercício, rubricas e disponibilidade usando contratos locais. | Fluxos visuais e cálculos de demonstração confrontados com casos catalogados; sem alegar dados reais ou segurança de produção. |
| `0.3.0-alpha.1` — execução e decisões | Migrar interfaces de despesas, aprovações, pendências e exceções com dados sintéticos. | Formulários, navegação, estados vazios e validações visíveis verificados. |
| `0.4.0-beta.1` — integração e piloto | Conforme plano separado do backend, integrar API, identidade, isolamento, persistência e evidências. | Jornadas integradas testadas, permissões e isolamento verificados e piloto homologado. |
| `1.0.0-delta.1` — estabilização | Correções, observabilidade, backup/restauração, segurança e ensaio de migração. | Falhas críticas resolvidas e evidências operacionais aprovadas. |
| `1.0.0-rc.1` → `1.0.0` | Homologação e publicação mediante aceite. | Testes e revisão de negócio concluídos; implantação aprovada. |
| `1.x` / `2.0.0` | Evoluções posteriores; versão principal nova para mudanças incompatíveis. | Planejamento e aceite próprios. |

Os marcos de interface não significam que dados estejam persistidos ou protegidos. A integração real depende do plano de backend.
Datas e estimativas dependem da equipe, stack e validação dos fluxos. Não há compromisso de prazo nesta proposta.

## 5. Backlog inicial para gestão no GitHub

Preparar estes itens como épicos/issues quando repositório ou projeto for definido. As etiquetas de fase abaixo descrevem o plano original do produto completo; a ordem vigente para frontend e integração é a tabela da seção 4. Os itens de backend ficam no plano separado. Cada issue deve conter objetivo, escopo, critérios verificáveis, dependências e evidência de teste. Colunas sugeridas: Backlog → Pronto → Em andamento → Em revisão → Homologação → Concluído; bloqueio como campo/etiqueta. Milestones correspondem aos marcos aprovados; etiquetas sugeridas: `dominio:orcamento`, `dominio:despesas`, `dominio:aprovacoes`, `dominio:plataforma`, `tipo:regra`, `tipo:ux`, `tipo:seguranca`, `tipo:migracao` e prioridade.

1. **Fase 0 — inventariar legado:** mapear jornadas, estados, fórmulas, regras de arredondamento, exceções, permissões, campos e exportações do `index.html` e scripts posteriores; identificar precedência dos patches. Aceite: catálogo com origem no código e exemplos de entrada/resultado aprovados.
2. **Fase 0 — definir modelo e contratos:** diagrama de entidades, estados e transições, invariantes e contrato de disponibilidade; decisões registradas. Aceite: exemplos cobrem pagamento parcial, cancelamento, ajuste e conflito sem dupla contagem.
3. **Fase 0 — arquitetura e dados:** escolher stack, estratégia de isolamento, infraestrutura, migração de schema e ferramentas justificando manutenção e custo. Aceite: decisão explícita aprovada e ameaças de isolamento avaliadas.
4. **Alfa — identidade e organizações:** login, associação, papéis e verificação no servidor. Aceite: usuário de A não lê/altera dados ou anexos de B, inclusive por identificador direto.
5. **Alfa — exercício e cadastros:** CRUD controlado, centros, rubricas e fornecedores por tenant. Aceite: campos, validações, referências e histórico definidos.
6. **Alfa — planejamento:** versões, justificativa, distribuição mensal e decisão. Aceite: valores reconciliam e orçamento vigente só muda por transição autorizada.
7. **Alfa — execução e saldo:** registrar, editar conforme estado, cancelar, comprometer e pagar. Aceite: transições e saldos cobertos por casos de negócio e transações concorrentes.
8. **Alfa — evidências e auditoria:** anexos vinculados com metadados, acesso controlado e eventos de alterações. Aceite: ator, instante, entidade e alteração registrados; proteção de upload e política de retenção definidas.
9. **Beta — decisões e exceções:** fila, aprovar/reprovar/devolver e resolver pendências, com justificativa quando exigida. Aceite: decisão rastreável e estado acessível, inclusive caso sem registros.
10. **Beta — visão e relatórios:** filtros por exercício, orçamento e lançamentos; exportações básicas. Aceite: totais de tela e arquivo conciliam com dados de origem.
11. **Beta — importação e reconciliação:** mapeamento de campos, validação prévia, execução repetível e relatório de rejeições. Aceite: teste com dados sintéticos, contagens, valores e vínculos reconciliados; nenhuma alteração silenciosa no legado.
12. **Delta/RC — qualidade operacional:** segurança, acessibilidade, observabilidade, backups, restauração e implantação. Aceite: evidências de teste e homologação registradas.

## 6. Estratégia de arquitetura e migração

Direção definida: frontend Angular 22 (suporte ativo, com LTS previsto a partir de junho de 2027 até junho de 2028, sujeito à atualização do fabricante); API independente com Hono na Vercel, gateway e PostgreSQL no Neon, em plano e etapa separados. Organização modular com contratos claros, API responsável pelas regras e armazenamento separado de arquivos. Autenticação real e autorização aplicadas no servidor em todas as operações. Isolamento por organização inclusive em consultas, índices, anexos, logs e exportações; mecanismo concreto escolhido na decisão técnica. Valores financeiros em decimal exato ou unidades inteiras de menor valor, nunca ponto flutuante para cálculos financeiros.

1. Catalogar comportamento e criar casos de regressão com exemplos sintéticos antes de alterar a arquitetura. Incluir fluxos de planejamento, aprovações, disponibilidade, pagamentos e exceções.
2. Definir modelo canônico e migrations versionadas de schema; cada mudança deve ter verificação, plano de retorno e preservação de dados.
3. Conhecer uma exportação real autorizada antes de especificar importação definitiva: o snapshot não contém a base operacional. Mapear identificadores, exercícios, rubricas, valores, estados, fornecedores, documentos e referências; identificar dados ausentes e duplicados.
4. Implementar importação com modo de simulação, validação por linha, relatório de rejeições, execução idempotente e registro de origem. Não inventar dados ausentes; anexos exigem plano específico de cópia e verificação de acesso.
5. Ensaiar em ambiente isolado: comparar contagens, somas por exercício/rubrica/estado, saldos, amostras de documentos e regras com a origem. Correções exigem nova reconciliação.
6. Planejar janela de corte, backup verificável, suspensão ou controle de gravações, reconciliação final, aceite e retorno ao legado. Nenhuma troca de produção sem aprovação específica.

Concorrência: usar transações e versão por registro/condição de atualização para rejeitar alterações obsoletas, informando o usuário; não descartar alterações silenciosamente. Offline permanece decisão aberta; não sinalizar sucesso antes da confirmação do servidor.

## 7. Design system e experiência

- Paleta oficial: Core Pulse `#FFF1E4`, System Wake `#0045BA`, Shadow State `#0A2844`, acento Pulse Yellow `#FFC126`; ações digitais `#0057FF`. Usar tokens semânticos de sucesso, atenção, erro e informação para estados, sempre com texto/ícone.
- Tema claro padrão: fundo creme, superfícies brancas e navegação Shadow; escuro usa superfícies azuis do sistema. Validar contraste real, inclusive o contraste de controles no tema escuro apontado como limitação no próprio design system.
- Mulish para produto, números tabulares; VomZom apenas para identidade, pois o arquivo não contém acentos/números. Escala de espaço de 4 a 64 px, campos de 40 px, cartões 16 px e botões em pílula; shell de referência 248 px, topo 64 px.
- Recriar em Angular os componentes necessários seguindo os tokens e exemplos fornecidos: AppShell, Button, TextField, Select, Badge, DataTable, ApprovalCard, Alert e EmptyState. O bundle fornecido é React 18, não componentes Angular prontos; validar acessibilidade e estados ausentes.
- Navegação por tarefa: Planejar, Executar, Decidir, Analisar, Administrar. Prioridade desktop e tablet; no celular oferecer consulta e ações simples. Preservar contexto, foco, filtros e estado de salvamento.
- A tela anexada orienta o fluxo: diferenciar pendências de exceções, filtrar ativas/histórico e permitir registrar e resolver com justificativa; o visual será redesenhado com tokens Aegon.

## 8. Decisões para aprovação

1. Escopo inicial aprovado: migração financeira primeiro; estoque, compras, ativos e verticais em etapas posteriores, com estoque contratável de forma independente.
2. Delta permanece marco interno de estabilização; os critérios de cada release serão detalhados conforme a implementação.
3. Definidos Angular, Hono na Vercel e PostgreSQL no Neon. Definir desenho do gateway, autenticação, armazenamento e custo antes da etapa de backend.
4. Confirmar regras de pagamento parcial, estorno, alterações de orçamento aprovado, competência, alçadas e excedentes. Definir exemplos numéricos oficiais.
5. Definir fonte de dados real, autorização, volume, documentos e necessidade de histórico para a migração; snapshot anonimizado não permite validar reconciliação de produção.
6. Definir se offline é necessário e qual será o primeiro público piloto.
7. Quando desejado, indicar repositório/GitHub Project e permissões para registrar os itens. Até então este documento é a referência local.

**Portão de decisão:** a proposta inicial foi aprovada. A execução inicia pela Fase 0 e migração visual; o plano de backend e a implantação de dados reais terão validação própria.




