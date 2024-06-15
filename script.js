// normal operation functions

function add(a, b) {
	return a + b;
};

function subtract (a, b) {
	return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b != 0) {
        return a / b;
    } else {
        return "Divide by 0";
    };
};

function clear(display) {
    display.textContent = "";
}

function point(display) {
    if (Number(display.textContent.substr(-1)) >= 0) {
        let operator = getOperator(display.textContent);
        let [a, b] = getNumbers(display.textContent, operator);
        if ((b === 0 && a % 1 === 0) || (b !== 0 && b % 1 === 0)) {
            display.textContent += ".";        
        };
    };
};

// special operation functions

function power(a, b) {
	return a ** b;
};

function factorial(n) {
    if (n === 0) return 1;
    
    let product = 1;
    for (let i = n; i > 0; i--) {
        product *= i;
    }
    
    return product;
};

function fibonacci(n) {
    if (n < 0) {
        return "OOPS"
    } else if (n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    } 
    
    let a = 0, b = 1, fibo = 0;
    for (let i = 2; i <= n; i++) {
        fibo = a + b;
        a = b;
        b = fibo;
    };
    
    return fibo;
};

function backspace(display) {
    display.textContent = display.textContent.substr(0, display.textContent.length - 1);
}

// function operate

function operate(a, b, operator, display) {
    
    let result = 0;

    if (operator === 'division') {
        result = divide(a, b);
    } else if (operator === 'multiplication') {
        result = multiply(a, b);
    } else if (operator === 'rest') {
        result = subtract(a, b);
    } else if (operator === 'addition') {
        result = add(a, b);
    } else if (operator === 'power') {
        result = power(a, b);
    } else return;
    display.textContent = result;
}


document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the class 'number'
    const buttons = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.function');

    // Iterate over the NodeLists of buttons and operators and add event listeners
    buttons.forEach(button => {
        button.addEventListener('click', inputKey)
        });
   
    operators.forEach(operator => {
        operator.addEventListener('click', inputOperator)
        });

    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (key === ' ') return; // Prevent space input
        
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key) || key === '.' || key === 'c') {
            inputKey({ key: key });
        }
        
        if (['/', '*', '-', '+', 'Enter', 'Backspace'].includes(key)) {
            inputOperator({ key: key });
        }
        });
    });

function inputKey(e) {
    let keyValue = e.currentTarget ? e.currentTarget.textContent : e.key;
    const screenContent = document.querySelector('.display');

    if (keyValue === 'c' || keyValue === 'C') {
        clear(screenContent);
    } else if (keyValue === ".") {
        point(screenContent);
    } else {
        for (let i = 0; i < 10; i++) {
            if (keyValue === `${i}`) {
                screenContent.textContent += `${i}`;
                break;
            }
        }
    }
}

function inputOperator(e) { 
    let keyValue = e.currentTarget ? e.currentTarget.id : e.key;
    const screenContent = document.querySelector('.display');

    if (keyValue === 'Backspace') {
        backspace(screenContent);
    } else if (['/', '*', '-', '+', '^'].includes(keyValue)) {
        if (Math.abs(Number(screenContent.textContent)) >= 0) {
            if (keyValue === '/') {
                screenContent.textContent += '\u00F7';
            } else if (keyValue === '*') {
                screenContent.textContent += '\u00D7';
            } else if (keyValue === '-') {
                screenContent.textContent += '\u2212';
            } else if (keyValue === '+') {
                screenContent.textContent += '\u002B';
            } else if (keyValue === '^') {
                screenContent.textContent += '^';
            };
        }
    } else if (keyValue === 'Enter') {
        const operator = getOperator(screenContent.textContent);
        const [a, b] = getNumbers(screenContent.textContent, operator);
        if (operator && !isNaN(b)) {
            operate(a, b, operator, screenContent);
        }
    } else if (keyValue === 'fibo' || keyValue === 'factorial') {
        const [a] = getNumbers(screenContent.textContent);
        if (Number.isInteger(a)) {
            const result = keyValue === 'fibo' ? fibonacci(a) : factorial(a);
            screenContent.textContent = String(result);
        }
    }
} 

function getNumbers(displayText, operator = "") {
    let separator = displayText.length;
    
    if (operator === 'division') {
        separator = displayText.indexOf('\u00F7');
    } else if (operator === 'multiplication') {
        separator = displayText.indexOf('\u00D7');
    } else if (operator === 'rest') {
        separator = displayText.indexOf('\u2212');
    } else if (operator === 'addition') {
        separator = displayText.indexOf('\u002B');
    } else if (operator === 'power') {
        separator = displayText.indexOf('^');
    }

    const a = Number(displayText.substring(0 , separator));
    const b = Number(displayText.substring(separator + 1));
    return [a, b];
}

function getOperator(display) {
    if (display.includes('\u00F7')) {
        return 'division';
    } else if (display.includes('\u00D7')) {
        return 'multiplication';
    } else if (display.includes('\u2212')) {
        return 'rest';
    } else if (display.includes('\u002B')) {
        return 'addition';
    } else if (display.includes('^')) {
        return 'power';
    } else return "";
}