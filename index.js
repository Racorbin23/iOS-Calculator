/*
 *   Calculator  - A simple model for a calculator
 */
class Calculator {
  constructor() {
    this.data = 0;
    this.other = 0;
    this.operator = "";
  }

  getData() {
    return this.data;
  }

  clear() {
    this.data = 0;
    this.other = 0;
    this.operator = "";
  }

  pressedInvert() {
    this.data = this.data * -1;
  }

  pressedPercentage() {
    this.data = this.data / 100;
  }

  pressedDecimal() {
    if (this.data.toString().includes(".") !== true) {
      this.data = this.data.toString() + ".";
    }
  }

  pressedOperator(operator) {
    this.operator = operator;
    this.other = this.data;
    this.data = 0;
  }

  pressedNumber(number) {
    if (this.data == 0) {
      this.data = number;
    } else {
      console.log("1");
      this.data = this.data.toString() + number;
    }
  }

  calculate() {
    if (this.operator === "+") {
      this.data = parseFloat(this.data) + parseFloat(this.other);
    } else if (this.operator === "-") {
      this.data = parseFloat(this.other) - parseFloat(this.data);
    } else if (this.operator === "*") {
      this.data = parseFloat(this.data) * parseFloat(this.other);
    } else if (this.operator === "/") {
      this.data = parseFloat(this.other) / parseFloat(this.data);
    }

    this.other = 0;
    this.operator = "";
  }
}

/*
 *  Controller - A model for the calculator
 */
class Controller {
  constructor() {
    this.calculator = new Calculator();
    this.setup();
  }

  pressedButton(item) {
    if (parseFloat(item) || item === "0") {
      this.calculator.pressedNumber(item);
    } else if (item === "+" || item === "-" || item === "*" || item === "/") {
      this.calculator.pressedOperator(item);
    } else if (item === "C") {
      this.calculator.clear();
    } else if (item === "=") {
      this.calculator.calculate();
    } else if (item === ".") {
      this.calculator.pressedDecimal();
    } else if (item === "%") {
      this.calculator.pressedPercentage();
    } else if (item === "+/-") {
      this.calculator.pressedInvert();
    }

    this.updateDisplay();
  }

  updateDisplay() {
    let display = document.getElementsByClassName("display")[0];
    display.innerHTML = this.calculator.getData();
    this.resetActiveButtons();
  }

  setActive(button_element) {
    button_element.style.backgroundColor = "white";
    button_element.style.color = "black";
  }

  resetActiveButtons() {
    const add = document.getElementById("add");
    const sub = document.getElementById("subtract");
    const multiply = document.getElementById("multiply");
    const divide = document.getElementById("divide");

    const buttons = [add, sub, multiply, divide];
    buttons.forEach((button) => {
      button.style.backgroundColor = "";
      button.style.color = "";
    });

    if (this.calculator.operator === "+") {
      this.setActive(add);
    } else if (this.calculator.operator === "-") {
      this.setActive(sub);
    } else if (this.calculator.operator === "*") {
      this.setActive(multiply);
    } else if (this.calculator.operator === "/") {
      this.setActive(divide);
    }
  }

  setup() {
    const buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        this.pressedButton(buttons[i].innerHTML);
      });
    }
  }
}

const appController = new Controller();
