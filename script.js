// normal operation functions

function add(a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b != 0) {  
        return a / b;
    } else {
        return 'Divide by 0'; // div by zero exception catch
    }
}

// function to be called for clean screen

function clear(display) {
    display.textContent = ""; 
}

// function that appends decimal places in numbers

function point(display) {
    if (Number(display.textContent.substr(-1)) >= 0) {     // check if last character is a number
        let operator = getOperator(display.textContent);   // get operator to be looked for
        let [a, b] = getNumbers(display.textContent, operator);        // get a and b
        if ((b === 0 && a % 1 === 0) || (b !== 0 && b % 1 === 0)) {    // check if number to be appended has already decimals
            display.textContent += ".";        
        }
    }
}

// special operation functions

function power(a, b) {
	return a ** b;
}

function factorial(n) {
    if (n === 0) return 1;
    
    let product = 1;
    while (n > 0) {
      product *= n;
      n--;
    }
    
    return product;
  }

function fibonacci(n) {
    if (n < 0) {
        return "OOPS"
    } else if (n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    } 
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        a = b;
        b = a + b;
    };
    
    return b;
};

// function backspace removes the last character in display

function backspace(display) {
    display.textContent = display.textContent.substr(0, display.textContent.length - 1);
}

// function operate, used for every operation requiring two numbers and operator in display
// takes a, b, operator and display content as arguments

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

// event listeners added to buttons and operators
// keyboard event listeners also added, with the exception of finonacci, factorial and exp functions

document.addEventListener('DOMContentLoaded', () => {

// Select all buttons with the classes number and function

    const buttons = document.querySelectorAll('.number'); 
    const operators = document.querySelectorAll('.function'); 

    // Iterate over the NodeLists of buttons and operators and add event listeners
    
    buttons.forEach(button => {
        button.addEventListener('click', inputKey)
        });
   
    operators.forEach(operator => {
        operator.addEventListener('click', inputOperator)
        });
    
    // add keydown event listeners, assigning them to existing function based on key pressed passing it to 
    // the right input function
    
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const codeKey = e.code;
        
        if (codeKey === 'Space') e.preventDefault(); // Prevent space input messing display
        
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'c'].includes(key)) {
            inputKey({ key: key });
        }
        
        if (['/', '*', '-', '+', 'Enter', 'Backspace'].includes(key)) {
            inputOperator({ key: key });
        }
        });
    });

// function to associate input to associated function based on event

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
    document.activeElement.blur();
}

// function to associate input to associated function based on event

function inputOperator(e) { 
    let keyValue = e.currentTarget ? e.currentTarget.id : e.key;
    const screenContent = document.querySelector('.display');

    if (keyValue === 'Backspace') {
        backspace(screenContent);
    // based on pressed key inputs operator in display declared in unicode
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
            }
        }
    // enter event triggers getting display context for variable declaration and further passing to functions
    } else if (keyValue === 'Enter') {
        const operator = getOperator(screenContent.textContent);
        const [a, b] = getNumbers(screenContent.textContent, operator);
        if (operator && !isNaN(b)) {
            operate(a, b, operator, screenContent);
        }
    // for fibo and factorial inputs, only a number must be displayed in screen, which must be a integer
    } else if (keyValue === 'fibo' || keyValue === 'factorial') {
        const [a] = getNumbers(screenContent.textContent);
        if (Number.isInteger(a)) {
            const result = keyValue === 'fibo' ? fibonacci(a) : factorial(a);
            screenContent.textContent = result;
        }
    }
    document.activeElement.blur();
} 

// function designed to get numbers whether there's a specific operator on screen or not
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

// function that gets what operator is on display
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
