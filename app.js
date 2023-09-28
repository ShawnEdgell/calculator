let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '';
let decimalClicked = false;
let isDragging = false;
let offsetX, offsetY;

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

// Center the calculator initially
const calculatorContainer = document.querySelector('.calculator-container');
const calculatorWidth = calculatorContainer.offsetWidth;
const calculatorHeight = calculatorContainer.offsetHeight;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

calculatorContainer.style.left = (windowWidth - calculatorWidth) / 2 + 'px';
calculatorContainer.style.top = (windowHeight - calculatorHeight) / 2 + 'px';

// Rest of your JavaScript code for dragging
// ...

// Draggable calculator-container
calculatorContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - calculatorContainer.getBoundingClientRect().left;
  offsetY = e.clientY - calculatorContainer.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    // Check if the calculator is within the bounds of the window
    const maxWidth = window.innerWidth - calculatorContainer.offsetWidth;
    const maxHeight = window.innerHeight - calculatorContainer.offsetHeight;

    if (left >= 0 && left <= maxWidth && top >= 0 && top <= maxHeight) {
      calculatorContainer.style.left = left + 'px';
      calculatorContainer.style.top = top + 'px';
    }
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});


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
  }
});

function clearCalculator() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    displayValue = '';
    decimalClicked = false;
    updateDisplay();
  }

  function updateDisplay() {
    const resultElement = document.getElementById('result');
    const maxDisplayWidth = resultElement.offsetWidth;
  
    if (displayValue.length > 15) {
      // If the displayed number is too long, format it as a power function
      const power = displayValue.length - 1;
      const base = displayValue[0] + (displayValue[1] || '');
      resultElement.value = `${base}e${power}`;
    } else {
      resultElement.value = displayValue;
    }
  }

  function addDecimal() {
    if (!decimalClicked) {
      if (operator === '') {
        if (firstNumber.indexOf('.') === -1) { // Check if decimal point already exists
          firstNumber += '.';
          displayValue += '.';
        }
      } else {
        if (secondNumber.indexOf('.') === -1) { // Check if decimal point already exists
          secondNumber += '.';
          displayValue += '.';
        }
      }
      updateDisplay();
      decimalClicked = true;
    }
  }
  

  
