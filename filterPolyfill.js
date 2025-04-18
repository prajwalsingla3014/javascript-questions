let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const evenNumbers = arr.filter((a) => a % 2 === 0);
console.log("Even Numbers", evenNumbers);

// Polyfill for filter method

function isEven(val) {
  return val % 2 === 0;
}

Array.prototype.myFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const evenArray = arr.myFilter(isEven);
console.log("Even array ", evenArray);
