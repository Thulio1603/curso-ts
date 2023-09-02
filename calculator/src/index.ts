import { Calculator } from "./Calculator";
import "./styles.scss";

window.onload = () => {
  const calculator = new Calculator();
  calculator.renderCalculatorHtml();
};
