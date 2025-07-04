# 🟩 LetterGuess

**LetterGuess** é um jogo mobile inspirado no famoso Wordle, onde o jogador precisa adivinhar uma palavra de 5 letras em até 6 tentativas. O app foi desenvolvido com **React Native + TypeScript**, com animações e feedback visual para proporcionar uma experiência agradável e dinâmica ao usuário.

---

## 📱 Funcionalidades

- Escolha aleatória de uma palavra secreta por categoria.
- Grid interativo com feedback de acerto e posição das letras.
- Teclado customizado com realce de letras já utilizadas.
- Animações de vitória ou derrota usando **Lottie**.
- Exibição de tempo total gasto na partida.
- Rejogabilidade: botão para "Jogar Novamente".

---

## ⚙️ Tecnologias utilizadas

- **React Native**
- **TypeScript**
- **Lottie (react-native-lottie)**
- **React Native Safe Area Context**
- **Estilização com StyleSheet**
- Componentização com organização em `@components`, `@utils` e animações em `@assets`.

---

## 🧠 Lógica do Jogo

### 🎯 Palavra do Dia

- O jogo seleciona aleatoriamente uma palavra de um banco pré-definido (`DBWords`) com base em categorias (ex: frutas, objetos).
- A palavra é dividida em um array de letras (`letters`), que é usado como base para validação.

### 🔠 Grade (Grid)

- A grade (`rows`) é uma **matriz bidimensional de strings**, com 6 linhas (tentativas) e uma quantidade de colunas igual ao número de letras da palavra.
- Exemplo para palavra de 5 letras:
  ```ts
  rows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  ```

### 🎨 Cores da célula

- **Verde (`colors.primary`)**: letra correta e na posição correta.
- **Amarelo (`colors.secondary`)**: letra correta, mas na posição errada.
- **Cinza escuro (`colors.darkgray`)**: letra incorreta.
- As cores são calculadas com base na posição e presença da letra na palavra secreta.

### ⌨️ Teclado

- O componente `Keyboard` recebe as letras já utilizadas e pinta cada tecla com a cor correspondente (verde, amarelo, cinza).
- As teclas `ENTER` e `APAGAR` têm funcionalidades específicas:
  - `ENTER`: avança para a próxima linha se a tentativa estiver completa.
  - `APAGAR`: remove a última letra digitada.

---

## ⏱️ Medição de Tempo

- O tempo de permanência na tela é calculado usando `Date.now()` no início e no final da partida.
- O tempo é exibido ao final do jogo em segundos ou minutos + segundos, com formatação dinâmica.

---

## 🧪 Estados principais

- `gameState`: controla o estado geral do jogo (`playing`, `win`, `lose`).
- `rows`: matriz das tentativas.
- `letters`: array com as letras da palavra correta.
- `currentRow` / `currentColumn`: controlam a posição do cursor atual.
- `greenCaps`, `yellowCaps`, `grayCaps`: controlam as cores de cada letra do teclado com base nas tentativas anteriores.

---

## ▶️ Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/letterguess.git
   cd letterguess

   ```

2. **Instale as dependências:**

   ```bash
   npm install
      ou
   yarn install

   ```

3. **Rode o projeto com Expo (caso esteja usando):**

   ```bash
   npx expo start

   ```

4. **Ou rode direto com React Native CLI:**
   ```bash
   npx react-native run-android
            ou
   npx react-native run-ios
   ```

## 📁 Estrutura de Pastas

```bash
src/
├── components/
│ ├── GameFinished.tsx
│ └── Keyboard.tsx
├── utils/
│ ├── colors.ts
│ ├── keys.ts
│ └── words.ts
├── assets/
│ └── animations/
│ ├── happyAnimation.json
│ ├── sadAnimation.json
│ └── confettiAnimation.json
└── App.tsx
```

## 📜 Licença

Este projeto é de código aberto e está licenciado sob a [MIT License](LICENSE).

---

## 🙋‍♂️ Autor

Desenvolvido por **Ryan Will Daros**  
🧪 Desenvolvedor Web & Mobile  
🎮 Apaixonado por jogos, música e programação

[LinkedIn](https://linkedin.com/in/ryanwilldaros) · [GitHub](https://github.com/ryanwilldaros)
