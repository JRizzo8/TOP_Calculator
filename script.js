//initial declarations
const flexBas = 100/20;
const smileValue = 80085;
const History = [];
const operators = ['x', '/', '–', '+'];
const modal = document.getElementById("historyModal");
const modalCloseBtn = document.getElementsByClassName("close")[0];
const historyList = document.getElementById('historyList');
let number1 = 0;
let number2 = 0;
let operator = '';
let periodCheck = 'no';
let inputCount = 0; //mainly for keeping track of if its the first click to clear display
const display = document.getElementById('display');
const buttonContainer = document.getElementById('buttons');
const buttonValues = ['AC','DEL','🙂','/','7', '8', '9','x', '4', '5', '6', '–', '1', '2', '3',
    '+','HIS', '0', '.', '=']; 
//ctrl+shift+u then type either 2013 or 2014 then enter for en or em dash respectively.


//initial functions
function createCalculatorButtons(buttonValues) { 
//create calculator buttons
    buttonValues.forEach(value => {
        const button = document.createElement('button');
        button.textContent = value;
        button.value = value; // Set the value for easy access
        if (value == 'x' || value == '/' || value == '–' || value == '+' || value == '=') {
            button.classList.add('operator'); // Add a class for operator buttons for styling
        }else {
            button.classList.add('numberBtn'); // Add a class for number buttons for styling
        }
        button.classList.add('button') // Add a class for general button styling
        button.style.flexBasis = flexBas + '%';
        button.style.flexGrow = 1; // Allow buttons to grow equally
        button.style.flexShrink = 1; // allow buttons to shrink equally
        button.addEventListener('click', handleButtonClick);
        
        buttonContainer.appendChild(button);
    });
}

function handleButtonClick(event) {
    const btnValue = event.target.value;
    if (event.target.classList.contains('operator')) {  
    //check if button is an operator button
        periodCheck = 'no';
        if(inputCount != 0){
            processOperator(btnValue);
        }else{
            alert('Please enter a number first');
            return;
        }
    }else if(btnValue == '🙂'){
        processSmile();

    }else if (btnValue == '.') {
        if (periodCheck == 'no') {
            periodCheck = 'yes';
            displayChecks(btnValue);
        }else {
            alert('only one decimal point please');
            return;
        }
    }else if (btnValue == 'AC') {
            clearDisplay(btnValue);
    }else if (btnValue == 'DEL'){
        if (inputCount == 0) {
            alert('nothing to delete');
            return;
        }else if (inputCount == 1) {
            display.innerText = 0;
            inputCount = 0;
            number1 = 0;
        }else{
            processDelete();
        }
    }else if (btnValue == '0'){
        if (inputCount == 0) {
            alert('Please enter a non-zero number first');
        }else {
            displayChecks(btnValue);
        }

    }else if (btnValue == 'HIS'){
        modal.style.display = "block";
    }else {
        displayChecks(btnValue);
    }
    
    console.log(`Button clicked: ${btnValue}`);
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

modalCloseBtn.onclick = function() {
    modal.style.display = "none";
}

function processSmile(){
//logic to process smiley face button
    if (inputCount == 0){
        display.innerText = smileValue;
        inputCount = 5;
        console.log(inputCount);
    }else if (inputCount < 10){
        display.innerText += smileValue;
        inputCount += 5;
        console.log(inputCount);
    }else if (inputCount >= 10) {
        alert('not enough length for the "secret number", leave at least 5 digits');
        return;
    }
}

function processOperator(btnValue) {
    if (operator == '') {
    //check if an operator has not been used
        if (btnValue != '=') {
        //checks if button is not =
            inputCount++;
            number1 = parseFloat(display.innerText);
            switch (btnValue) {
                case 'x':
                    operator = '*';
                break;
                case '/':
                    operator = '/';
                break;
                case '–':
                    operator = '-';
                break;
                case '+':
                    operator = '+';
                break;
                default:
                    alert('Invalid operator');
                return;
            }
            display.innerText += btnValue;
        }else{
            alert('Please enter an operator first');
            return;
        }
    }else {
        if (operators.includes(btnValue)) {
            alert('only one operator please');
            return;
        }else{
            number2 = parseFloat(number2);
            calculateAndDisplayResult();
        }
    }

    
    console.log(`Operator set: ${operator}, Input count: ${inputCount}`);
}

function displayChecks(btnValue){
    if (operator == '') {
        if (inputCount == 0) { 
            display.innerText = btnValue;
            inputCount++;
            console.log(inputCount);
        }else if (inputCount < 15 && inputCount > 0) {
            //check for min and max display length
                inputCount++;
                display.innerText += btnValue;
                console.log(inputCount);
        }else {
            alert('Max input length reached, clear display to continue');
            return;
        }
    }else{
        if (inputCount < 15 && inputCount > 0) {
            //check for min and max display length
                inputCount++;
                display.innerText += btnValue;
                number2 += btnValue;
                console.log(inputCount);
        }else {
            alert('Max input length reached, clear display to continue');
            return;
        }
    }
}

function clearDisplay(btnValue) {
        display.innerText = 0;
        number1 = 0;
        number2 = 0;
        operator = '';
        periodCheck = 'no';
        inputCount = 0;
}

function processDelete() {
//logic to delete last character
    inputCount--;
    lastEntry = display.innerText.charAt(display.innerText.length - 1);
    if (operators.includes(lastEntry)) {
        operator = '';
    }else if (operator != ''){
        if (number2.length == 1) {
            number2 = 0;
        }else{
            number2 = number2.slice(0, -1);
        }
    }else if (lastEntry == '.') {
        periodCheck = 'no';
        if (operator == '') {
            number1 = number1.slice(0, -1);   
        }else{
            if (number2.length == 1) {
                number2 = 0;
            }else{
                number2 = number2.slice(0, -1);
            }
        }
    }
    
    display.innerText = display.innerText.slice(0, -1);
        
    console.log(`Input count: ${inputCount}, number1: ${number1}, number2: ${number2}, operator: ${operator}`);
}

function calculateAndDisplayResult() {
    //logic to calculate and display result
    console.log(`operater: ${operator}, number1: ${number1}, number2: ${number2}`);
    function checkResult(result){
        if (result.toString().length > 15) {
            alert('Answer too long for display screen, clear display to continue');
            return;
        }else{
            if (result % 1 != 0) {
                result = result.toFixed(2);
                return result;
            }else{
                return result;
            }
        }
    }
    switch(operator) {
        case '+':
            result = number1 + number2;
            checkedResult = checkResult(result);
            display.innerText = checkedResult;     
        break;
        case '–':
            result = number1 - number2;
            checkedResult = checkResult(result);
            display.innerText = checkedResult;           
        break;
        case '*':
            result = number1 * number2;
            checkedResult = checkResult(result);
            display.innerText = checkedResult; 
        break;
        case '/':
            if (number2 == 0) {
                alert('Bruh, Really?');
                return;
            }else {
                result = number1 / number2;
                checkedResult = checkResult(result);
                display.innerText = checkedResult;          
            }
        break; 
    }
    updateHistory(number1, number2, operator, checkedResult);
}

function updateHistory(number1, number2, operator, result){
    //logic to update history
        const historyItem = {
            number1: number1,
            operator: operator,
            number2: number2,
            result: result
        };
    if (History.length < 5) {
        History.unshift(historyItem);
    }else {
        History.pop();
        History.unshift(historyItem);
    }
    while (historyList.hasChildElements()){
            historyList.removeChild(historyList.lastChild);
        }
    History.forEach (item => {

        const historyItem = document.createElement('li');
        historyItem.innerText = `${item.number1}${item.operator}${item.number2} = ${item.result}`;
        historyList.appendChild(historyItem);
    });
}



//main program
createCalculatorButtons(buttonValues);