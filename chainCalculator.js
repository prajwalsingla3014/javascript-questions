/*
    Implement a calculator class with methods for addition,
    subtraction and multiplication supporting method chaining?
*/

class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  addition(val) {
    this.value = this.value + val;
    return this;
  }

  subtraction(val) {
    this.value = this.value - val;
    return this;
  }

  multiplication(val) {
    this.value = this.value * val;
    return this;
  }

  getValue() {
    return this.value;
  }
}

const calculator = new Calculator(2);
console.log(calculator.addition(3).multiplication(4).subtraction(5).getValue());
