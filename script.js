/*initial setup */
let flexBas = 100/20;
const buttonContainer = document.getElementById('buttons');
const buttonValues = ['AC','DEL','','/','7', '8', '9','*', '4', '5', '6', '-', '1', '2', '3',
    '+','HIS', '0', '.', '='];

function createCalculatorButtons(buttonValues) {
     // Assuming you have a div with id 'buttons' in your HTML
    if (!buttons) {
      console.error("Button container element not found.");
      return;
    }
  
    buttonValues.forEach(value => {

  
      const button = document.createElement('button');
      button.textContent = value;
      button.value = value; // Set the value for easy access
        button.style.flexBasis = flexBas + '%'; // Set the flex-basis to 100/20% for each button
      button.style.flexGrow = 1; // Allow buttons to grow equally
      button.style.flexShrink = 1; // allow buttons to shrink equally
      button.addEventListener('click', handleButtonClick);
        
      //buttonDiv.appendChild(button);
      buttonContainer.appendChild(button);
    });
  }
  
  function handleButtonClick(event) {
      const buttonValue = event.target.value;
      // Handle button click logic here (e.g., append to display, perform calculation)
      console.log(`Button clicked: ${buttonValue}`);
  }
  
  // Example usage:

  createCalculatorButtons(buttonValues);