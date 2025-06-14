let btn = document.querySelector(".click");
const displayinput = document.querySelector(".numbers .input");
const numOpContainer = document.querySelector(".numbersandoperator");

// Event listener for number and operator buttons
numOpContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const buttonText = event.target.textContent;

    // Handle the "Clear" button
    if (buttonText === "Clear") {
      displayinput.value = "0"; // Reset display to 0
      return; // Stop execution here
    }

    // Prevent leading zeros unless it's the only digit
    if (displayinput.value === "0" && "0123456789".includes(buttonText)) {
      displayinput.value = buttonText; // Replace "0" with the new digit
      return;
    }

    // Append numbers and operators
    if (
      buttonText === "0" ||
      buttonText === "1" ||
      buttonText === "2" ||
      buttonText === "3" ||
      buttonText === "4" ||
      buttonText === "5" ||
      buttonText === "6" ||
      buttonText === "7" ||
      buttonText === "8" ||
      buttonText === "9" ||
      buttonText === "+" ||
      buttonText === "-" ||
      buttonText === "/" ||
      buttonText === "*" ||
      buttonText === "**"
    ) {
      displayinput.value += buttonText;
    }
  }
});

// Event listener for the "Get Output" button
btn.addEventListener("click", () => {
  const expression = displayinput.value;

 
 

  // Regex to split expression into numbers and operators, keeping operators
  // This pattern matches either a sequence of digits (and optional decimal for future use)
  // OR any of the specified operator characters (+, -, *, /, **)
  const tokens = expression.match(/(\d+\.?\d*)|[+\-*/]|\*\*/g);

  if (!tokens || tokens.length === 0) {
    displayinput.value = "Error"; // No valid tokens found
    return;
  }

  // Basic Left-to-Right Evaluation (Does not handle order of operations like PEMDAS/BODMAS)
  // This assumes expressions like "5+3-2" or "10*2/5"
  // For expressions like "2+3*4", it would do (2+3)*4 = 20, not 2 + (3*4) = 14
  try {
    let currentResult = parseFloat(tokens[0]); // Start with the first number
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseFloat(tokens[i + 1]);

      if (isNaN(nextNumber)) {
        displayinput.value = "Error"; // Malformed expression
        return;
      }

      switch (operator) {
        case "+":
          currentResult += nextNumber;
          break;
        case "-":
          currentResult -= nextNumber;
          break;
        case "*":
          currentResult *= nextNumber;
          break;
        case "/":
          if (nextNumber === 0) {
            displayinput.value = "Error: Div by 0";
            return;
          }
          currentResult /= nextNumber;
          break;
        case "**":
          currentResult **= nextNumber; // Exponentiation
          break;
        default:
          displayinput.value = "Error: Invalid Op"; // Unknown operator
          return;
      }
    }
    displayinput.value = currentResult;
  } catch (e) {
    displayinput.value = "Error"; // General error catch
  }
});