import { Operators } from "./types";

/**
 * Função que realiza uma operação específica.
 *
 * @TODO tratar ponto
 * @TODO realizar os calculos
 *
 */

export class Calculator {
  display: HTMLInputElement;

  constructor() {
    this.display = document.createElement("input");
    this.display.classList.add("display");
    this.display.setAttribute("type", "text");

    document.body.append(this.display);
  }

  #addDisplay = (value: string) => {
    if (!isNaN(+value)) {
      this.display.value += value;
    } else {
      // if (this.#verifyOperator(value) && value === Operators.point) return;
      this.#verifyOperator(value);

      this.display.value += value;
    }
  };

  #backspace = () => {
    const displayValue = this.display.value;

    this.display.value = displayValue.slice(0, -1);
  };

  #equal = () => {
    console.log("EQUAL");
  };

  #verifyOperator = (operator: string) => {
    const displayValue = this.display.value;
    const lastLetter = displayValue[displayValue.length - 1] as Operators;

    if (Object.values(Operators).includes(lastLetter)) this.#backspace();
  };

  renderCalculatorHtml = () => {
    const fragment = document.createDocumentFragment();

    const numbers = Array(10)
      .fill(0)
      .map((_, index) => index);

    const wrapper = document.createElement("div");
    wrapper.classList.add("buttons");

    const backspace = document.createElement("button");
    backspace.textContent = Operators.backspace;
    backspace.addEventListener("click", () => this.#backspace());

    const equal = document.createElement("button");
    equal.textContent = "=";
    equal.addEventListener("click", () => this.#equal());

    const multiply = document.createElement("button");
    multiply.addEventListener("click", () =>
      this.#addDisplay(Operators.multiply)
    );
    multiply.textContent = Operators.multiply;

    const divide = document.createElement("button");
    divide.addEventListener("click", () => this.#addDisplay(Operators.divide));
    divide.textContent = Operators.divide;

    const add = document.createElement("button");
    add.addEventListener("click", () => this.#addDisplay(Operators.add));
    add.textContent = Operators.add;

    const subtract = document.createElement("button");
    subtract.addEventListener("click", () =>
      this.#addDisplay(Operators.subtract)
    );
    subtract.textContent = Operators.subtract;

    const point = document.createElement("button");
    point.addEventListener("click", () => this.#addDisplay(Operators.point));
    point.textContent = Operators.point;

    const parenthesesRight = document.createElement("button");
    parenthesesRight.addEventListener("click", () =>
      this.#addDisplay(Operators.parenthesesRight)
    );
    parenthesesRight.textContent = Operators.parenthesesRight;

    const parenthesesLeft = document.createElement("button");
    parenthesesLeft.addEventListener("click", () =>
      this.#addDisplay(Operators.parenthesesLeft)
    );
    parenthesesLeft.textContent = Operators.parenthesesLeft;

    for (let number of numbers) {
      const button = document.createElement("button");
      button.textContent = number.toString();
      button.addEventListener("click", () =>
        this.#addDisplay(number.toString())
      );
      fragment.appendChild(button);
    }

    fragment.appendChild(backspace);
    fragment.appendChild(parenthesesRight);
    fragment.appendChild(parenthesesLeft);
    fragment.appendChild(point);
    fragment.appendChild(equal);
    fragment.appendChild(divide);
    fragment.appendChild(multiply);
    fragment.appendChild(subtract);
    fragment.appendChild(add);

    wrapper.appendChild(fragment);

    document.body.append(wrapper);
  };
}
