let arr = [1, 2, 3, 4, 5];

const mappedArr = arr.map((a) => a * 2);
console.log(mappedArr);

// Polyfill for Map function

Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

const mappedArray = arr.myMap((a) => a * 3);
console.log("mapped Array ", mappedArray);
