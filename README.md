# Clínica Pequeno Passo

Landing page institucional da Clínica Pequeno Passo, clínica infantil fictícia em Paulo Afonso, Bahia. Projeto demo de portfólio da Baius Tecnologia; nome, contatos e conteúdo são ilustrativos.

## Desenvolvimento local

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## O que a página entrega

- Apresentação da clínica e das especialidades infantis.
- Conteúdo educativo para famílias.
- FAQ acessível com abertura e fechamento por teclado.
- Formulário curto de agendamento com validação e encaminhamento para WhatsApp.
- Localização, horário, mapa e Instagram.

## Qualidade

```bash
npm run lint
npm test
npm run build
```

## Deploy no Coolify

O projeto usa Next.js com `output: "standalone"` e Dockerfile pronto para o Coolify.
Conecte o repositório pelo GitHub App do Coolify, selecione a raiz do projeto e o build pack Dockerfile. A aplicação de produção escuta na porta `8080`.

O deploy será atualizado automaticamente conforme a política de webhook configurada no Coolify. Defina `NEXT_PUBLIC_SITE_URL` nas variáveis do recurso antes do primeiro deploy.

O formulário encaminha para o WhatsApp de demonstração da Baius Tecnologia. Não há banco de dados nem tracker de terceiros.
