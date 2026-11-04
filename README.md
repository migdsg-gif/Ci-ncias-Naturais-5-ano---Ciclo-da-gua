# O Ciclo da Água - Ciências Naturais 5.º Ano 🌍💧

Plataforma educativa interativa concebida de acordo com as **Aprendizagens Essenciais** do Ministério da Educação (Portugal) para alunos de **5.º ano** da disciplina de **Ciências Naturais** (idades entre os 10 e os 12 anos).

Desenvolvida para um bloco letivo padrão de **45 minutos**, integrando conteúdos curriculares, jogos didáticos digitais e dinâmicas presenciais sem recurso a tecnologia.

---

## 🌟 Principais Funcionalidades

1. **Gestor de Aula de 45 Minutos**:
   - Cronómetro curricular com fases letivas (0-15m Conteúdos, 15-30m Jogos, 30-40m Atividade Prática, 40-45m Avaliação).
   - Alertas sonoros suaves nas transições.
   - Emissão de **Diploma de Guardião do Ciclo da Água** em formato imprimível e personalizado com o nome e a turma do aluno.

2. **Aprendizagem de Conteúdos**:
   - **Simulador Interativo do Ciclo Hidrológico**: Diagrama com 6 etapas clicáveis (*Evaporação*, *Transpiração*, *Condensação*, *Precipitação*, *Infiltração* e *Escoamento*), controlos de radiação solar e tipos de precipitação (chuva, neve, granizo).
   - **Mudanças de Estado Físico**: Estados sólido, líquido e gasoso com quadro de transferências de calor (aquecimento vs arrefecimento).
   - **Distribuição da Água na Terra**: Proporções de água doce vs água salgada e mensagem de cidadania ambiental para a proteção dos aquíferos.
   - **Glossário Científico**: Definições essenciais para fichas e testes.

3. **4 Jogos Didáticos Digitais**:
   - **Exercícios de Correspondência**: Ligar etapas às respetivas definições científicas.
   - **Verdadeiro ou Falso**: Desmistificação de mitos frequentes com justificação científica.
   - **Escolha Múltipla**: Quiz formativo com 6 questões com explicações pedagógicas imediatas.
   - **Jogo de Virar Cartas (Memória)**: 16 cartas com animação 3D com pares de conceitos e termos.

4. **Atividades Sem Recurso a Tecnologias (Sala de Aula)**:
   - Dinâmica *"A Gota Viajante"* (jogo de tabuleiro vivo com estações e dados de papel).
   - Experiência sensorial *"A Nuvem no Frasco"*.
   - Jogo cinestésico *"A Dança das Moléculas de H2O"*.
   - **Ficha de Trabalho em Papel Imprimível** pronta para impressão rápida (`Ctrl + P`).

---

## 🚀 Como Publicar no GitHub e Ativar o GitHub Pages

### 1. Criar o Repositório no GitHub
1. Acede a [github.com/new](https://github.com/new).
2. Dá um nome ao repositório (ex.: `ciclo-da-agua-5ano`).
3. Mantém como **Public** (Público) e clica em **Create repository**.

### 2. Enviar o Código (Terminal Local)
No teu computador, dentro da pasta do projeto, executa:

```bash
git init
git add .
git commit -m "feat: projeto inicial do ciclo da agua 5 ano"
git branch -M main
git remote add origin https://github.com/O_TEU_UTILIZADOR/ciclo-da-agua-5ano.git
git push -u origin main
```

### 3. Ativar o GitHub Pages (Automático)
O projeto já inclui o ficheiro de automação `.github/workflows/deploy.yml`! Para ativar:
1. No teu repositório no GitHub, vai a **Settings** (Definições) > **Pages** (no menu lateral).
2. Na secção **Build and deployment** > **Source**, seleciona **GitHub Actions**.
3. O GitHub vai executar o workflow automaticamente e o teu website ficará online em:
   `https://O_TEU_UTILIZADOR.github.io/ciclo-da-agua-5ano/`

---

## 💻 Desenvolvimento Local

Para correr este projeto no teu computador:

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Compilar para produção (cria a pasta dist)
npm run build
```

---

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript**
- **Vite 8** (Configurado com `base: './'` para compatibilidade universal)
- **Tailwind CSS v4**
- **Lucide React** (Ícones pedagógicos)
- **Canvas Confetti** (Celebrações de conclusão)
- **Web Audio API** (Sons sintetizados localmente sem dependências de áudio externas)

---

## 📄 Licença
Código aberto sob a licença Apache-2.0. Desenvolvido para fins pedagógicos.
