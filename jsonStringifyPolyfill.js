/*
    Implement method stringify() which is polyfill for JSON.stringify()
    JSON.stringify converts Javascript value or object to JSON string version

    JSON.stringify supports following data types
    - Objects
    - Arrays
    - Primitives - Strings,Numbers,booleans

    Implementation
*/

function stringify(value) {
  const isTypeNullCategory = (value) => {
    if (value === null && typeof value === "object") return true;
    if (typeof value === "number" && Number.isNaN(value)) return true;
    if (typeof value === "number" && !Number.isFinite(value)) return true;
  };

  const isTypeIgnorableCategory = (value) => {
    if (typeof value === "symbol") return true;
    if (value === undefined || typeof value === "undefined") return true;
    if (typeof value === "function") return true;
  };

  if (isTypeNullCategory(value)) {
    return `${null}`;
  }

  if (isTypeIgnorableCategory(value)) {
    return undefined;
  }

  //   Handling for Date objects
  if (typeof value === "object" && value !== null && value instanceof Date) {
    return `"${value.toISOString()}"`;
  }

  if (typeof value === "string") {
    // Need to wrap explicitly in double quotes as per standard
    return `"${value}"`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return `${value}`;
  }

  // Handling for Arrays
  if (typeof value === "object" && Array.isArray(value)) {
    const stringifiedResult = [];
    value.forEach((val) => {
      if (isTypeIgnorableCategory(val) || isTypeNullCategory(val)) {
        stringifiedResult.push(stringify(null));
      } else {
        stringifiedResult.push(stringify(val));
      }
    });
    // Return stringified result in array representation using square brackets
    return "[" + stringifiedResult.join(",") + "]";
  }
  // Handling for objects
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const stringifiedResult = [];
    const keys = Object.keys(value);
    for (const key of keys) {
      const val = value[key];
      if (!isTypeIgnorableCategory(val)) {
        const result = stringify(val);
        const stringifiedFormat = `"${key}":${result}`;
        stringifiedResult.push(stringifiedFormat);
      }
    }
    // Return stringified result in object literal using curly brackets
    return "{" + stringifiedResult.join(",") + "}";
  }
}

// Test Case
const obj1 = {
  name: "Prajwal",
  age: 26,
  hobbies: ["Travelling", "Music"],
};

console.log(stringify(obj1));
console.log(stringify(obj1) === JSON.stringify(obj1));

const obj2 = {
  name: "Prajwal",
  age: 26,
  hobbies: ["Travelling", "Music"],
  address: {
    city: "Jalandhar",
    pincode: 144005,
    state: "Punjab",
  },
};
console.log(stringify(obj2));
console.log(stringify(obj2) === JSON.stringify(obj2));
