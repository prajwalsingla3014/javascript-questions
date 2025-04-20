/*
    Implement a function deepEqual() which takes in two arguments as input which deeply
    compares both arguments and returns a boolean which determines if they are equal or not.
*/

const isObject = (obj) => {
  return obj != null && typeof obj === "object";
};

function deepEqual(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }
  if (a === b) {
    return true;
  }

  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (!b.hasOwnProperty(key)) {
      return false;
    }
    const valueA = a[key];
    const valueB = b[key];
    const isObjects = isObject(valueA) && isObject(valueB);
    if (valueA instanceof Date && valueB instanceof Date) {
      if (value1.getTime() != value2.getTime()) {
        return false;
      }
    } else if (!isObjects && valueA !== valueB) {
      return false;
    } else if (isObjects && !deepEqual(valueA, valueB)) {
      return false;
    }
  }
  return true;
}

// Test Cases
console.log(deepEqual(1, "Hello"));

console.log(deepEqual(1, "1"));

console.log(deepEqual(1, 1));

console.log(deepEqual(NaN, NaN));

console.log(deepEqual(NaN, null));

console.log(deepEqual([], []));

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 1, c: 3, b: 2 };
console.log(deepEqual(obj1, obj2));

const obj3 = { a: 1, b: [1, [2, [3, { c: 4 }]]], c: 4 };
const obj4 = { a: 1, b: [1, [2, [3, { c: 4 }]]], c: 4 };
console.log(deepEqual(obj3, obj4));
console.log(deepEqual({}, []));
