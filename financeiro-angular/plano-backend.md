# Plano separado — API e dados

**Estado:** direcionamento definido; detalhamento e implementação posteriores à prioridade inicial de frontend. Público inicial estimado: uma a três empresas. Isso é uma hipótese de capacidade, não garantia de desempenho ou custo.

## Decisões informadas

- Aplicação Angular consumirá uma API HTTP independente, organizada por módulos de negócio.
- API em TypeScript com Hono, implantada na Vercel. O gateway será a entrada comum para roteamento e controles compartilhados; sua forma concreta (camada no Hono ou serviço dedicado) será decidida antes de implementar, sem assumir custo adicional.
- PostgreSQL gerenciado no Neon como banco relacional. Documentos precisarão de armazenamento de objetos separado, ainda não escolhido.
- Operações comuns síncronas por requisição/resposta. Casos demorados de exportação, migração ou processamento podem futuramente exigir execução assíncrona.
- O snapshot fornecido usa funções em `netlify/functions`; não há base nesta análise para afirmar que ele representa todo o ambiente atualmente em uso.

## Fronteiras e endpoints candidatos

Um serviço implantável com rotas agrupadas, não necessariamente uma function ou microsserviço por endpoint. Exemplos ainda não são contratos finais: `/api/v1/organizations`, `/fiscal-years`, `/cost-centers`, `/budget-items`, `/planning`, `/expenses`, `/suppliers`, `/approvals`, `/exceptions`, `/attachments` e `/reports`. Cada rota deve respeitar organização, módulo contratado, permissão, validação e auditoria. Rotas de estoque terão suas próprias operações e funcionarão sem ativação dos módulos financeiro ou de compras; integrações entre módulos serão opcionais. Documentar contratos e respostas de erro antes de conectar o Angular.

## Segurança e consistência mínimas

Autenticação real e vínculo usuário–organização; autorização por ação no servidor; isolamento por organização inclusive em anexos; validação de entrada, HTTPS, segredos apenas no servidor, limites de upload e acesso, CORS restrito e logs sem dados sensíveis. Decidir provedor de identidade, controle por papéis e armazenamento de arquivos na etapa própria. A camada gateway não substitui autorização em cada operação.

Operações financeiras devem ser transacionais; guardar dinheiro com precisão decimal. Ainda que o uso simultâneo seja incomum, duas sessões, reenvios e falhas podem ocorrer: aplicar controle de concorrência onde necessário e impedir duplicações em operações críticas. Retornar erro claro em conflitos. Auditoria deve registrar ator, empresa, ação, data e alteração relevante.

## Habilitação comercial por organização

Modelar catálogo de módulos e habilitações por organização. Verificar em cada endpoint a identidade, vínculo com a empresa, módulo ativo e permissão específica da ação; ocultar menus no Angular não é controle de acesso. Estoque deve operar de forma independente, com seus próprios produtos, locais e movimentações; serviços de orçamento e compras são integrações opcionais. Um plano completo habilita todos os módulos escolhidos. Desativação não apaga dados automaticamente: regras de retenção, acesso e reativação serão definidas antes de vender. Testar empresas diferentes, estoque isolado, combinações e chamadas diretas a endpoints não contratados.

## Banco e migração

Modelar entidades e índices por organização; definir migrations de schema versionadas, validação e reversão. Avaliar conexão/pooling e limites com a configuração efetiva do Neon e Vercel. A migração do JSON legado é projeto próprio: dados reais não estão no snapshot anonimizado; exigir simulação, relatório de rejeições, reconciliação e ensaio de rollback.

## Custos, escala e monitoramento

Usar Hobby em testes pessoais e não comerciais conforme termos vigentes. A Vercel restringe Hobby a uso pessoal/não comercial; para vendas, avaliar plano comercial apropriado antes da operação. As cotas de invocações, CPU, memória e transferência são limites distintos; monitorar todos e verificar os valores vigentes no painel. Plano gratuito não constitui compromisso de serviço. Separar ambientes, acompanhar consumo, erros, tempos p50/p95 por rota, tempo de banco, conexões, timeouts e disponibilidade. Estabelecer metas e orçamento quando existirem medições do piloto; revisar ao observar degradação sustentada, crescimento de consumo ou reclamações, antes de limites serem atingidos. Investigar consultas, índices, região e conexões antes de escolher upgrade da Vercel/Neon ou migração para AWS. Não assumir que mudar de provedor resolve latência por si só.

## Backlog futuro

1. Definir escopo do gateway, autenticação, isolamento, identidade e contratos.
2. Modelar schema e migrations; criar organizações e permissões.
3. Implementar orçamento, planejamento e disponibilidade; depois despesas, decisões e exceções.
4. Implementar evidências, auditoria, testes de isolamento e monitoramento.
5. Integrar Angular por adaptadores; ensaiar importação e reconciliar com dados autorizados.
6. Homologar capacidade, custos, restauração e operação antes do piloto real.

Referências verificadas em 15/11/2026: https://vercel.com/docs/plans/hobby e https://vercel.com/legal/terms

