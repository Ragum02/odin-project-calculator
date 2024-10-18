const display = document.querySelector(".screen");
const buttons = document.querySelectorAll("li");

let currentInput = "";
let currentOperator;
let previousInput = "";

buttons.forEach(button => {
    button.addEventListener("click", function userInput(event){
        let userInput = event.target.textContent;
                    if(userInput === "CE"){
                        deleteAll();
                        return;
                    };
                    if(userInput === "◄"){
                        backspace();
                        return;
                    };
                    if(userInput === "+"){
                       operator("+");
                        return;
                    }
                    if(userInput === "-"){
                        operator("-");
                        return;
                    }
                    if(userInput === "×"){
                        operator("*");
                        return;
                    }
                    if(userInput === "­÷"){
                        operator("­/");
                        return;
                    }
                    if(userInput === "="){
                       result();
                       return;
                    }
                    if(userInput === "√"){
                       squareRoot();
                       return;
                    }
                    if(userInput === "%"){
                       remainder();
                       return;
                    }

        currentInput += userInput
        display.textContent = currentInput;
    })
})

function operator(op){
    if (currentInput === "") return;
    if (previousInput !== ""){
        result();
    }
    currentOperator = op;
    previousInput = currentInput;
    currentInput = ""
}

function result() {
    if (currentOperator == null || currentInput === "");

    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (currentOperator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                return;
            }
            result = num1 / num2;
            break;
    }

    display.textContent = result;
    currentInput = result.toString();
    currentOperator = null;
    previousInput = ""; 
}

function backspace() {
    currentInput = currentInput.slice(0, -1); 
    display.textContent = currentInput || "0"; 
}

function deleteAll() {
    currentInput = "";
    previousInput = "";
    currentOperator = null;
    display.textContent = "";
}

function squareRoot() {
    if (currentInput === "") return;
    const result = Math.sqrt(parseFloat(currentInput));
    display.textContent = result;
    currentInput = result.toString(); 
}


function remainder() {
    if (previousInput === "" || currentInput === "") return;
    const result = parseFloat(previousInput) % parseFloat(currentInput);
    display.textContent = result;
    currentInput = result.toString();
}
