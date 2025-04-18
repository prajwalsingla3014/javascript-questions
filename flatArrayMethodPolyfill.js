/*
    Flat array method is used to flat nested array.
    If no depth is provided by default is 1
*/

const arr = [1, 2, [3], [4, 5], [6, [7, 8, [9]]]];

const flatArr = arr.flat();
console.log("Flat Arr", flatArr);

// Polyfill for Array.flat method with depth
Array.prototype.myFlat = function () {
  if (!Array.isArray(this)) {
    throw new TypeError("Input must be an array");
  }
  const result = [];
  this.forEach((el) => {
    if (Array.isArray(el)) {
      result.push(...el.myFlat());
    } else {
      result.push(el);
    }
  });
  return result;
};

const flattenArr = arr.myFlat();
console.log("My flat arr", flattenArr);

// Iterative method
const flattenIterative = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const element = stack.pop();
    if (Array.isArray(element)) {
      stack.push(...element);
    } else {
      result.push(element);
    }
  }
  return result.reverse();
};

const resultFlat = flattenIterative(arr);
console.log("Result ", resultFlat);

// Polyfill for Array.flat method with depth
Array.prototype.myFlatArray = function (depth = 1) {
  if (!Array.isArray(this)) {
    throw new TypeError("Input must be an array");
  }
  const flatten = (arr, currDepth) => {
    if (currDepth === 0 || !Array.isArray(arr)) {
      return arr;
    }
    return arr.reduce((result, element) => {
      if (Array.isArray(element)) {
        return result.concat(flatten(element, depth - 1));
      } else {
        return result.concat(element);
      }
    }, []);
  };
  return flatten(this, depth);
};

const flattenedArr = arr.myFlatArray(1);
console.log("Flattened Arr ", flattenedArr);
