/*
    Implement a function deepClone() which is used to create a deep copy of value
    and its recursively clones the values.Newly created object has the same value
    as the original value but they are not the same object in the memory.

    Implementation
    - Create a function deepClone which takes input value
    - For primtives like numbers,strings,boolean,null,undefined return value as it is
    - For data types like Arrays/Objects traverse recursively call deepClone on them.
    - Add value to result Array/Object and return

*/

function deepClone(value, visited = new Map()) {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value !== "object") {
    return value;
  }

  const result = Array.isArray(value) ? [] : {};

  // Check is value is already visited. To check whether we have circular references or not
  // let a = [1,4] If we do a.push(a), it will create circular reference

  if (visited.has(value)) {
    return visited.get(value);
  } else {
    visited.set(value);
  }

  // for in loop helps to iterate over enumerable properties
  for (let key in value) {
    // Will work for both arrays and objects as Arrays are also objects
    result[key] = deepClone(value[key], visited);
  }

  // For in only retrieves enumerable properties.Symbol() datatypes are non-enumerable
  // So for cloning them we use getOwnPropertySymbols which give array of Symbol properties
  const symbolProps = Object.getOwnPropertySymbols(value);
  for (let key of symbolProps) {
    result[key] = deepClone(value[key], visited);
  }

  return result;
}

// test case
let obj1 = {
  name: "Prajwal",
  age: 26,
  address: {
    city: "Jalandhar",
    pincode: 144005,
  },
  hobbies: ["Travelling", "Music"],
};

let obj2 = deepClone(obj1);
obj2.age = 25;
obj2.address.city = "Pune";
obj2.hobbies.push("Running");
console.log(obj1);
console.log(obj2);
