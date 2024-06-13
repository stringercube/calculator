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
        display.textContent += "."
    }
}

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
    // TO DO check if integer and above 0:
    number = Number(n);
    
    if (number < 0) {
        return "OOPS"
    } else if (number === 0) {
        return 0
    } else if (number === 1) {
        return 1
    } 
    
    let a = 0, b = 1, fibo = 0;
    for (let i = 2; i <= number; i++) {
        fibo = a + b;
        a = b;
        b = fibo;
    };
    
    return fibo;
};

function backspace(display) {
    const reducedText = display.textContent.substr(0, display.textContent.length - 1);
    display.textContent = reducedText;
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
    }
    
    console.log(result);

    display.textContent = String(result);
}


document.addEventListener('DOMContentLoaded', (e) => {
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
    });

function inputKey(e) {
    let keyValue = e.currentTarget.textContent;
    const screenContent = document.querySelector('.display');

    if (keyValue === "C") {
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
    };
};

function inputOperator(e) { 
    let keyValue = e.currentTarget.id;
    const screenContent = document.querySelector('.display');
    if (keyValue === 'backspace') {
        backspace(screenContent);
    };

    if (Math.abs(Number(screenContent.textContent)) >= 0) {
        if (keyValue === 'keydiv') {
            screenContent.textContent += '\u00F7';
            console.log(operator);
            operator = 'division';
        } else if (keyValue === 'keymult') {
            screenContent.textContent += '\u00D7';
            operator = 'multiplication';
        } else if (keyValue === 'keyminus') {
            screenContent.textContent += '\u2212';
            operator = 'rest';
        } else if (keyValue === 'keyplus') {
            screenContent.textContent += '\u002B';
            operator = "addition";
        };
    };

    if (keyValue === 'keyequal') {
        operator = getOperator(screenContent.textContent);
        [a, b] = getNumbers(operator);
        operate(a, b, operator, screenContent);
    };
};

function getNumbers(operator) {
    const screenContent = document.querySelector('.display');
    const displayText = screenContent.textContent;
    
    let separator = displayText.length - 1;
    
    if (operator === 'division') {
        separator = displayText.indexOf('\u00F7');
    } else if (operator === 'multiplication') {
        separator = displayText.indexOf('\u00D7');
    } else if (operator === 'rest') {
        separator = displayText.indexOf('\u2212');
    } else if (operator === 'addition') {
        separator = displayText.indexOf('\u002B');
        console.log(separator);
    };
    
    const a = Number(displayText.substring(0 , separator));
    const b = Number(displayText.substring(separator + 1));
    console.log([a, b]);
    return [a, b];
};

function getOperator(display) {
    if (display.includes('\u00F7')) {
        return 'division';
    } else if (display.includes('\u00D7')) {
        return 'multiplication';
    } else if (display.includes('\u2212')) {
        return 'rest';
    } else if (display.includes('\u002B')) {
        return 'addition';
    };
};