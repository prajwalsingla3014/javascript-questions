const arr = [1, 2, 3, 4, 5];

arr.forEach((a) => console.log(a));

// Polyfill for forEach

Array.prototype.myForEach = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

function printElements(el) {
  console.log("Value ", el);
}

arr.myForEach(printElements);
