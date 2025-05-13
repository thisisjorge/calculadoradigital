let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    operation = op;
    previousInput = currentInput;
    resetScreen = true;
}

function compute() {
    if (operation === null || previousInput === '') return;
    
    try {
        const expression = previousInput + operation.replace('x', '*') + currentInput;
        currentInput = eval(expression).toString();
        operation = null;
        previousInput = '';
        resetScreen = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        clear();
    }
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const ariaLabel = button.getAttribute('aria-label');
        
        if (ariaLabel.match(/Zero|One|Two|Three|Four|Five|Six|Seven|Eight|Nine/)) {
            appendNumber(button.textContent);
        } else if (ariaLabel === 'Decimal') {
            appendDecimal();
        } else if (ariaLabel.match(/Add|Subtract|Multiply|Divide/)) {
            chooseOperation(button.textContent);
        } else if (ariaLabel === 'Equals') {
            compute();
        } else if (ariaLabel === 'Clear') {
            clear();
        } else if (ariaLabel === 'Backspace') {
            backspace();
        }
    });
});

clear();