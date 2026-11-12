# RioAlerta — Alerta cidadão de enchentes

**Global Solution 2026.2 · Cloud Solutions & Scalable Infrastructure · Tema: CitizenTech**

[![CI/CD - RioAlerta](https://github.com/1tico1/rioalerta-citizentech/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/1tico1/rioalerta-citizentech/actions/workflows/ci-cd.yml)

**Aplicação publicada:** https://1tico1.github.io/rioalerta-citizentech/

## Integrantes — Grupo GeoCosmos

| Nome | RM | Turma |
|------|----|-------|
| Eduardo Veiga | RM561575 | 2TSCPV |
| Thiago Ulrych | RM565929 | 2TSCPV |

## Problema e proposta

Em São Paulo, quem mora perto de rios e córregos (Tietê, Tamanduateí, Pirajuçara e outros) costuma descobrir o risco de enchente quando a água já está na rua. A informação existe, mas fica espalhada entre boletins, notícias e canais da prefeitura.

O **RioAlerta** é uma página simples, pensada para o celular, em que o cidadão:

- vê o nível de risco de enchente do seu bairro (Baixo, Atenção, Alto ou Crítico), calculado pela chuva acumulada nas últimas 24 horas;
- busca o bairro pelo nome (sem precisar digitar acento) e filtra por zona da cidade;
- recebe uma orientação objetiva do que fazer em cada nível de risco;
- encontra pontos de apoio e abrigos da sua zona;
- liga com um toque para Defesa Civil (199), Bombeiros (193), SAMU (192) e Central 156.

> Os volumes de chuva e os endereços dos pontos de apoio são **dados simulados** para demonstração acadêmica. O foco da atividade é o fluxo de desenvolvimento e entrega automatizado.

## Origem do projeto

Projeto **criado pela equipe** do zero para esta Global Solution. O tema conversa com o trabalho de alerta de enchentes feito na disciplina de Data Protection & Ingestion Solutions, mas nenhum código foi reaproveitado.

## Tecnologias

- HTML, CSS e JavaScript (ES Modules), sem framework
- Node.js 22 para automação: testes com o runner nativo `node --test`, validação de HTML com `html-validate` e script de build próprio (`scripts/build.js`)
- GitHub (repositório, Issues, Projects, branches e Pull Request)
- GitHub Actions (CI/CD)
- GitHub Pages (hospedagem da aplicação)

## Estrutura do repositório

```
.
├── .github/workflows/ci-cd.yml   # workflow de CI/CD
├── docs/evidencias/              # capturas de tela das evidências
├── scripts/build.js              # gera dist/ e grava o commit no rodapé
├── src/
│   ├── app.js                    # interface (renderização e filtros)
│   ├── data.js                   # bairros, contatos e pontos de apoio (simulados)
│   ├── logic.js                  # regras de negócio testadas no CI
│   └── styles.css                # identidade visual
├── tests/logic.test.js           # testes automatizados
├── index.html
├── package.json / package-lock.json
└── .htmlvalidate.json
```

## Como executar localmente

Pré-requisito: Node.js 22 ou superior.

```bash
npm ci            # instala as dependências
npm run lint      # valida o HTML
npm test          # roda os testes automatizados
npm run build     # gera a pasta dist/
npm start         # serve a aplicação em http://localhost:3000
```

## Como o GitHub foi utilizado

### Planejamento: Projects e Issues

- **Project (quadro Kanban):** [GeoCosmos — RioAlerta CitizenTech (Entregas)](https://github.com/users/1tico1/projects/3), com as colunas Todo → In Progress → Done.
- **Issues** (todas com título, descrição, responsável, label e status no Project):

| Issue | Tipo | Descrição | Status final |
|-------|------|-----------|--------------|
| [#1](https://github.com/1tico1/rioalerta-citizentech/issues/1) | História de usuário | Como cidadão, quero consultar o risco de enchente no meu bairro e saber a quem ligar. Tem critérios de aceitação e checklist ligando as tarefas #2, #3 e #4 | Done |
| [#2](https://github.com/1tico1/rioalerta-citizentech/issues/2) | Tarefa | Personalizar a aplicação RioAlerta para a proposta CitizenTech | Done |
| [#3](https://github.com/1tico1/rioalerta-citizentech/issues/3) | Tarefa | Configurar workflow de CI/CD com GitHub Actions e deploy no GitHub Pages | Done |
| [#4](https://github.com/1tico1/rioalerta-citizentech/issues/4) | Tarefa | Adicionar seção de pontos de apoio e abrigos (feita em branch e integrada por PR) | Done (fechada pelo PR #5) |

Cada item passou por Todo → In Progress → Done. A issue #4 foi fechada automaticamente pelo `Closes #4` do Pull Request.

### Versionamento: branches, commits e Pull Request

- **`main`**: branch principal, sempre publicada.
- **`feature/pontos-de-apoio`**: branch criada a partir da issue #4 para desenvolver a alteração, com 6 commits pequenos (dados, regra, testes, interface, estilos e HTML).
- **Commits** com mensagens descritivas em português e referência à issue (`Refs #2`, `Refs #3`, `Refs #4`): [histórico da main](https://github.com/1tico1/rioalerta-citizentech/commits/main).
- **Pull Request [#5](https://github.com/1tico1/rioalerta-citizentech/pull/5)**: `feature/pontos-de-apoio` → `main`, com descrição do que mudou, passo a passo de validação, revisão registrada (checklist dos arquivos e do CI) e merge somente depois do CI aprovado.

### Segurança

Nenhuma senha, token ou chave está no repositório. O deploy usa o `GITHUB_TOKEN` gerado pelo próprio GitHub Actions a cada execução, com as permissões mínimas `pages: write` e `id-token: write` declaradas no workflow. Arquivos `.env` estão no `.gitignore`.

## Workflow do GitHub Actions

Arquivo: [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)

**Gatilhos**

- `push` na `main`: roda CI e CD (publica a aplicação)
- `pull_request` para a `main`: roda só o CI (valida a alteração antes do merge)
- `workflow_dispatch`: execução manual pela aba Actions

**Job 1 — CI: instalar, testar e gerar build**

1. Baixa o código (`actions/checkout`)
2. Configura o Node.js 22 com cache do npm
3. `npm ci`: instala as dependências travadas no `package-lock.json`
4. `npm run lint`: valida o HTML com `html-validate`
5. `npm test`: executa os 8 testes automatizados das regras de negócio
6. `npm run build`: gera a pasta `dist/` e grava no rodapé da página o commit (`GITHUB_SHA`) e a data do build
7. Envia `dist/` como artefato do GitHub Pages (somente fora de PR)

**Job 2 — CD: publicar no GitHub Pages** (depende do CI e só roda na `main`)

1. `actions/deploy-pages` publica o artefato no ambiente `github-pages`
2. Validação: baixa a página publicada e confere se ela mostra o commit que acabou de ser enviado. Se a versão no ar não for a nova, o job falha.

## Provedor de nuvem

**GitHub Pages**, serviço de hospedagem de sites estáticos do GitHub, servido por CDN. A publicação é feita só pelo GitHub Actions (fonte do Pages configurada como "GitHub Actions" em Settings → Pages), sem nenhum passo manual.

**URL:** https://1tico1.github.io/rioalerta-citizentech/

## Demonstração da atualização automática

| | Antes | Depois |
|---|---|---|
| Versão na página | v1.0.0 | v1.1.0 |
| Pontos de apoio | não existia | seção nova, filtrada pela zona |
| Commit no rodapé | `dd659e3` | `f80bf82` (merge do PR #5) |
| Execução do Actions | [#1](https://github.com/1tico1/rioalerta-citizentech/actions/runs/43316884290) | [#3](https://github.com/1tico1/rioalerta-citizentech/actions/runs/43320142216) |

Caminho da alteração: branch `feature/pontos-de-apoio` → PR #5 (CI aprovado) → merge na `main` → workflow executado de novo → deploy no GitHub Pages → validação automática do commit `f80bf82` → nova versão no ar.

## Evidências

Links diretos:

- Repositório: https://github.com/1tico1/rioalerta-citizentech
- Project: https://github.com/users/1tico1/projects/3
- Issues: https://github.com/1tico1/rioalerta-citizentech/issues?q=is%3Aissue
- Pull Request: https://github.com/1tico1/rioalerta-citizentech/pull/5
- Execuções do workflow: https://github.com/1tico1/rioalerta-citizentech/actions
- Aplicação publicada: https://1tico1.github.io/rioalerta-citizentech/

Capturas de tela em [`docs/evidencias/`](docs/evidencias):

| # | Evidência | Arquivo |
|---|-----------|---------|
| 1 | Project com a história e as tarefas em Todo | [01-project-board-todo.jpg](docs/evidencias/01-project-board-todo.jpg) |
| 2 | Lista de issues com responsável e labels | [02-issues-lista.jpg](docs/evidencias/02-issues-lista.jpg) |
| 3 | Repositório e estrutura na branch main | [03-repositorio-main.jpg](docs/evidencias/03-repositorio-main.jpg) |
| 4 | Histórico de commits da main | [04-commits-main.jpg](docs/evidencias/04-commits-main.jpg) |
| 5 | Primeira execução do workflow com sucesso | [05-actions-run1-sucesso.jpg](docs/evidencias/05-actions-run1-sucesso.jpg) |
| 6 | Etapas do job de CI | [06-ci-job-etapas.jpg](docs/evidencias/06-ci-job-etapas.jpg) |
| 7 | Testes automatizados aprovados no CI | [07-ci-testes-6-pass.jpg](docs/evidencias/07-ci-testes-6-pass.jpg) |
| 8 | Deploy e validação da versão v1.0.0 (commit dd659e3) | [08-cd-deploy-validacao-v1.jpg](docs/evidencias/08-cd-deploy-validacao-v1.jpg) |
| 9 | Aplicação publicada v1.0.0 | [09-app-v1-publicada.jpg](docs/evidencias/09-app-v1-publicada.jpg) |
| 10 | Rodapé com o commit dd659e3 | [10-app-v1-rodape-build.jpg](docs/evidencias/10-app-v1-rodape-build.jpg) |
| 11 | Commits na branch feature/pontos-de-apoio | [11-branch-feature-commits.jpg](docs/evidencias/11-branch-feature-commits.jpg) |
| 12 | Pull Request #5 aberto | [12-pr-aberto.jpg](docs/evidencias/12-pr-aberto.jpg) |
| 13 | CI aprovado no PR (deploy pulado no PR) | [13-pr-ci-checks-ok.jpg](docs/evidencias/13-pr-ci-checks-ok.jpg) |
| 14 | Arquivos alterados no PR | [14-pr-files-changed.jpg](docs/evidencias/14-pr-files-changed.jpg) |
| 15 | Revisão registrada e merge do PR | [15-pr-merge-review.jpg](docs/evidencias/15-pr-merge-review.jpg) |
| 16 | Histórico com as três execuções do workflow | [16-actions-3-execucoes.jpg](docs/evidencias/16-actions-3-execucoes.jpg) |
| 17 | Execução disparada pelo merge | [17-actions-run3-pos-merge.jpg](docs/evidencias/17-actions-run3-pos-merge.jpg) |
| 18 | Deploy e validação da versão v1.1.0 (commit f80bf82) | [18-cd-deploy-validacao-v1.1.jpg](docs/evidencias/18-cd-deploy-validacao-v1.1.jpg) |
| 19 | Aplicação atualizada com selo v1.1.0 | [19-app-v1.1-publicada.jpg](docs/evidencias/19-app-v1.1-publicada.jpg) |
| 20 | Nova seção de pontos de apoio e rodapé com f80bf82 | [20-app-v1.1-pontos-apoio-rodape.jpg](docs/evidencias/20-app-v1.1-pontos-apoio-rodape.jpg) |
| 21 | Filtro por zona aplicado também aos pontos de apoio | [21-app-v1.1-filtro-zona-leste.jpg](docs/evidencias/21-app-v1.1-filtro-zona-leste.jpg) |
| 22 | Project com todos os itens em Done | [22-project-board-done.jpg](docs/evidencias/22-project-board-done.jpg) |

## Uso de IA

Ferramentas de IA foram usadas como apoio na geração e revisão de código, nos textos e na configuração do workflow, como o enunciado permite. A equipe revisou o que foi produzido e consegue explicar a aplicação, o workflow e as decisões tomadas.
