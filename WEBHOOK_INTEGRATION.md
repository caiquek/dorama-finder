# Guia de Integração - Webhook N8N

## Problema Identificado

A URL do webhook que você forneceu usa `localhost:5678`, que não é acessível do navegador quando o site está rodando em um servidor remoto. Existem duas soluções:

## Solução 1: Expor o N8N Publicamente (Recomendado)

### Passo 1: Configurar N8N com URL Pública

Se você está rodando N8N localmente, você precisa expô-lo publicamente usando um serviço como:

- **ngrok**: `ngrok http 5678`
- **Cloudflare Tunnel**: `cloudflared tunnel --url http://localhost:5678`
- **Manus Expose**: Se estiver usando Manus, pode usar o expose tool

Isso gerará uma URL pública como: `https://abc123.ngrok.io`

### Passo 2: Atualizar a URL no Site

1. Acesse o painel de gerenciamento do Manus
2. Vá para **Settings → Secrets**
3. Clique em **Add Secret** e configure:
   - **Nome**: `VITE_N8N_WEBHOOK_URL`
   - **Valor**: `https://seu-url-publica.ngrok.io/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed`

4. Salve e o site recarregará automaticamente

### Passo 3: Testar a Integração

1. Acesse o site Dorama Finder
2. Digite um nome de dorama (ex: "Itaewon Class")
3. Clique em "Buscar"
4. Os dados devem aparecer na página de resultados

## Solução 2: Usar Backend Proxy (Alternativa)

Se você quiser manter o N8N local sem expor publicamente, pode:

1. Fazer upgrade do projeto para **web-db-user** (que inclui backend)
2. Criar uma rota backend que faz proxy para o N8N local
3. O frontend chamaria a rota backend em vez do N8N diretamente

**Exemplo de rota backend (Express):**

```typescript
app.post('/api/dorama-search', async (req, res) => {
  const { query } = req.body;
  
  try {
    const response = await fetch('http://localhost:5678/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Estrutura de Resposta Esperada

O N8N deve retornar um JSON com a seguinte estrutura:

```json
{
  "title": "Itaewon Class",
  "avalue": "2020",
  "cast": "Park Seo-joon, Yoo Jae-myung, Kim Da-mi",
  "genere": "Drama, Ação, Vingança",
  "resume": "Um homem é liberado da prisão após cumprir sua sentença..."
}
```

## Testando o Webhook Localmente

Você pode testar o webhook usando curl:

```bash
curl -X POST http://localhost:5678/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed \
  -H "Content-Type: application/json" \
  -d '{"query": "Itaewon Class"}'
```

## Troubleshooting

### Erro: "Resposta do N8N incompleta"

- Verifique se o N8N está retornando todos os campos: `title`, `avalue`, `cast`, `genere`, `resume`
- Verifique o console do navegador (F12) para ver a resposta exata

### Erro: CORS

- Se o N8N está em um domínio diferente, configure CORS no N8N
- Ou use a Solução 2 (Backend Proxy)

### Erro: "Requisição expirou"

- Aumente o timeout em `client/src/config.ts` (atualmente 30 segundos)
- Verifique se o N8N está respondendo lentamente

## Configuração Atual

O site está configurado para usar:

```
URL: http://localhost:5678/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed
Timeout: 30 segundos
Campo de entrada: "query"
```

Se você precisar mudar a URL, edite `client/src/config.ts` ou use a variável de ambiente `VITE_N8N_WEBHOOK_URL`.

## Próximos Passos

1. **Expor o N8N publicamente** usando ngrok ou similar
2. **Configurar a variável de ambiente** `VITE_N8N_WEBHOOK_URL` no Manus
3. **Testar a integração** digitando um nome de dorama
4. **Monitorar logs** do N8N para diagnosticar problemas

Para mais informações sobre N8N, consulte: https://docs.n8n.io/
