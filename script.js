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

function clear() {
    //TO DO clear variables stored and reset display
}

function point() {
    //TO DO add point
}

// special operation functions

function power(x, n) {
	return x ** n;
};

function factorial(n) {
    if (n === 0) return 1;
    
    let product = 1;
    for (let i = n; i > 0; i--) {
        product *= i;
    }
    
    return product;
};

function fibonacci(argument) {
    // TO DO check if integer and above 0:
    number = Number(argument);
    
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

function backspace() {
    //TO DO
    //erase operator or last digit of input variable
}

// function operate

function operate(a, b, operator) {
    //TO DO
    //get a b and operator from input variables
    //call function acc to operator found and parse input values
    //return results and put it in display
}

//TO DO
//add event listener for number key pad
//add event listener for normal and special functions
    //get from context operator and a value, store them

//TO DO add event listener for keyboard input
