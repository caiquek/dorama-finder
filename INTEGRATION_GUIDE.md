# Guia de Integração - Dorama Finder com N8N

## 📋 Visão Geral

O Dorama Finder é um site minimalista que busca informações sobre doramas através de um webhook N8N. O site envia uma requisição POST com o nome do dorama e recebe dados estruturados contendo:

- **title**: Nome do dorama
- **avalue**: Ano de lançamento
- **cast**: Elenco principal
- **genere**: Gêneros
- **resume**: Sinopse/Resumo

## 🚀 Configuração Rápida

### Passo 1: Expor o N8N Publicamente

Como o N8N está rodando localmente (`http://localhost:5678`), você precisa expô-lo publicamente para que o site possa acessá-lo. Use uma das opções abaixo:

#### Opção A: Usar ngrok (Recomendado)

```bash
# Instalar ngrok (se não tiver)
# https://ngrok.com/download

# Expor N8N na porta 5678
ngrok http 5678
```

Você verá uma saída como:
```
Forwarding                    https://abc123def456.ngrok.io -> http://localhost:5678
```

Copie a URL `https://abc123def456.ngrok.io`

#### Opção B: Usar Cloudflare Tunnel

```bash
# Instalar cloudflared (se não tiver)
# https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

# Criar um túnel
cloudflared tunnel run
```

#### Opção C: Usar Localtunnel

```bash
# Instalar localtunnel
npm install -g localtunnel

# Expor N8N
lt --port 5678
```

### Passo 2: Configurar a URL no Manus

1. Acesse o painel do Manus → **Settings** → **Secrets**
2. Procure por `VITE_N8N_WEBHOOK_URL`
3. Adicione a URL completa do webhook N8N:
   ```
   https://abc123def456.ngrok.io/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed
   ```

### Passo 3: Testar a Integração

1. Acesse o site Dorama Finder
2. Digite o nome de um dorama na caixa de busca
3. Clique em "Buscar"
4. Verifique se os dados aparecem corretamente na página de resultados

## 🔧 Estrutura da Requisição

O site envia uma requisição POST para o webhook N8N com a seguinte estrutura:

```json
{
  "query": "Itaewon Class"
}
```

## 📥 Estrutura da Resposta Esperada

O N8N deve retornar uma resposta com os seguintes campos:

```json
{
  "title": "Itaewon Class",
  "avalue": "2020",
  "cast": "Park Seo-joon, Yoo Jae-myung, Kim Da-mi",
  "genere": "Drama, Ação, Vingança",
  "resume": "Um homem é liberado da prisão após cumprir sua sentença de 10 anos..."
}
```

### Formatos Alternativos Suportados

O site é inteligente e suporta diferentes formatos de resposta do N8N:

#### Formato 1: Array de Objetos
```json
[
  {
    "title": "Itaewon Class",
    ...
  }
]
```

#### Formato 2: Resposta Aninhada com "subject"
```json
{
  "subject": {
    "title": "Itaewon Class",
    ...
  }
}
```

#### Formato 3: Resposta Aninhada com "body"
```json
{
  "body": {
    "title": "Itaewon Class",
    ...
  }
}
```

#### Formato 4: Resposta Aninhada com "data"
```json
{
  "data": {
    "title": "Itaewon Class",
    ...
  }
}
```

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"

**Causa**: O webhook N8N não está acessível ou não está exposto publicamente.

**Solução**:
1. Verifique se o N8N está rodando em `http://localhost:5678`
2. Verifique se você usou ngrok/cloudflare/localtunnel para expor o N8N
3. Confirme que a URL está correta no painel de Secrets

### Erro: "Resposta incompleta. Campos faltantes"

**Causa**: O N8N está retornando uma resposta sem um ou mais campos obrigatórios.

**Solução**:
1. Verifique o console do navegador (F12 → Console) para ver a resposta bruta
2. Confirme que o workflow N8N está retornando todos os campos: `title`, `avalue`, `cast`, `genere`, `resume`
3. Se os campos têm nomes diferentes, atualize o workflow N8N para usar os nomes corretos

### Erro: "Dorama não encontrado"

**Causa**: O N8N não encontrou o dorama solicitado ou retornou um erro.

**Solução**:
1. Verifique se o nome do dorama está correto
2. Verifique o console do navegador para ver a resposta do N8N
3. Teste o webhook N8N diretamente usando curl:
   ```bash
   curl -X POST https://abc123def456.ngrok.io/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed \
     -H "Content-Type: application/json" \
     -d '{"query": "Itaewon Class"}'
   ```

## 📊 Logs e Debugging

### Ver Logs no Console do Navegador

1. Abra o site Dorama Finder
2. Pressione `F12` para abrir o Developer Tools
3. Vá para a aba "Console"
4. Digite um nome de dorama e clique em "Buscar"
5. Você verá logs detalhados da requisição e resposta:
   - 📡 URL do webhook
   - 📦 Payload enviado
   - 📊 Status da resposta
   - 📥 Resposta bruta do N8N
   - 🔍 Dados após processamento

### Exemplo de Saída de Log

```
📡 Enviando requisição POST para: https://abc123def456.ngrok.io/webhook-test/...
📦 Payload: {query: "Itaewon Class"}
📊 Status da resposta: 200
📋 Headers da resposta: {content-type: "application/json", ...}
📥 Resposta bruta do N8N: {title: "Itaewon Class", ...}
✅ Resposta válida recebida
```

## 🔒 Segurança

- O site envia requisições HTTPS quando o webhook é exposto publicamente
- Nenhum dado sensível é armazenado no navegador
- As requisições são feitas diretamente do navegador para o webhook N8N

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🎨 Customização

### Alterar Cores

Edite o arquivo `client/src/index.css` e procure pela seção de cores:

```css
:root {
  --primary: oklch(...);  /* Laranja */
  --background: oklch(...);  /* Branco */
  /* ... outras cores ... */
}
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique o console do navegador (F12 → Console)
2. Consulte a seção "Solução de Problemas" acima
3. Verifique se o workflow N8N está configurado corretamente
4. Teste o webhook N8N diretamente usando curl

## 🎯 Próximos Passos

- Adicionar histórico de buscas com localStorage
- Implementar favoritos
- Adicionar filtros por gênero
- Melhorar a página de resultados com imagens de pôsteres
