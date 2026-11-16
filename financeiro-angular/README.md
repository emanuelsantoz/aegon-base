# Aegon — Gestão financeira

Primeiro recorte de interface em Angular 22. Esta versão é uma demonstração local: os registros ficam apenas na memória e são perdidos ao atualizar a página. Sem API, autenticação ou persistência.

## Requisitos

Node.js `^22.22.3`, `^24.15.0` ou `>=26.0.0` compatível com Angular 22; npm. Use um Node compatível como padrão antes de executar os comandos.

```sh
npm install
npm start
```

Abra a URL indicada pelo Angular CLI, normalmente `http://localhost:4200/`. Para verificar o build: `npm run build`.

A primeira tela permite registrar, filtrar e resolver exceções simuladas. Os itens do menu apresentados como indisponíveis são jornadas futuras. O design usa as cores, tipografia e diretrizes do design system Aegon fornecido. Os módulos de negócio serão integrados posteriormente; estoque deverá funcionar separadamente do financeiro.
