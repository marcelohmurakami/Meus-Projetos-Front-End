'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


// Variáveis
const welcome = document.querySelector('.wel-phr');
const loginUser = document.querySelector('.inp-log.user');
const pinUser = document.querySelector('.inp-log.pin');
const btnLogin = document.querySelector('.btn-log');

const dateBal = document.querySelector('.date-bal');
const balance = document.querySelector('.main-bal');

const deposits = document.querySelector('.deposits');
const positive = document.querySelector('.valor.dep');
const negative = document.querySelector('.valor.with');
const juros = document.querySelector('.valor.interest');
const main = document.querySelector('.main');

const transferAcc = document.querySelector('.transferInf.acc');
const transferVal = document.querySelector('.transferInf.val');
const btnTransfer = document.querySelector('.btn-fun.transfer');

const loanVal = document.querySelector('.transferInf.loan');
const btnLoan = document.querySelector('.btn-fun.loan');

const closeAcc = document.querySelector('.transferInf.close');
const closePin = document.querySelector('.transferInf.pin');
const btnClose = document.querySelector('.btn-fun.close');

const logout = document.querySelector('.logout');

let currentAccount;

// Função para formatar os valores
const formatVal = function (value, local, currency) {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency
  }).format(value);
}


// Função para formatar data e horário
const formatDate = function (date, local, options) {
  return new Intl.DateTimeFormat(local, options).format(date);
}


// Adicionando as iniciais para os objetos das contas
accounts.forEach((acc) => {
    acc.user = acc.owner.split(' ').map((word) => {
        return word.slice(0, 1);
    }).join('').toLowerCase();
});
console.log(accounts);


// Função para LOGIN do usuário
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    const user = accounts.find((acc) => {
      return acc.user === loginUser.value;
    });

    if (user && user.pin === Number(pinUser.value)) {
    currentAccount = user;
    main.style.opacity = 100;
    welcome.textContent = `Good afternoon, ${currentAccount.owner}`;
    loginUser.value = pinUser.value = ''; // Limpa os campos de entrada
    loginUser.blur();
    pinUser.blur();
    displayUI(currentAccount);
    dateBal.textContent = formatDate(new Date(), 'pt-BR', {
      year: 'numeric',  // Formato completo do ano (ex.: 2025)
      month: 'numeric', // Mês em formato numérico (1-12)
      day: 'numeric',   // Dia do mês
      hour: 'numeric',
      minute: 'numeric'
    });
    }
});

// Função para chamar funções das movimentações
const displayUI = function (currentAccount) {
  showMovs(currentAccount);
  sumary(currentAccount);
  timer();
}

//Função para mostrar as movimentações da conta
const showMovs = function (currentAccount) {
  // Limpar o contêiner antes de adicionar as novas movimentações
  deposits.innerHTML = '';

  // Adicionar cada movimentação ao contêiner
  currentAccount.movements.forEach((acc, i) => {
    const insert = `
      <div class="deposit">
        <div class="dep-date">
          <p class="trans wit">${i + 1}. ${acc >= 0 ? 'DEPOSIT' : 'WITHDRAWAL'}</p>
          <p class="date">${formatDate(new Date(), 'pt-BR', {
            year: 'numeric',  // Formato completo do ano (ex.: 2025)
            month: 'numeric', // Mês em formato numérico (1-12)
            day: 'numeric',
          })}</p>
        </div>
        <p class="value">${formatVal(acc, 'pt-BR', 'BRL')}</p>
      </div>
    `;
    deposits.insertAdjacentHTML('afterbegin', insert);
  });
};


// Função para mostrar o sumário
const sumary = function (currentAccount) {
  let deposits = 0;
  let withdrawals = 0;
  let interest = 0;
  let balanceTotal = 0;

  currentAccount.movements.forEach((movement) => {
    movement > 0 ? deposits = movement + deposits : withdrawals = movement + withdrawals;

    if (movement > 0) {
      interest = interest + movement;
    }
  });

  interest = (interest * currentAccount.interestRate / 100);
  
  balanceTotal = deposits + withdrawals;

  positive.textContent = `${formatVal(deposits, 'pt-BR', 'BRL')}`;
  negative.textContent = `${formatVal(withdrawals, 'pt-BR', 'BRL')}`;
  juros.textContent = `${formatVal(interest, 'pt-BR', 'BRL')}`;
  balance.textContent = `${formatVal(balanceTotal, 'pt-BR', 'BRL')}`;
};

// Função do timer
const timer = function () {
  let time = 300;
  const clock = setInterval(() => {
    let minutes = time / 60;
    let seconds = time % 60;
    logout.textContent = `You will be logged out in ${String(Math.trunc(minutes)).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`;
    time--;

    if (time === 0) {
      clearInterval(clock);
      console.log('to aqui');
    }
  }, 1000);
};

// Função para transferencia de valores entre contas
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  let receiver = accounts.find((acc) => {
    return transferAcc.value === acc.user;
  });
  
  const currentBalance = currentAccount.movements.reduce((acc, mov) => acc + mov, 0);
  const amount = Number(transferVal.value);

  if (receiver && amount <= currentBalance) {
    console.log('estou aqui');
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    displayUI(currentAccount);
  }
});


// Função para empréstimo
btnLoan.addEventListener('click', function () {
  let isValid = false;

  for (const value of currentAccount.movements) {
    if (value > loanVal.value * 0.1) {
      isValid = true;
      break;
    }
  }

  if (isValid) {
    currentAccount.movements.push(Number(loanVal.value));
    displayUI(currentAccount);
  }
});


// Função para encerrar uma conta
btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  const deleteAcc = accounts.find((acc) => {
    return acc.user === closeAcc.value;
  });

  console.log(deleteAcc.pin);
  console.log(closePin.value);

  if (deleteAcc && deleteAcc.pin === Number(closePin.value)) {
    const index = accounts.indexOf(deleteAcc);
    accounts.splice(index, 1);
    prompt('Conta excluída com sucesso');

    if (currentAccount === deleteAcc) {
      main.style.opacity = 0;
    }
  }

})