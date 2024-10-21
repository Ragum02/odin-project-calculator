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
        case "-": case "*":    
            handleInput(key);
            break;    
        case "Enter": 
            handleInput("=")
            break;
        case "Backspace": case "Delete":
            backspace();
            break;
        case "Escape":
            deleteAll();
            break;
    }

});

/*********/ 

function handleInput(userInput){
if(userInput === "CE"){deleteAll(); return;};
if(userInput === "◄"){backspace(); return;}

if("0123456789."){
    if(userInput=== "." && currentEntry.includes(".")) return;
    if(currentEntry.length > 9) {currentEntry = currentEntry.slice(1);}
    currentEntry += userInput;
    display.textContent = currentEntry;
}


}

function performOperation(operator) {

}

/* Delete function */
function backspace(){currentEntry = currentEntry.slice (0, -1); display.textContent = currentEntry || "0"};
function deleteAll(){currentEntry = ""; previousEntry = ""; operator = null; display.textContent = "0"};
/*******************/
