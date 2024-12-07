'use strict'

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('.score-0');
const score1 = document.querySelector('.score-1');
const current0 = document.querySelector('.pontosatuais-0');
const current1 = document.querySelector('.pontosatuais-1');

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
}

btnDice.addEventListener ('click', function () {
    if (ativo) {
        // Seleciona número aleatório e mostra dado na tela
        document.querySelector('.dice').classList.remove('hidden');
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        imagemDado.src = `dice-${diceNumber}.png`;

        //Condição do dado
        if (diceNumber != 1) {
            current += diceNumber;
            document.querySelector(`.pontos-atuais${activePlayer}`).textContent = current;
        } else {
            switchPlayer();
        };
    }
});


btnSegura.addEventListener('click', function() {
    if (ativo) {
        scores[activePlayer] += current;
        document.querySelector(`.score-${activePlayer}`).textContent = scores[activePlayer];
    
        if (scores[activePlayer] >= 100) {
            console.log('salve');
            imagemDado.classList.add('hidden');
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            ativo = false;
        } else {
            switchPlayer();
        }
        
    }
});

btnNewGame.addEventListener('click', function () {
    console.log('estou aqui')
    activePlayer = 0;
    ativo = true;
    current = 0;
    scores[0] = 1;
    scores[1] = 1;

    document.querySelector('.pontos-atuais0').textContent = 0;
    document.querySelector('.pontos-atuais1').textContent = 0;
    document.querySelector('.score-0').textContent = 0;
    document.querySelector('.score-1').textContent = 0;

    document.querySelector('.player-0').classList.remove('player-active');
    document.querySelector('.player-0').classList.add('player-active');
    document.querySelector('.player-1').classList.remove('player-active');
    document.querySelector('.player-0').classList.remove('player-winner');
    document.querySelector('.player-1').classList.remove('player-winner');
    document.querySelector('.dice').classList.add('hidden');
    console.log('cheguei até o fim');
})


