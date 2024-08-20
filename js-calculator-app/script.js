var previousOperand = document.querySelector(".previous-operand");
var currentOperand = document.querySelector(".current-operand");
var clearBtn = document.querySelector(".clear");
var deleteBtn = document.querySelector(".delete");
var operatorBtns = document.querySelectorAll(".operator");
var numberBtns = document.querySelectorAll(".number");

deleteBtn.addEventListener("click", () => {
  let newVal = currentOperand.textContent.split("");
  newVal.pop();
  if (newVal.length > 0) {
    currentOperand.textContent = newVal.reduce((a, b) => a + b);
  } else {
    previousOperand.textContent = "";
    currentOperand.textContent = "";
  }
});

clearBtn.addEventListener("click", () => {
  previousOperand.textContent = "";
  currentOperand.textContent = "";
});

for (let i = 0; i < numberBtns.length; i++) {
  numberBtns[i].addEventListener("click", () => {
    if (
      numberBtns[i].textContent === "." &&
      currentOperand.textContent.includes(".")
    )
      return;
    currentOperand.textContent += numberBtns[i].textContent;
  });
}

for (let i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener("click", () => {
    if (!currentOperand.textContent) return;
    if (!previousOperand.textContent) {
      if (operatorBtns[i].textContent === "=") {
        return (currentOperand.textContent = currentOperand.textContent);
      }
      previousOperand.textContent =
        currentOperand.textContent + operatorBtns[i].textContent;
      currentOperand.textContent = "";
    } else {
      var result;
      var previousNumber = Number(previousOperand.textContent.slice(0, -1));
      var currentNumber = Number(currentOperand.textContent);
      switch (
        previousOperand.textContent[previousOperand.textContent.length - 1]
      ) {
        case "+":
          result = previousNumber + currentNumber;
          break;
        case "-":
          result = previousNumber - currentNumber;
          break;
        case "*":
          result = previousNumber * currentNumber;
          break;
        case "÷":
          result = previousNumber / currentNumber;
          break;
        default:
          return;
      }
      previousOperand.textContent = result + operatorBtns[i].textContent;
      currentOperand.textContent = "";
      if (operatorBtns[i].textContent === "=") {
        currentOperand.textContent = previousOperand.textContent.split("=")[0];
        previousOperand.textContent = "";
      }
    }
  });
}
