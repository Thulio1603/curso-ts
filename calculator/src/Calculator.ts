import { Caracteres, operators } from "./types";

/**
 * Função que realiza uma operação específica.
 *
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
      if (value === Caracteres.point && this.display.value.length > 0) {
        if (this.#verifyPoint()) return;
      } else {
        this.#verifyOperator(value);
      }

      this.display.value += value;
    }
  };

  #backspace = () => {
    const displayValue = this.display.value;

    this.display.value = displayValue.slice(0, -1);
  };

  #equal = () => {
    console.log("EQUAL", eval(this.display.value));
  };

  #verifyOperator = (value: string) => {
    const displayValue = this.display.value;
    const lastLetter = displayValue[displayValue.length - 1] as Caracteres;

    if (Object.values(Caracteres).includes(lastLetter) && value === lastLetter)
      this.#backspace();
  };

  #verifyPoint = () => {
    let acumulator = "";
    let numbers;

    for (let value of this.display.value) {
      acumulator += operators.includes(value) ? " " : value;
    }

    numbers = acumulator.split(" ");

    if (numbers[numbers.length - 1].includes(Caracteres.point)) return true;

    return false;
  };

  renderCalculatorHtml = () => {
    const fragment = document.createDocumentFragment();

    const numbers = Array(10)
      .fill(0)
      .map((_, index) => index);

    const wrapper = document.createElement("div");
    wrapper.classList.add("buttons");

    const backspace = document.createElement("button");
    backspace.textContent = Caracteres.backspace;
    backspace.addEventListener("click", () => this.#backspace());

    const equal = document.createElement("button");
    equal.textContent = "=";
    equal.addEventListener("click", () => this.#equal());

    const multiply = document.createElement("button");
    multiply.addEventListener("click", () =>
      this.#addDisplay(Caracteres.multiply)
    );
    multiply.textContent = Caracteres.multiply;

    const divide = document.createElement("button");
    divide.addEventListener("click", () => this.#addDisplay(Caracteres.divide));
    divide.textContent = Caracteres.divide;

    const add = document.createElement("button");
    add.addEventListener("click", () => this.#addDisplay(Caracteres.add));
    add.textContent = Caracteres.add;

    const subtract = document.createElement("button");
    subtract.addEventListener("click", () =>
      this.#addDisplay(Caracteres.subtract)
    );
    subtract.textContent = Caracteres.subtract;

    const point = document.createElement("button");
    point.addEventListener("click", () => this.#addDisplay(Caracteres.point));
    point.textContent = Caracteres.point;

    const parenthesesRight = document.createElement("button");
    parenthesesRight.addEventListener("click", () =>
      this.#addDisplay(Caracteres.parenthesesRight)
    );
    parenthesesRight.textContent = Caracteres.parenthesesRight;

    const parenthesesLeft = document.createElement("button");
    parenthesesLeft.addEventListener("click", () =>
      this.#addDisplay(Caracteres.parenthesesLeft)
    );
    parenthesesLeft.textContent = Caracteres.parenthesesLeft;

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
