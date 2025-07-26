/*
    Imagine you are working on a financial application that requires complex
    calculations to determine tax liabilities based on various parameters.
    These calculations are time-consuming and resource-intensive. Your goal
    is to implement a generic memoization function, memoize, that can be applied
    to any function to cache its results and improve overall application performance.
*/

function memoize(fn) {
  const cache = {};
  return (...args) => {
    const argsToString = JSON.stringify(args);
    if (argsToString in cache) {
      console.log("Fetching from cache for args ", argsToString);
      return cache[argsToString];
    } else {
      console.log("Computing value for args ", argsToString);
      const result = fn.apply(this, args);
      cache[argsToString] = result;
      return result;
    }
  };
}

addThreeNums = (a, b, c) => a + b + c;
add = memoize(addThreeNums);
console.log(add(1, 2, 3));
console.log(add(1, 2, 3));
console.log(add(3, 4, 5));
