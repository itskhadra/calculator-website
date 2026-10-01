const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let shouldResetDisplay = false;

function calculate() {
    const secondNumber = Number(display.value);
    const first = Number(firstNumber);

    if (operator === "+") {
        display.value = first + secondNumber;
    } else if (operator === "-") {
        display.value = first - secondNumber;
    } else if (operator === "*") {
        display.value = first * secondNumber;
    } else if (operator === "/") {
        display.value = first / secondNumber;
    }

    firstNumber = "";
    operator = "";
    shouldResetDisplay = true;
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            if (shouldResetDisplay) {
                display.value = "";
                shouldResetDisplay = false;
            }

            if (value === "." && display.value.includes(".")) {
                return;
            }

            display.value += value;
            return;
        }

        if (value === "C") {
            display.value = "";
            firstNumber = "";
            operator = "";
            shouldResetDisplay = false;
            return;
        }

        if (value === "=") {
            if (firstNumber && operator) {
                calculate();
            }
            return;
        }

        if ("+-*/".includes(value)) {
            if (display.value !== "") {
                if (firstNumber && operator) {
                    const secondNumber = Number(display.value);
                    const first = Number(firstNumber);

                    if (operator === "+") {
                        firstNumber = first + secondNumber;
                    } else if (operator === "-") {
                        firstNumber = first - secondNumber;
                    } else if (operator === "*") {
                        firstNumber = first * secondNumber;
                    } else if (operator === "/") {
                        firstNumber = first / secondNumber;
                    }

                    display.value = "";
                } else {
                    firstNumber = display.value;
                    display.value = "";
                }
            }

            operator = value;
            shouldResetDisplay = false;
        }
    });
});