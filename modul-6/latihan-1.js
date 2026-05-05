const display = document.getElementById("display");
const container = document.getElementById("btn-container");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.innerText = currentInput;
}
const calculate = (first, second, op) => {
  const a = parseFloat(first);
  const b = parseFloat(second);
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Error" : a / b;
  return second;
};

function handleInput(type, value) {
  if (type === "number") {
    if (waitingForSecondOperand) {
      currentInput = value;
      waitingForSecondOperand = false;
    } else {
      currentInput = currentInput === "0" ? value : currentInput + value;
    }
  }

  if (type === "operator") {
    if (operator && !waitingForSecondOperand) {
      currentInput = calculate(firstOperand, currentInput, operator).toString();
    }
    firstOperand = currentInput;
    operator = value;
    waitingForSecondOperand = true;
  }

  if (type === "equal") {
    if (operator && !waitingForSecondOperand) {
      currentInput = calculate(firstOperand, currentInput, operator).toString();
      operator = null;
      firstOperand = null;
    }
  }

  if (type === "clear") {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
  }

  updateDisplay();
}


container.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const { type, value } = e.target.dataset;
  handleInput(type, value);
});

document.addEventListener("keydown", (e) => {
  let key = e.key;


  if (/[0-9.]/.test(key)) {
    handleInput("number", key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleInput("operator", key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    handleInput("equal", "Enter");
  } else if (key === "Escape") {
    handleInput("clear", "Escape");
  }
});
