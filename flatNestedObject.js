const data = {
  name: "Prajwal",
  age: 26,
  address: {
    city: "Jalandhar",
    pincode: 144005,
  },
  hobbies: ["Travelling", "Music"],
};

// Polyfill for flat nested object with notation _

function flattenObj(obj = {}, parent = "", result = {}) {
  for (let key in obj) {
    let propName = parent ? parent + "_" + key : key;
    if (typeof obj[key] === "object") {
      flattenObj(obj[key], propName, result);
    } else {
      result[propName] = obj[key];
    }
  }
  return result;
}

const flatObj = flattenObj(data);
console.log("Flat Obj ", flatObj);
