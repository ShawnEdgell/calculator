let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '';
let decimalClicked = false;

function appendToDisplay(value) {
  if (operator === '') {
    firstNumber += value;
    displayValue = firstNumber;
  } else {
    secondNumber += value;
    displayValue = secondNumber;
  }
  updateDisplay();
  decimalClicked = false;
}

function addDecimal() {
  if (!decimalClicked) {
    if (operator === '') {
      firstNumber += '.';
    } else {
      secondNumber += '.';
    }
    displayValue += '.';
    decimalClicked = true;
    updateDisplay();
  }
}

function setOperator(selectedOperator) {
  if (firstNumber !== '' && secondNumber === '') {
    operator = selectedOperator;
  } else if (firstNumber !== '' && secondNumber !== '') {
    calculate();
    operator = selectedOperator;
  }
  updateDisplay();
  decimalClicked = false;
}

function calculate() {
  if (firstNumber !== '' && secondNumber !== '' && operator !== '') {
    const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    firstNumber = result.toString();
    operator = '';
    secondNumber = '';
    displayValue = firstNumber;
    updateDisplay();
  }
  decimalClicked = false;
}

function backspace() {
  if (operator === '') {
    // Backspace for the first number
    firstNumber = firstNumber.slice(0, -1);
    displayValue = firstNumber;
  } else {
    // Backspace for the second number
    secondNumber = secondNumber.slice(0, -1);
    displayValue = secondNumber;
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('result').value = displayValue;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        displayValue = "ERROR: Division by 0";
        return "ERROR";
      }
      return num1 / num2;
    default:
      return "ERROR";
  }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (/^[0-9]$/.test(key)) {
    appendToDisplay(key);
  } else if (key === '.') {
    addDecimal();
  } else if (/^[\+\-\*\/]$/.test(key)) {
    setOperator(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  }a
});

function refreshPage() {
    location.reload();
  }
  
  
  