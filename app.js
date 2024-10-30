const sum = (a, b) => a + b;
const subtract = (a, b) => a - b; 
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const number = document.querySelector("#number");
const operator = document.querySelector("#operator");
const anotherNumber = document.querySelector("#anotherNumber");
let pointer;

function operate(firstNumber, signal, secondNumber) {
    switch (signal) {
        case "+": return sum(firstNumber, secondNumber);
        case "-": return subtract(firstNumber, secondNumber);
        case "x": return multiply(firstNumber, secondNumber);
        case "/": return divide(firstNumber, secondNumber);
        default: return 0;
    }
}

function clear() {
    number.textContent = 0;
    operator.textContent = "";
    anotherNumber.textContent = "";
    pointer = number;
}

const digits = document.querySelector("#digits")
digits.addEventListener("click", (event) => {
    if (event.target.localName == "button") {
        if (pointer.textContent.length < 7) {
            const digit = event.target.textContent;
            if (digit == "." && pointer.textContent.length < 6) {
                if (!pointer.textContent.includes(".") 
                    && pointer.textContent != "-")
                    pointer.textContent = +pointer.textContent + digit;
            } else if (pointer.textContent.includes(".")) {
                    pointer.textContent += digit;
            } else
                pointer.textContent = +(pointer.textContent + digit);
        }
        }
});

const operators = document.querySelector("#operators");
operators.addEventListener("click", (event) => {
    if (event.target.localName == "button") {
        const signal = event.target.textContent;
        const firstNumber = number.textContent;
        const currentSignal = operator.textContent;
        const secondNumber = anotherNumber.textContent;

        if (!+firstNumber && signal == "-") {
            number.textContent = "-";
        } else if (firstNumber && !secondNumber && signal != "=") {
            operator.textContent = signal;
            pointer = anotherNumber;
        } else if (secondNumber) {
            const result = operate(+firstNumber, currentSignal, +secondNumber);
            clear();
            number.textContent = Math.round(result * 1000) / 1000;
            if (signal != "=") {
                operator.textContent = signal;
                pointer = anotherNumber;
            }
        }
    }
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);
clear();