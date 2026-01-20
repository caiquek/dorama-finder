# Configuração do Webhook N8N - Dorama Finder

## Visão Geral

O Dorama Finder é um site minimalista que busca informações sobre doramas através de um webhook N8N. Este documento explica como configurar a integração.

## Arquitetura

```
┌─────────────────────┐
│   Dorama Finder     │
│   (Frontend React)  │
└──────────┬──────────┘
           │ POST
           │ JSON: { doramaName: "..." }
           ▼
┌─────────────────────┐
│   N8N Webhook       │
│   (Seu servidor)    │
└──────────┬──────────┘
           │ Busca dados
           │ do dorama
           ▼
┌─────────────────────┐
│   Resposta JSON     │
│ - title             │
│ - avalue            │
│ - cast              │
│ - genere            │
│ - resume            │
└─────────────────────┘
```

## Configuração do Webhook N8N

### 1. Criar um Novo Workflow no N8N

1. Acesse sua instância N8N
2. Clique em "New Workflow"
3. Adicione um nó **Webhook** como trigger
4. Configure o webhook:
   - **Method**: POST
   - **Path**: `/webhook/dorama-search` (ou outro caminho de sua preferência)
   - **Authentication**: Nenhuma (ou adicione se necessário)

### 2. Processar a Requisição

O webhook receberá um JSON como este:

```json
{
  "doramaName": "Itaewon Class"
}
```

### 3. Buscar Dados do Dorama

Adicione nós ao seu workflow para:
- Buscar informações do dorama (API externa, banco de dados, etc.)
- Extrair os dados necessários
- Formatar a resposta

### 4. Retornar a Resposta

O webhook deve retornar um JSON com a seguinte estrutura:

```json
{
  "title": "Itaewon Class",
  "avalue": "2020",
  "cast": "Park Seo-joon, Yoo Jae-myung, Kim Da-mi",
  "genere": "Drama, Ação, Vingança",
  "resume": "Um homem é liberado da prisão após cumprir sua sentença e busca vingança contra aqueles que o prejudicaram..."
}
```

**Campos obrigatórios:**
- `title`: Título do dorama
- `avalue`: Ano de lançamento ou valor
- `cast`: Elenco principal
- `genere`: Gênero(s) do dorama
- `resume`: Sinopse ou resumo

### 5. Tratamento de Erros

Se o dorama não for encontrado, retorne um status HTTP 404 ou 400 com uma mensagem de erro:

```json
{
  "error": "Dorama não encontrado"
}
```

## Configurar a URL do Webhook no Frontend

### Opção 1: Variável de Ambiente (Recomendado)

1. Acesse o painel de configurações do Manus
2. Vá para **Settings → Secrets**
3. Adicione uma nova variável:
   - **Nome**: `VITE_N8N_WEBHOOK_URL`
   - **Valor**: `https://seu-n8n-instance.com/webhook/dorama-search`

O frontend carregará automaticamente essa variável.

### Opção 2: Editar o Arquivo de Configuração

Se você tiver acesso ao código, edite `client/src/config.ts`:

```typescript
export const N8N_CONFIG = {
  webhookUrl: 'https://seu-n8n-instance.com/webhook/dorama-search',
  timeout: 30000,
};
```

## Testando a Integração

### 1. Teste Manual do Webhook

Use curl ou Postman para testar:

```bash
curl -X POST https://seu-n8n-instance.com/webhook/dorama-search \
  -H "Content-Type: application/json" \
  -d '{"doramaName": "Itaewon Class"}'
```

### 2. Teste no Frontend

1. Acesse o site Dorama Finder
2. Digite o nome de um dorama na caixa de busca
3. Clique em "Buscar"
4. Verifique se os dados aparecem corretamente

## Segurança

### Recomendações

1. **Autenticação**: Se necessário, adicione autenticação ao webhook (API Key, Bearer Token)
2. **Rate Limiting**: Configure limite de requisições para evitar abuso
3. **CORS**: Configure CORS adequadamente se o N8N estiver em um domínio diferente
4. **Validação**: Valide os dados de entrada no N8N antes de processar

### Exemplo com API Key

Se você adicionar autenticação, edite `client/src/config.ts`:

```typescript
export async function searchDorama(doramaName: string): Promise<DoramaResult> {
  const response = await fetch(N8N_CONFIG.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_N8N_API_KEY}`,
    },
    body: JSON.stringify({
      doramaName: doramaName.trim(),
    }),
  });
  // ... resto do código
}
```

## Troubleshooting

### Erro: "Requisição expirou"

- Aumente o timeout em `client/src/config.ts`
- Verifique se o webhook N8N está respondendo corretamente

### Erro: "Resposta do N8N incompleta"

- Certifique-se de que todos os campos obrigatórios estão presentes na resposta
- Verifique a estrutura do JSON retornado

### Erro: CORS

- Configure CORS no N8N ou use um proxy
- Se usar Manus com web-db-user, você pode criar um backend route como proxy

## Estrutura de Arquivos Relevantes

```
client/
├── src/
│   ├── config.ts              # Configuração do webhook e função de busca
│   ├── pages/
│   │   ├── Home.tsx           # Página de busca
│   │   └── DoramaResult.tsx    # Página de resultados
│   └── App.tsx                # Componente raiz
└── public/
    └── images/                # Imagens decorativas
```

## Próximos Passos

1. Configure seu workflow no N8N
2. Teste o webhook com curl ou Postman
3. Configure a URL do webhook no Manus (Settings → Secrets)
4. Teste o site digitando um nome de dorama

## Suporte

Para dúvidas sobre a integração, consulte:
- [Documentação N8N](https://docs.n8n.io/)
- [Documentação Manus](https://help.manus.im)
