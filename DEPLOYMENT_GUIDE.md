# 🚀 Guia Completo de Deploy - Dorama Finder

Este guia fornece instruções passo a passo para fazer deploy do Dorama Finder em um servidor. Você pode escolher entre várias plataformas populares ou usar um servidor tradicional.

## 📋 Índice

1. [Opção 1: Deploy no Manus (Recomendado)](#opção-1-deploy-no-manus-recomendado)
2. [Opção 2: Deploy no Vercel](#opção-2-deploy-no-vercel)
3. [Opção 3: Deploy no Netlify](#opção-3-deploy-no-netlify)
4. [Opção 4: Deploy em Servidor Próprio (VPS)](#opção-4-deploy-em-servidor-próprio-vps)
5. [Configuração do Webhook N8N em Produção](#configuração-do-webhook-n8n-em-produção)
6. [Troubleshooting](#troubleshooting)

---

## Opção 1: Deploy no Manus (Recomendado)

O Manus oferece hosting integrado com suporte a domínios personalizados e variáveis de ambiente.

### Passo 1: Criar um Checkpoint

Se você ainda não criou um checkpoint, faça isso agora:

1. No painel do Manus, clique em **"Save Checkpoint"**
2. Adicione uma descrição: "Versão pronta para produção"
3. Aguarde a conclusão do checkpoint

### Passo 2: Configurar Variáveis de Ambiente

1. Acesse **Settings → Secrets**
2. Atualize `VITE_N8N_WEBHOOK_URL` com a URL pública do seu webhook N8N:
   ```
   https://sua-url-publica.ngrok-free.dev/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed
   ```
3. Clique em "Save"

### Passo 3: Publicar o Site

1. No painel do Manus, localize o checkpoint mais recente
2. Clique no botão **"Publish"** (localizado no canto superior direito)
3. Aguarde a publicação (geralmente leva 2-3 minutos)
4. Seu site estará disponível em: `https://dorama-finder.manus.space`

### Passo 4: Configurar Domínio Personalizado (Opcional)

1. Vá para **Settings → Domains**
2. Clique em **"Add Custom Domain"**
3. Siga as instruções para apontar seu domínio para o Manus
4. Aguarde a propagação do DNS (até 48 horas)

**Vantagens:**
- Suporte integrado para HTTPS
- Domínios personalizados
- Variáveis de ambiente seguras
- Sem necessidade de gerenciar servidor

---

## Opção 2: Deploy no Vercel

Vercel é uma plataforma especializada em deploy de aplicações React.

### Passo 1: Preparar o Repositório Git

1. Inicialize um repositório Git (se ainda não fez):
   ```bash
   cd /home/ubuntu/dorama-finder
   git init
   git add .
   git commit -m "Dorama Finder - Versão inicial"
   ```

2. Crie um repositório no GitHub:
   - Acesse [github.com](https://github.com)
   - Clique em **"New"** para criar um novo repositório
   - Nomeie como `dorama-finder`
   - Não inicialize com README (você já tem um)

3. Conecte seu repositório local ao GitHub:
   ```bash
   git remote add origin https://github.com/seu-usuario/dorama-finder.git
   git branch -M main
   git push -u origin main
   ```

### Passo 2: Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** e crie uma conta (ou faça login)
3. Clique em **"New Project"**
4. Selecione **"Import Git Repository"**
5. Procure por `dorama-finder` e clique em **"Import"**

### Passo 3: Configurar Variáveis de Ambiente

1. Na página de configuração do projeto, vá para **"Environment Variables"**
2. Adicione as seguintes variáveis:
   - **Nome:** `VITE_N8N_WEBHOOK_URL`
   - **Valor:** `https://sua-url-publica.ngrok-free.dev/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed`
3. Clique em **"Add"**

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde a conclusão do build (geralmente 2-5 minutos)
3. Seu site estará disponível em: `https://dorama-finder.vercel.app`

### Passo 5: Configurar Domínio Personalizado (Opcional)

1. No painel do Vercel, vá para **"Settings → Domains"**
2. Clique em **"Add"**
3. Digite seu domínio personalizado
4. Siga as instruções para apontar seu domínio para o Vercel

**Vantagens:**
- Deploy automático ao fazer push no GitHub
- HTTPS automático
- Escalabilidade automática
- Suporte a domínios personalizados

**Desvantagens:**
- Requer repositório público (a menos que use plano pago)
- Limite de requisições em plano gratuito

---

## Opção 3: Deploy no Netlify

Netlify é outra plataforma popular para deploy de aplicações estáticas.

### Passo 1: Preparar o Repositório Git

Siga os mesmos passos da Opção 2 (Vercel) para preparar o repositório Git.

### Passo 2: Conectar ao Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Sign Up"** e crie uma conta (ou faça login)
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Selecione **"GitHub"**
5. Autorize o Netlify a acessar sua conta GitHub
6. Procure por `dorama-finder` e clique em **"Deploy site"**

### Passo 3: Configurar Build

1. Na página de configuração, defina:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`

### Passo 4: Configurar Variáveis de Ambiente

1. Vá para **"Site settings → Build & deploy → Environment"**
2. Clique em **"Edit variables"**
3. Adicione:
   - **Nome:** `VITE_N8N_WEBHOOK_URL`
   - **Valor:** `https://sua-url-publica.ngrok-free.dev/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed`
4. Clique em **"Save"**

### Passo 5: Redeploy

1. Vá para **"Deploys"**
2. Clique em **"Trigger deploy → Deploy site"**
3. Aguarde a conclusão (geralmente 2-5 minutos)
4. Seu site estará disponível em: `https://dorama-finder.netlify.app`

**Vantagens:**
- Interface intuitiva
- Deploy automático
- Suporte a formulários e funções serverless
- Plano gratuito generoso

---

## Opção 4: Deploy em Servidor Próprio (VPS)

Se você prefere ter controle total, pode fazer deploy em um VPS (Virtual Private Server).

### Pré-requisitos

- Um VPS com Ubuntu 20.04+ (recomendado: DigitalOcean, Linode, AWS EC2)
- Acesso SSH ao servidor
- Node.js 18+ instalado
- npm ou pnpm instalado

### Passo 1: Conectar ao Servidor

```bash
ssh root@seu-ip-do-servidor
```

### Passo 2: Instalar Dependências

```bash
# Atualizar pacotes
apt update && apt upgrade -y

# Instalar Node.js (se não tiver)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar Nginx (para servir o site)
apt install -y nginx

# Instalar Certbot (para HTTPS)
apt install -y certbot python3-certbot-nginx
```

### Passo 3: Clonar o Repositório

```bash
cd /var/www
git clone https://github.com/seu-usuario/dorama-finder.git
cd dorama-finder
```

### Passo 4: Instalar Dependências do Projeto

```bash
pnpm install
```

### Passo 5: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env
cat > .env << EOF
VITE_N8N_WEBHOOK_URL=https://sua-url-publica.ngrok-free.dev/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed
EOF
```

### Passo 6: Build do Projeto

```bash
pnpm build
```

### Passo 7: Configurar Nginx

```bash
# Criar arquivo de configuração do Nginx
cat > /etc/nginx/sites-available/dorama-finder << 'EOF'
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    root /var/www/dorama-finder/dist;
    index index.html;

    # Servir arquivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Redirecionar todas as rotas para index.html (para React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Bloquear acesso a arquivos sensíveis
    location ~ /\. {
        deny all;
    }
}
EOF

# Ativar o site
ln -s /etc/nginx/sites-available/dorama-finder /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx
```

### Passo 8: Configurar HTTPS com Let's Encrypt

```bash
certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

Siga as instruções na tela. Certbot configurará automaticamente o Nginx para HTTPS.

### Passo 9: Configurar Auto-Renovação de Certificado

```bash
systemctl enable certbot.timer
systemctl start certbot.timer
```

### Passo 10: Verificar se o Site Está Online

Abra seu navegador e acesse `https://seu-dominio.com`

**Vantagens:**
- Controle total sobre o servidor
- Sem limites de requisições
- Possibilidade de rodar processos em background
- Mais barato em longo prazo

**Desvantagens:**
- Requer conhecimento de administração de servidor
- Você é responsável por segurança e backups
- Mais trabalho de manutenção

---

## Configuração do Webhook N8N em Produção

### Problema: Webhook N8N com ngrok Expira

O ngrok gera uma nova URL a cada vez que você reinicia. Para produção, você tem duas opções:

### Opção A: Usar ngrok com Domínio Permanente (Pago)

1. Adquira uma conta ngrok Pro
2. Configure um domínio permanente no ngrok
3. Use esse domínio na variável `VITE_N8N_WEBHOOK_URL`

### Opção B: Expor N8N Publicamente (Recomendado)

1. Instale o N8N em um servidor (não localmente)
2. Configure um domínio personalizado para o N8N
3. Use esse domínio na variável `VITE_N8N_WEBHOOK_URL`

#### Passo a Passo para Instalar N8N em Servidor

```bash
# Conectar ao servidor
ssh root@seu-ip-do-servidor

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Criar diretório para N8N
mkdir -p /opt/n8n
cd /opt/n8n

# Criar arquivo docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=seu-usuario
      - N8N_BASIC_AUTH_PASSWORD=sua-senha-segura
      - N8N_HOST=seu-dominio.com
      - N8N_PROTOCOL=https
      - NODE_ENV=production
    volumes:
      - n8n_data:/home/node/.n8n
    restart: always

volumes:
  n8n_data:
EOF

# Iniciar N8N
docker-compose up -d

# Verificar se está rodando
docker-compose logs -f
```

3. Acesse `https://seu-dominio.com:5678` e configure seu workflow
4. Use a URL `https://seu-dominio.com/webhook-test/seu-webhook-id` na variável de ambiente

---

## Troubleshooting

### Problema: "Failed to fetch" ao buscar dorama

**Causa:** O webhook N8N não está acessível ou a URL está incorreta.

**Solução:**
1. Verifique se o N8N está rodando
2. Confirme a URL no arquivo `.env` ou variáveis de ambiente
3. Teste a URL com curl:
   ```bash
   curl -X POST https://sua-url-publica/webhook \
     -H "Content-Type: application/json" \
     -d '{"query": "Itaewon Class"}'
   ```

### Problema: "Resposta incompleta. Campos faltantes"

**Causa:** O N8N não está retornando todos os campos esperados.

**Solução:**
1. Verifique se o workflow N8N está correto
2. Confirme que retorna: `title`, `avalue`, `cast`, `genere`, `resume`
3. Abra o console do navegador (F12) para ver a resposta bruta

### Problema: Site não carrega no Vercel/Netlify

**Causa:** Variáveis de ambiente não foram configuradas corretamente.

**Solução:**
1. Verifique se `VITE_N8N_WEBHOOK_URL` está configurada
2. Redeploy o site após adicionar variáveis
3. Verifique os logs de build para erros

### Problema: CORS Error ao fazer requisição

**Causa:** O webhook N8N não permite requisições de origens diferentes.

**Solução:**
1. Configure CORS no N8N (se possível)
2. Ou use um proxy backend para fazer a requisição
3. Considere fazer upgrade para `web-db-user` no Manus para ter um backend

---

## Checklist de Deploy

Antes de fazer deploy em produção, verifique:

- [ ] Webhook N8N está funcionando e retorna dados corretos
- [ ] Variável `VITE_N8N_WEBHOOK_URL` está configurada
- [ ] Site foi testado localmente com múltiplos doramas
- [ ] Domínio personalizado foi configurado (se desejado)
- [ ] HTTPS está ativado
- [ ] Certificado SSL é válido
- [ ] Site carrega corretamente em mobile
- [ ] Console do navegador não mostra erros
- [ ] Webhook N8N está em um servidor permanente (não ngrok local)

---

## Próximas Etapas

Após fazer deploy, considere:

1. **Monitorar Performance:** Configure ferramentas como Google Analytics ou Vercel Analytics
2. **Backup:** Configure backups automáticos se estiver em VPS
3. **Segurança:** Considere adicionar rate limiting ao webhook N8N
4. **Escalabilidade:** Se receber muito tráfego, considere usar CDN (Cloudflare)

---

## Suporte

Se encontrar problemas durante o deploy:

1. Verifique os logs do servidor
2. Consulte a documentação da plataforma que está usando
3. Abra uma issue no repositório do GitHub
4. Contate o suporte da plataforma de hosting

---

**Última atualização:** Janeiro 2026
