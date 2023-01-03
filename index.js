const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");


let displayValue = "0";

let firstvalue = null;
let operator = null;
let waitingforSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}


keys.addEventListener("click", (e) => {
    const element = e.target;

    if (!element.matches("button")) return;

    if (element.classList.contains("operator")) {
        //console.log("operator", element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    if (element.classList.contains("decimal")) {
        //console.log("dec", element.value);
        inputDecimal();
        updateDisplay();
        return;
    }
    if (element.classList.contains("clear")) {
        //console.log("clr", element.value);
        inputClear();
        updateDisplay();
        return;
    }

    inputValue(element.value);
    updateDisplay();
})

function inputValue(num) {

    if (waitingforSecondValue) {
        displayValue = num;
        waitingforSecondValue = false;
    } else {
        displayValue = displayValue === "0" ? num : displayValue + num;;
    }

    // console.log(displayValue, waitingforSecondValue, firstvalue, operator);
}


function handleOperator(Nextoperator) {
    const value = parseFloat(displayValue);

    if (firstvalue === null) {
        firstvalue = value;
    } else if (operator) {
        const result = calculate(firstvalue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstvalue = result;

    }

    waitingforSecondValue = true;
    operator = Nextoperator;

}



function calculate(first, second, operator) {
    if (operator === "+") {
        return first + second;
    } else if (operator === "-") {
        return first - second;
    } else if (operator === "*") {
        return first * second;
    } else if (operator === "/") {
        return first / second;
    }

    return second;
};



function inputClear() {
    displayValue = "0";
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }

};