'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('.score-0 p'); // Corrigido para selecionar o <p> interno
const score1 = document.querySelector('.score-1 p'); // Corrigido para selecionar o <p> interno
const current0 = document.querySelector('.pontos-atuais0'); // Nome correto da classe
const current1 = document.querySelector('.pontos-atuais1'); // Nome correto da classe

const imagemDado = document.querySelector('.imagem-dado');
const btnNewGame = document.querySelector('.btn-NewGame');
const btnDice = document.querySelector('.btn-dice');
const btnSegura = document.querySelector('.btn-segura');

let scores = [0, 0];
let current = 0;
let activePlayer = 0;
let ativo = true;

const switchPlayer = function () {
    current = 0;
    document.querySelector(`.pontos-atuais${activePlayer}`).textContent = current;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
};

btnDice.addEventListener('click', function () {
    if (ativo) {
        // Seleciona número aleatório e mostra dado na tela
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        imagemDado.src = `dice-${diceNumber}.png`;
        document.querySelector('.dice').classList.remove('hidden');

        // Condição do dado
        if (diceNumber !== 1) {
            current += diceNumber;
            document.querySelector(`.pontos-atuais${activePlayer}`).textContent = current;
        } else {
            switchPlayer();
        }
    }
});

btnSegura.addEventListener('click', function () {
    if (ativo) {
        scores[activePlayer] += current;
        document.querySelector(`.score-${activePlayer} p`).textContent = scores[activePlayer]; // Atualiza <p> interno

        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            ativo = false;
            imagemDado.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNewGame.addEventListener('click', function () {
    console.log('Novo jogo iniciado');
    activePlayer = 0;
    ativo = true;
    current = 0;
    scores = [0, 0];

    // Resetar pontuações e textos
    current0.textContent = 0;
    current1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;

    // Resetar estilos dos jogadores
    player0.classList.add('player-active');
    player1.classList.remove('player-active');
    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');

    // Esconder o dado
    imagemDado.classList.add('hidden');
});



