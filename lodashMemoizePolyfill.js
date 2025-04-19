/*
    Implement a function memoize() which is own version of lodash _.memoize() method
    memoize method is used to memoize the result of function call which is passed as input
*/

function sum(a, b, c) {
  return a + b + c;
}

const resolver = (...args) => args.join("_");

function memoize(mainFunc, resolver) {
  let cache = {};
  return function (...args) {
    const key = resolver ? resolver(...args) : args[0];
    console.log("Key ", key);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    } else {
      const result = mainFunc.call(this, ...args);
      cache[key] = result;
      return result;
    }
  };
}

const memoizedSum = memoize(sum, resolver);
console.log("Value", memoizedSum(1, 2, 3));
