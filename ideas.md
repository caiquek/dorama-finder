# Dorama Finder - Design Brainstorm

## Resposta 1: Minimalismo Moderno com Ênfase em Tipografia (Probabilidade: 0.08)

### Design Movement
Minimalismo Suíço com influências de design de interface contemporâneo

### Core Principles
- Espaço negativo generoso como elemento estrutural principal
- Tipografia como protagonista visual (não apenas funcional)
- Hierarquia clara através de escala e peso, não cor
- Austeridade elegante com toques estratégicos de laranja

### Color Philosophy
- **Fundo**: Branco puro (`#FFFFFF`) com áreas de gelo muito suave (`#F0F8FF`)
- **Laranja Primário**: `#FF8C42` (laranja quente, vibrante) - usado apenas em CTAs e destaques
- **Laranja Secundário**: `#FFB366` (laranja claro) - para hover states
- **Gelo**: `#E8F4F8` (azul-gelo muito suave) - backgrounds secundários
- **Texto**: `#1A1A1A` (quase preto) para máximo contraste
- **Intenção**: Confiança através da clareza; laranja como chamada à ação

### Layout Paradigm
- Grid assimétrico: busca ocupa 40% do topo esquerdo, resultado ocupa 60% direita
- Página de resultados com card único centralizado com muito espaço ao redor
- Tipografia grande e respirada (line-height 1.8+)
- Sem bordas visíveis; separação através de espaço e sombra suave

### Signature Elements
1. Linha horizontal fina de laranja separando seções
2. Tipografia grande e ousada para títulos (peso 700, size 3rem+)
3. Ícones minimalistas em laranja para ações

### Interaction Philosophy
- Transições suaves de 300ms em hover (sem efeitos dramáticos)
- Foco visível em inputs com borda laranja
- Feedback tátil através de mudança de escala (scale 1.02)

### Animation
- Fade-in suave ao carregar resultados (200ms)
- Slide suave de cima para baixo quando página muda
- Hover em botões: mudança de cor + sombra suave

### Typography System
- **Display**: Poppins 700 (títulos grandes, 2.5rem-3.5rem)
- **Heading**: Poppins 600 (subtítulos, 1.5rem-2rem)
- **Body**: Inter 400 (texto corpo, 1rem)
- **Small**: Inter 400 (labels, 0.875rem)

---

## Resposta 2: Glassmorphism Elegante com Gradientes Sutis (Probabilidade: 0.07)

### Design Movement
Glassmorphism contemporâneo com influências de design de aplicativos premium

### Core Principles
- Camadas translúcidas com backdrop blur criam profundidade
- Gradientes suaves de laranja para gelo como movimento visual
- Efeito de "vidro fosco" em cards e containers
- Minimalismo através da simplicidade, não da austeridade

### Color Philosophy
- **Fundo Base**: Gradiente suave de gelo para branco (`#F0F8FF` → `#FFFFFF`)
- **Laranja Gradiente**: De `#FF8C42` a `#FFB366` (movimento visual)
- **Gelo Gradiente**: De `#E8F4F8` a `#D4E8F0`
- **Glass Cards**: `rgba(255, 255, 255, 0.7)` com backdrop-filter
- **Texto**: `#2C3E50` (azul-escuro suave)
- **Intenção**: Sofisticação através de camadas e transparência

### Layout Paradigm
- Cards flutuantes com glassmorphism em página de resultados
- Busca em hero section com fundo gradiente
- Overlapping cards para criar senso de profundidade
- Espaçamento orgânico, não grid rígido

### Signature Elements
1. Cards com borda suave e backdrop blur
2. Gradientes suaves de laranja em backgrounds
3. Ícones com gradiente laranja-gelo

### Interaction Philosophy
- Hover: aumenta blur e muda gradiente
- Click: feedback com mudança de opacidade
- Transições fluidas de 400ms

### Animation
- Entrada com fade + scale (300ms)
- Hover com mudança de gradiente
- Shimmer effect suave em cards

### Typography System
- **Display**: Outfit 600 (títulos, 2.5rem-3rem)
- **Heading**: Outfit 500 (subtítulos, 1.5rem-1.75rem)
- **Body**: Figtree 400 (texto corpo, 1rem)
- **Small**: Figtree 400 (labels, 0.875rem)

---

## Resposta 3: Neomorfismo Suave com Profundidade Tátil (Probabilidade: 0.06)

### Design Movement
Neomorfismo (soft UI) com toques de design esculpido

### Core Principles
- Sombras suaves criam profundidade sem aparência "plana"
- Laranja e gelo usados em alternância para criar ritmo
- Superfícies levemente elevadas com sombras inset
- Toque "esculpido" em elementos interativos

### Color Philosophy
- **Fundo Base**: `#F5F7FA` (cinza muito claro com toque azul)
- **Laranja Primário**: `#FF7E3F` (laranja quente)
- **Laranja Claro**: `#FFE5D0` (laranja pastel para backgrounds)
- **Gelo**: `#D4E8F0` (azul-gelo mais pronunciado)
- **Sombras**: `rgba(0, 0, 0, 0.1)` e `rgba(255, 255, 255, 0.5)` para efeito 3D
- **Texto**: `#3D4A5C` (azul-cinza)
- **Intenção**: Conforto visual através de suavidade e profundidade tátil

### Layout Paradigm
- Elementos "elevados" com sombra suave
- Busca em card neomórfico no topo
- Resultados em cards com efeito de profundidade
- Espaçamento uniforme e previsível

### Signature Elements
1. Botões com efeito "pressed" em neomorfismo
2. Cards com sombra inset para inputs
3. Ícones em laranja com sombra suave

### Interaction Philosophy
- Click: transição para estado "pressed" (sombra invert)
- Hover: elevação suave
- Focus: borda laranja com sombra

### Animation
- Transição suave entre estados (250ms)
- Bounce suave ao carregar
- Entrada com scale + fade

### Typography System
- **Display**: Raleway 700 (títulos, 2.5rem-3rem)
- **Heading**: Raleway 600 (subtítulos, 1.5rem-1.75rem)
- **Body**: Lato 400 (texto corpo, 1rem)
- **Small**: Lato 400 (labels, 0.875rem)

---

## Decisão Final

**Abordagem Escolhida: Minimalismo Moderno com Ênfase em Tipografia**

Esta abordagem foi selecionada porque:
- Alinha-se perfeitamente com a natureza minimalista do projeto
- Tipografia forte cria hierarquia clara sem depender de cores
- Laranja é usado estrategicamente como elemento de ação, não distração
- Gelo funciona como elemento de suporte sutil
- Fácil de implementar e manter consistência
- Proporciona experiência limpa e focada para busca de doramas
