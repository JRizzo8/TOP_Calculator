/*initial declarations */
const flexBas = 100/20;
const smileValue = 80085;
let number1 = 0;
let number2 = 0;
let operator = '';
let inputCount = 0; //mainly for keeping track of if its the first click to clear display
const display = document.getElementById('display');
const buttonContainer = document.getElementById('buttons');
const buttonValues = ['AC','DEL','🙂','/','7', '8', '9','x', '4', '5', '6', '–', '1', '2', '3',
    '+','HIS', '0', '.', '=']; 
    // ctrl+shift+u then type either 2013 or 2014 then enter for en or em dash respectively.

//initial functions
function createCalculatorButtons(buttonValues) { //create calculator buttons
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
    intialChecks(btnValue);
    
    console.log(`Button clicked: ${btnValue}`);
}

function intialChecks(btnValue){

    if (inputCount == 0 && operator == '' && btnValue != 'DEL'){                                        
        //check if first click to replace display instead of append
        inputCount++;
        display.innerText = btnValue;
        console.log(inputCount);
    }else if (inputCount == 0 && operator != ''){
        //check if first number is an operator
        alert('Please enter a number first');
        return;
    }else if (inputCount == 0 && operator == '' && btnValue == 'DEL') {
        //check if first click is delete
        alert('Please enter a number first');
        return;
    }else if (inputCount < 15 && operator == '') {
        //check for max display length
        inputCount++;
        display.innerText += btnValue;
        console.log(inputCount);
    }else if (inputCount < 15 && operator != '') {
        inputCount++;
        number2 += btnValue;
        display.innerText += btnValue;
        console.log(inputCount);
    }else if (inputCount == 15 && operator == '') {
        alert('Max input length reached, clear display to continue');
        return;
    }else if (inputCount == 15 && operator != '') {
        alert('Max input length reached, clear display to continue');
        return;
    }else {
        checkOperator(btnValue);
    }
}

function checkOperator(btnValue) {
    if (btnValue == 'x' || btnValue == '/' || btnValue == '–' || btnValue == '+') {
        operator = btnValue;
        number1 = display.innerText;
        console.log(`Operator set to: ${operator}, number 1 set to: ${number1}`);
    }else if (btnValue == '=') {
        console.log(`Number 1: ${number1}, Number 2: ${number2}, Operator: ${operator}`);
        calculateResult();
    }else if (btnValue == 'HIS') {
        //logic to display recent history
        alert('History feature not implemented yet');
    }else if (btnValue == 'DEL') {
        //delete last character
        currentDisplay = display.innerText;
        currentDisplay.slice(0, -1);
        display.innerText = currentDisplay;
        inputCount--;
        console.log(`Display updated`);
    }else if (btnValue == 'AC') {
        //clear display
        display.innerText = '0';
        inputCount = 0;
        number1 = 0;
        number2 = 0;
        operator = '';
        console.log('Display cleared');
    }else if (btnValue == '🙂') {
        //display the secret number
        display.innerText = smileValue;
        console.log('Secret number displayed');
    }
}
function calculateResult() {
    //logic to calculate and display result
}

  

createCalculatorButtons(buttonValues);