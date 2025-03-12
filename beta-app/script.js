'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'test',
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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// log the user, and display a raw UI
// btnLogin.addEventListener('click', function() {
//   accounts.forEach(function(account, i) {
//     console.log(accounts[i]['owner']);
//     if (accounts[i]['owner'] == inputLoginUsername
//         && accounts[i]['pin'] == inputLoginPin) {
//             containerApp.style.visibility = 'visible';
//         }
//   })
// Problem faced, since the button is inside a form, once
  // clicked, the page got refreshed. -> learn how to handle
  // this kind of behavior. // TO DO.🛑

// turn on the opacity, only for dev purpose.
containerApp.style.opacity = 100;

// built a display movements function
const displayMovs = function(movements) {
	containerMovements.innerHTML = ''; // clear container.
	movements.forEach(function(movement, i){
		const type = movement > 0 ? 'deposit' : 'withdrawal';
		const htmlEl = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>`;

		containerMovements.insertAdjacentHTML('afterbegin', htmlEl);
	})
}

const displayBalance = function(movements) {
	labelBalance.textContent = `${movements.reduce((acc,mov) => acc + mov, 0)} EUR`;
}

displayMovs(account1.movements);
displayBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
