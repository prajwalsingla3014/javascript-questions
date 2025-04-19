/*
    Implement a function once() which is own vesion of lodash _.once method
    This method forces your function to be called once.However repeated call
    to function will return same value returned in the first call
*/

function myOnce(func) {
  let result;
  let isCalledOnce = false;
  return function (...args) {
    if (!isCalledOnce) {
      result = func.call(this, ...args);
      isCalledOnce = true;
    }
    return result;
  };
}

const sum = (a, b, c) => a + b + c;

const oncedSum = myOnce(sum);
console.log("Value", oncedSum(1, 2, 3));
console.log("Value", oncedSum(5, 2, 3));
console.log("Value", oncedSum(1, 7, 3));
