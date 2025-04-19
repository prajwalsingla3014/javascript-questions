/*
    Implement a function classNames() which is a utility method used to
    conditionally join classNames together separated by space characters
*/

function classNames(...args) {
  const results = [];
  args.forEach((arg) => {
    if (!arg) return;
    if (typeof arg === "string" || typeof arg === "number") {
      results.push(arg);
      return;
    }
    if (Array.isArray(arg)) {
      for (let val of arg) {
        if (val) results.push(classNames(val));
      }
      return;
    }

    for (let key in arg) {
      const val = arg[key];
      if (val) results.push(key);
    }
  });
  return results.join(" ");
}

// Test cases
console.log(classNames("hide", "maximize", false));
console.log(classNames("show", "maximize", false, 200));
const input1 = [
  "container",
  { visible: true, "width-300": 300 },
  { height: null },
];
console.log(classNames(input1));
