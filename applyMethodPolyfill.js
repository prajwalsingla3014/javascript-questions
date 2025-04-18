const car = {
  color: "Black",
  model: "BMW",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.model} car for ${currency}${price}`
  );
}

// General method which JS provides
purchaseCar.apply(car, ["Rs", 7000000]);

// Polyfill for Apply Method
Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  context =
    context !== undefined && context !== null ? Object(context) : globalThis;
  if (!Array.isArray(args)) {
    throw new TypeError("The second argument must be an array");
  }
  const uniqueSymbol = Symbol();
  context[uniqueSymbol] = this;
  const result = context[uniqueSymbol](...args);
  delete context[uniqueSymbol];
  return result;
};

purchaseCar.myApply(car, ["Rs", 6000000]);
