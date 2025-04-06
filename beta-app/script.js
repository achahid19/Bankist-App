'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data hard-coded for learning puposes
// in real-life, we use data mostly from APIs
const account1 = {
  owner: 'Jonas Smith',
  movements: [200, 450.489, -400.32, 3000, -650, -130, 70, 1300],
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


// built a display movements function
const displayMovs = function(movements) {
	containerMovements.innerHTML = ''; // clear container.
	movements.forEach(function(movement, i){
		const type = movement > 0 ? 'deposit' : 'withdrawal';
		const htmlEl = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
        </div>`;

		containerMovements.insertAdjacentHTML('afterbegin', htmlEl);
	})
}

const displayBalance = function(acc) {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = `${acc.balance.toFixed(2)} EUR`;
}

const calcDisplaySummary = function(acc) {
	const incomes = acc.movements.filter(mov => mov > 0)
		.reduce((acc, mov) => acc + mov, 0);

	labelSumIn.textContent = `${incomes.toFixed(2)}€`;

	const out = acc.movements.filter(mov => mov < 0)
		.reduce((acc, mov) => acc + mov, 0);
	
	labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`

	const interest = acc.movements.filter(mov => mov > 0)
		.map((dep, i, arr) => (dep * acc['interestRate']) / 100)
		.reduce((acc, interest) => acc + interest, 0);

	labelSumInterest.textContent = interest.toFixed(2);
};

// using IIFE (Immediately invoked function expression)
// since usernames here are created one time.
(function() {
	accounts.map(function(acc) {
		acc.userName = acc['owner']
		.toLowerCase()
		.split(' ')
		.map(name => name[0])
		.join('');
	})
})();

//createUserNames(accounts);

// Arrow-func can use variables before definition
// but the call must be after definition.
const updateUI = () => {
	displayBalance(loginUser);
	displayMovs(loginUser['movements']);
	calcDisplaySummary(loginUser);
}

let	loginUser;

btnLogin.addEventListener('click', function(e) {
	e.preventDefault(); // prevent from submitting
	
	loginUser = accounts.find(acc => acc.userName === inputLoginUsername.value);

	// optional chaining to prevent from accessing undefined
	if (loginUser?.pin === Number(inputLoginPin.value)) {
		// clear buffers
		inputLoginUsername.value = inputLoginPin.value = ''; // assigning from right to left
		inputLoginPin.blur(); // lose focus;
		inputLoginUsername.blur();
		containerApp.style.opacity = 1; // display UI
		labelWelcome.textContent = `Welcome Again ${loginUser.owner.split(' ')[0]}`;
		
		updateUI();
	}
})

// Transfer feature
btnTransfer.addEventListener('click', function(e) {
	e.preventDefault();

	const transferValue = Number(inputTransferAmount.value);
	const recipient = accounts.find(
		acc => acc.userName === inputTransferTo.value
	);
	
	//check validity
	if (recipient && transferValue > 0
		&& transferValue < loginUser.balance
		&& recipient?.userName != loginUser.userName
		) {
			loginUser.movements.push(-transferValue);
			recipient.movements.push(transferValue);
			
			// auto update UI for logged user.
			updateUI();
		}

	inputTransferAmount.value = inputTransferTo.value = '';
	inputTransferAmount.blur();
	inputTransferTo.blur();
});

// Close account
btnClose.addEventListener('click', function(e) {
	e.preventDefault();

	if (
		inputCloseUsername.value === loginUser.userName
		&& Number(inputClosePin.value) === loginUser.pin
	) {
		const index = accounts.findIndex(
			acc => acc.userName === loginUser.userName
		);
		accounts.splice(index, 1);
		containerApp.style.opacity = 0;
	}
	inputCloseUsername.value = inputClosePin.value = '';
	inputClosePin.blur();
	inputCloseUsername.blur();
})

// Loan functionality: still contains flaws
// developed only for learning purpose
btnLoan.addEventListener('click', function(e) {
	e.preventDefault();

	const amount = Math.floor(inputLoanAmount.value);
	if (
		amount > 0
		&& loginUser.movements.some(mov => mov >= amount * 0.10)
	) {
		loginUser.movements.push(amount);
		updateUI();
	}
	inputLoanAmount.value = '';
	inputLoanAmount.blur();
})

let sorted = false;

btnSort.addEventListener('click', function(e) {
	e.preventDefault();

	sorted ? displayMovs(loginUser['movements'])
			: displayMovs(
				loginUser['movements']
				.slice()
				.sort((a, b) => a - b)
				// a - b > 0. no swap
				// a - b < 0. swap
				// a - b == 0. nothing done
			);
	sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
