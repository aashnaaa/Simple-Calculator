let currentOperand = '';
let previousOperand = '';
let operation = null;

const display = document.getElementById('display');

function appendNumber(number) {
    if (number === '0' && currentOperand === '0') return;
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentOperand;
    if (operation != null) {
        display.innerText = `${previousOperand} ${operation} ${currentOperand}`;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    }
    if (event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === '+') {
        chooseOperation('+');
    }
    if (event.key === '-') {
        chooseOperation('-');
    }
    if (event.key === '*') {
        chooseOperation('*');
    }
    if (event.key === '/') {
        chooseOperation('/');
    }
    if (event.key === 'Enter') {
        compute();
    }
    if (event.key === 'Backspace') {
        clearDisplay();
    }
});