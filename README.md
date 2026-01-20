# 🎬 Dorama Finder

Um site minimalista e elegante para buscar informações sobre seus doramas favoritos. Desenvolvido com **React 19**, **Tailwind CSS 4**, e integrado com **N8N** via webhook para busca inteligente de dados.

## ✨ Características

- **Design Minimalista Moderno**: Cores laranja e gelo com tipografia Poppins/Inter
- **Interface Limpa**: Foco total na experiência do usuário
- **Integração N8N**: Busca inteligente usando AI Agent (Google Gemini)
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Rápido**: Construído com Vite para máxima performance
- **Sem Dados Mockados**: Todos os dados vêm do webhook N8N

## 🎨 Design

### Paleta de Cores

- **Laranja Primário**: `#FF8C42` - Elementos de ação e destaques
- **Gelo**: `#E8F4F8` - Backgrounds secundários e suporte
- **Fundo**: Branco puro com áreas de gelo suave
- **Texto**: Quase preto para máximo contraste

### Tipografia

- **Títulos**: Poppins 700 (3rem-3.5rem)
- **Subtítulos**: Poppins 600 (1.5rem-2rem)
- **Corpo**: Inter 400 (1rem)
- **Labels**: Inter 400 (0.875rem)

## 🚀 Como Começar

### Pré-requisitos

- Uma instância N8N com webhook configurado
- ngrok ou similar para expor N8N publicamente (se rodando localmente)

### Acesso Rápido

O site está pronto para usar! Acesse diretamente no navegador.

## ⚙️ Configuração do Webhook N8N

### Passo 1: Expor o N8N Publicamente

Se o N8N está rodando localmente, exponha-o usando ngrok:

```bash
ngrok http 5678
```

Você receberá uma URL como: `https://abc123.ngrok.io`

### Passo 2: Configurar a Variável de Ambiente

No painel Manus:

1. Vá para **Settings → Secrets**
2. Altere `VITE_N8N_WEBHOOK_URL` para: `https://sua-url-publica/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed`

### Passo 3: Testar a Integração

1. Acesse o site
2. Digite um nome de dorama (ex: "Itaewon Class")
3. Clique em "Buscar"
4. Os dados do N8N devem aparecer

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── config.ts              # Configuração do webhook N8N
│   ├── pages/
│   │   ├── Home.tsx           # Página de busca
│   │   └── DoramaResult.tsx    # Página de resultados
│   ├── App.tsx                # Componente raiz
│   └── index.css              # Estilos globais
├── public/
│   └── images/                # Imagens decorativas
└── index.html                 # HTML principal
```

## 🔄 Fluxo de Dados

```
Usuário digita nome
    ↓
Frontend envia POST ao webhook N8N
    ↓
N8N processa com AI Agent (Google Gemini)
    ↓
N8N retorna dados estruturados
    ↓
Frontend exibe página de resultados
```

## 📝 Resposta Esperada do N8N

```json
{
  "title": "Itaewon Class",
  "avalue": "2020",
  "cast": "Park Seo-joon, Yoo Jae-myung, Kim Da-mi",
  "genere": "Drama, Ação, Vingança",
  "resume": "Um homem é liberado da prisão após cumprir sua sentença..."
}
```

## 🛠️ Desenvolvimento

### Adicionar Novas Funcionalidades

1. **Componentes**: Adicione em `client/src/components/`
2. **Páginas**: Adicione em `client/src/pages/`
3. **Estilos**: Edite `client/src/index.css` para manter consistência

### Personalizar Cores

Edite as variáveis CSS em `client/src/index.css`:

```css
:root {
  --primary: oklch(0.6 0.2 30);        /* Laranja */
  --background: oklch(1 0 0);          /* Branco */
  --secondary: oklch(0.94 0.01 200);   /* Gelo */
}
```

## 📚 Documentação Adicional

- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Guia completo de integração com N8N
- [N8N_SETUP.md](./N8N_SETUP.md) - Configuração do workflow N8N
- [Documentação N8N](https://docs.n8n.io/)

## 🐛 Troubleshooting

### "Failed to fetch"

1. Verifique se N8N está rodando em `http://localhost:5678`
2. Verifique se você usou ngrok para expor publicamente
3. Confirme a URL nos Secrets do Manus
4. Teste com curl:
   ```bash
   curl -X POST https://sua-url-publica/webhook \
     -H "Content-Type: application/json" \
     -d '{"query": "Itaewon Class"}'
   ```

### "Resposta incompleta. Campos faltantes"

1. O N8N não está retornando todos os campos obrigatórios
2. Verifique se o workflow retorna: `title`, `avalue`, `cast`, `genere`, `resume`
3. Abra o console do navegador (F12) para ver a resposta bruta

### "Nenhum resultado encontrado"

1. Verifique se o nome do dorama está correto
2. Verifique se o N8N está retornando dados
3. Consulte os logs do N8N para mais detalhes

## 📱 Responsividade

O site é totalmente responsivo:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

## ⚡ Performance

- Vite para build rápido
- React 19 com otimizações
- Tailwind CSS 4 com purging automático
- Imagens otimizadas

## 🎯 Próximas Melhorias

- [ ] Histórico de buscas com localStorage
- [ ] Sistema de favoritos
- [ ] Filtros por gênero
- [ ] Imagens de pôsteres
- [ ] Avaliações e comentários

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React e Tailwind CSS

---

**Pronto para começar?** 

1. **Configure o webhook**: Siga o [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
2. **Teste a integração**: Digite um nome de dorama e clique em "Buscar"

Descubra seus doramas favoritos com estilo! 🎬
