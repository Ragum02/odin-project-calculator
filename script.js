const display = document.querySelector(".screen")
const buttons = document.querySelectorAll("li")

let operator;

let previousEntry = "";
let currentEntry = "";

buttons.forEach(button => {
    button.addEventListener("click", e => {handleInput(e.target.textContent)});
})


/* Still looking for better/shorter solutions */
document.addEventListener("keydown", e => {
    const key = e.key;

    switch(key){
        case "0": case "1":
        case "2": case "3":
        case "4": case "5": 
        case "6": case "7":
        case "8": case "9":
        case ".": case "+":
        case "-":  
            handleInput(key);
            break;  
        case "*":   
            handleInput("×")
            break;
        case "/":
            handleInput("÷")
            break;
        case "Enter": 
            handleInput("=")
            break;
        case "Backspace": case "Delete":
            backspace();
            break;
        case "Escape":
            deleteAll();
            display.textContent = "";
            break;
    }

});

/*********/ 

function handleInput(userInput){
if(userInput === "CE"){deleteAll(); display.textContent = ""; return;};
if(userInput === "◄"){backspace(); return;};


if ("0123456789.".includes(userInput)) {
    if (userInput === "." && currentEntry.includes(".")) return;
    if (currentEntry.length > 9) {
        currentEntry = currentEntry.slice(1);
    }
    currentEntry += userInput;
    display.textContent = currentEntry;
    return;
}

if(userInput === "="){
    performOperation();
}

if (["+", "-", "×", "­÷", "%"].includes(userInput)) {
    if(previousEntry === "" && currentEntry === "") return;
    operator = userInput;
    display.textContent = operator;
    previousEntry = currentEntry;
    currentEntry = "";
}



if(userInput === "√"){
    if(currentEntry === "" || currentEntry === "√" || currentEntry === "0√" || parseFloat(currentEntry) < 0 || isNaN(currentEntry)){display.textContent = "ERR"; return;};
    currentEntry = Math.round(Math.sqrt(parseFloat(currentEntry))*1000)/1000; 
    currentEntry = currentEntry.toString(); 
    display.textContent = currentEntry;
}
}



function performOperation() {
if (!operator || !currentEntry) return;

let result;

const a = parseFloat(previousEntry);
const b = parseFloat(currentEntry)

switch(operator){
    case "+":
        result = a + b;
        break;
    case "-":
        result = a - b;
        break;
    case "×":
        result = a * b;
        break;
    case "­÷":
        if(b === 0) {display.textContent = "ERR"; deleteAll(); return;};
        result = a / b;
        break;
    case "%":
        if(b === 0) {display.textContent = "ERR"; deleteAll();return;}
        result = a % b;
        break;
}
if(isNaN(result)){display.textContent = "ERR"; return;}
console.log("Result:", result);
currentEntry = Math.round(result*1000)/1000;
currentEntry = currentEntry.toString();  
display.textContent = currentEntry;
operator = null;
previousEntry = "";

}

/* Delete function */
function backspace(){currentEntry = currentEntry.slice(0, -1); display.textContent = currentEntry || "0"};
function deleteAll(){currentEntry = ""; previousEntry = ""; operator = null;};
/*******************/