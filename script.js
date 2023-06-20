const body = document.querySelector('body'); 
const zeroSpan = document.getElementById('zero-span');

let inputtedNumbers = '';
let previousNumbers = '';
let operator = '';

window.addEventListener("keydown", handleKeyPress);

const numberInput = document.getElementById('num-field');
const numberDisplay = document.getElementById('screen-display');

const resetBtn = document.getElementById('reset');
const delBtn = document.getElementById('del');
delBtn.addEventListener('click', deleteInput);

const decimalBtn = document.getElementById('decimal');
const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {
  if (inputtedNumbers != "" && previousNumbers != "") {
    calculate();
  }
});

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

// Set mode
function lightMode() {
  const lightModeBtn = document.getElementById('light-mode');
  body.classList.add('light-mode');
  body.classList.remove('dark-mode');
}

function darkMode() {
  const darkModeBtn = document.getElementById('dark-mode');
  body.classList.remove('light-mode');
  body.classList.add('dark-mode');
}
// ----


// Fill display

// Get button clicks - Numbers + Reset button

numberBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {

  if (previousNumbers !== "" && inputtedNumbers !== "" && operator === "") {
    previousNumbers = "";
    numberInput.textContent = inputtedNumbers;
  }

  if (number === 'Reset') {
    zeroSpan.classList.remove('no-display');
    let temp = numberInput;
    numberInput.textContent = '';
    numberDisplay.textContent = '';
    inputtedNumbers = '';
    previousNumbers = '';
    
  } else if (inputtedNumbers.length <= 8) {
    inputtedNumbers += number;
    numberInput.textContent = inputtedNumbers;
    zeroSpan.classList.add('no-display');
  }

};  

// Get delete button click

function deleteInput () {
  let temp = numberInput.textContent;
  let newInput = temp.slice(0, -1);
  numberInput.textContent = newInput;
  inputtedNumbers = newInput;
}

// Get button click - Operators

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(operation) {
  if (previousNumbers === '') {
    previousNumbers = inputtedNumbers;
    operatorCheck(operation);
  } else if (inputtedNumbers === '') {
    operatorCheck(operation);
  } else {
    calculate();
    operator = operation;
    numberInput.textContent = '0';
    numberDisplay.textContent = previousNumbers + ' ' + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  numberDisplay.textContent = previousNumbers + ' ' + operator;
  numberInput.textContent = '0';
  inputtedNumbers = '';
}

// function handleOperator(operation) {
//   operator = operation;
//   previousNumbers = inputtedNumbers;
//   numberDisplay.textContent = previousNumbers + ' ' + operator;
//   inputtedNumbers = '';
//   numberInput.textContent = '';
// };

function calculate() {

  previousNumbers = Number(previousNumbers);
  inputtedNumbers = Number(inputtedNumbers);

  if(operator === '+') {

    previousNumbers = previousNumbers + inputtedNumbers;

  } else if (operator === '-') {

    previousNumbers = previousNumbers - inputtedNumbers;

  } else if (operator === '/') {
      if(inputtedNumbers <= 0) {

        numberInput.textContent = 'Error'
        displayResults();
        return;

      }
    previousNumbers = previousNumbers / inputtedNumbers;

  } else if (operator === '*') {

    previousNumbers = previousNumbers * inputtedNumbers;

  } 

  previousNumbers = roundNumber(previousNumbers);
  previousNumbers = previousNumbers.toString();
  displayResults();

}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {

  if (previousNumbers.length <= 10) {
    numberInput.textContent = previousNumbers;
  } else {
    numberInput.textContent = previousNumbers.slice(0, 10) + '...';
  }

  numberDisplay.textContent = '';
  operator = '';
  inputtedNumbers = '';

};

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9 || e.key === '.') {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    calculate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === "Backspace") {
    deleteInput();
  }
}
