/*
    The bind method in JavaScript is used to create a new function
    with a specified this context. It doesn't immediately execute
    the function but returns a new function that can be invoked later.
*/

const car = {
  color: "Black",
  company: "BMW",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
  );
}

// Bind Method which is provided by JS
const newFunc = purchaseCar.bind(car, "Rs", 7000000);
newFunc();

// The returned function can also take arguments
const newFunc1 = purchaseCar.bind(car, "Rs");
newFunc1(7500000);

// Polyfill for Bind Method

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  context = context !== undefined && context !== null ? context : globalThis;
  const uniqueSymbol = Symbol();
  context[uniqueSymbol] = this;
  return function (...newArgs) {
    const result = context[uniqueSymbol](...args, ...newArgs);
    delete context[uniqueSymbol];
    return result;
  };
};

// One way of using myBind
const newFunc2 = purchaseCar.myBind(car, "Rs", 8000000);
newFunc2();

// Other Way of using myBind with passinf arguments in returned function
const newFunc3 = purchaseCar.myBind(car, "Rs");
newFunc3(8500000);
