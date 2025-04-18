const arr = [1, 2, 3, 4, 5];

const allPositive = arr.every((x) => x > 0);
console.log(allPositive);

// Polyfill for Every Method

Array.prototype.myEvery = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

const allPositiveNumbers = arr.myEvery((x) => x > 0);
console.log("All positive numbers", allPositiveNumbers);
