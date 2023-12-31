import { Characters, operators } from "./types";

/**
 * Função que realiza uma operação específica.
 *
 * @TODO realizar os calculos
 *
 */

export class Calculator {
  display: HTMLInputElement;
  numbers: number[];

  constructor() {
    this.display = document.createElement("input");
    this.display.classList.add("display");
    this.display.setAttribute("type", "text");
    this.numbers = Array(10)
      .fill(0)
      .map((_, index) => index);

    document.body.append(this.display);
  }

  #addDisplay = (value: string) => {
    if (!isNaN(+value)) {
      this.display.value += value;
    } else {
      if (value === Characters.point && this.display.value.length > 0) {
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

  #invertString = (value: string) => {
    let newValue = "";
    for (let i = value.length - 1; i >= 0; i--) {
      newValue += value[i];
    }

    return newValue;
  };

  #solveMultiplyAndDivide = (valueDisplay: string) => {
    let value = valueDisplay;
    let flag = false;

    for (let i = 0; i <= valueDisplay.length; i++) {
      if (value[i] === Characters.multiply || value[i] === Characters.divide) {
        let previousNumber = "";
        let nextNumber = "";

        for (let j = i - 1; value.length; j--) {
          if (!isNaN(+value[j]) || value[j] === Characters.point) {
            previousNumber += value[j];
          } else {
            break;
          }
        }

        for (let j = i + 1; value.length; j++) {
          if (!isNaN(+value[j]) || value[j] === Characters.point) {
            nextNumber += value[j];
          } else if (
            value[j] === Characters.multiply ||
            value[j] === Characters.divide
          ) {
            flag = true;
            break;
          } else {
            break;
          }
        }

        previousNumber = this.#invertString(previousNumber);

        const operation =
          value[i] === Characters.multiply
            ? +previousNumber * +nextNumber
            : +previousNumber / +nextNumber;

        const operator =
          value[i] === Characters.multiply
            ? Characters.multiply.valueOf()
            : Characters.divide.valueOf();

        value = value.replace(
          `${previousNumber}${operator}${nextNumber}`,
          `${operation}`
        );

        if (flag) {
          // restart because finded a operator
          i = 0;
          flag = false;
        }
      }
    }

    return value;
  };

  #equal = () => {
    if (this.#verifySintax()) {
      return alert("Por favor, revise a sintaxe da operação");
    }

    const start = performance.now();
    const number = this.#solveMultiplyAndDivide(this.display.value);
    const end = performance.now();

    const startEval = performance.now();
    const numberEval = eval(this.display.value);
    const evalEnd = performance.now();

    console.log(`Levei ${start - end}s e o resultado foi ${number}`);

    console.log(
      `Eval() ${startEval - evalEnd}s e o resultado foi ${eval(numberEval)}`
    );
  };

  #verifySintax = () => {
    let parenthesesLeft = 0;
    let parenthesesRight = 0;
    let checkOperator = false;

    for (let value of this.display.value) {
      // check if last character is operator
      if (operators.includes(value) && checkOperator) {
        return true;
      } else {
        checkOperator = false;
      }

      if (value === Characters.parenthesesRight) {
        parenthesesRight += 1;
      }

      if (value === Characters.parenthesesLeft) {
        parenthesesLeft += 1;
      }

      if (
        Object.values(Characters).includes(value as Characters) ||
        operators.includes(value) ||
        !isNaN(+value)
      ) {
        if (operators.includes(value)) checkOperator = true;
        continue;
      }

      return true;
    }

    if (parenthesesRight !== parenthesesLeft) {
      return true;
    }

    return false;
  };

  #verifyOperator = (value: string) => {
    const displayValue = this.display.value;
    const lastLetter = displayValue[displayValue.length - 1] as Characters;

    if (
      value === Characters.parenthesesRight ||
      value === Characters.parenthesesLeft
    ) {
      return;
    }

    if (
      (Object.values(Characters).includes(lastLetter) &&
        value === lastLetter) ||
      operators.includes(lastLetter)
    )
      this.#backspace();
  };

  #verifyPoint = () => {
    let acumulator = "";
    let numbers;

    for (let value of this.display.value) {
      acumulator += operators.includes(value) ? " " : value;
    }

    numbers = acumulator.split(" ");

    if (numbers[numbers.length - 1].includes(Characters.point)) return true;

    return false;
  };

  #addEventListener = () => {
    document.addEventListener("keydown", (event) => {
      if (
        this.numbers.includes(+event.key) ||
        operators.includes(event.key) ||
        Object.values(Characters).includes(event.key as any)
      ) {
        if (event.key === Characters.equal) {
          this.#equal();
        } else {
          this.display.value += event.key;
        }
      }

      if (
        event.key === "Backspace" ||
        event.key.toUpperCase() === Characters.backspace.valueOf()
      ) {
        this.#backspace();
      }

      if (event.key === "Enter") {
        this.#equal();
      }
    });
  };

  renderCalculatorHtml = () => {
    const fragment = document.createDocumentFragment();

    const wrapper = document.createElement("div");
    wrapper.classList.add("buttons");

    const backspace = document.createElement("button");
    backspace.textContent = Characters.backspace;
    backspace.addEventListener("click", () => this.#backspace());

    const equal = document.createElement("button");
    equal.textContent = Characters.equal;
    equal.addEventListener("click", () => this.#equal());

    const multiply = document.createElement("button");
    multiply.addEventListener("click", () =>
      this.#addDisplay(Characters.multiply)
    );
    multiply.textContent = Characters.multiply;

    const divide = document.createElement("button");
    divide.addEventListener("click", () => this.#addDisplay(Characters.divide));
    divide.textContent = Characters.divide;

    const add = document.createElement("button");
    add.addEventListener("click", () => this.#addDisplay(Characters.add));
    add.textContent = Characters.add;

    const subtract = document.createElement("button");
    subtract.addEventListener("click", () =>
      this.#addDisplay(Characters.subtract)
    );
    subtract.textContent = Characters.subtract;

    const point = document.createElement("button");
    point.addEventListener("click", () => this.#addDisplay(Characters.point));
    point.textContent = Characters.point;

    const parenthesesRight = document.createElement("button");
    parenthesesRight.addEventListener("click", () =>
      this.#addDisplay(Characters.parenthesesRight)
    );
    parenthesesRight.textContent = Characters.parenthesesRight;

    const parenthesesLeft = document.createElement("button");
    parenthesesLeft.addEventListener("click", () =>
      this.#addDisplay(Characters.parenthesesLeft)
    );
    parenthesesLeft.textContent = Characters.parenthesesLeft;

    for (let number of this.numbers) {
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

    this.#addEventListener();
  };
}
