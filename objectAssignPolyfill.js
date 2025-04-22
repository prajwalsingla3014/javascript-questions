// Implement a function objectAssign which is polyfill for builtin Object.assign() method

/*
    Object.assign() copies all enumerable properties from one or more
    source object to target object and returns the target object

    Enumerablitiy - Enumerability refers to whether a property can be iterated
    over or accessed using iteration methods like Object.keys or for in loop
    Own(Ownership) - Ownership determines whether a property belongs to object
    directly or is inherited from its prototype chain.

    Object - Property Flags and Descriptors
    Property Flags:
    In Object key has a value. But value which we mapped to key in the object is also a object
    which has an attribute of value in it which stores our value.Javascript provides some utility
    methods to get those

    const user = {
    name: "Prajwal",
    };

    let descriptor = Object.getOwnPropertyDescriptor(user, "name");
    console.log(descriptor);

    We get value as
    {
        value: 'Prajwal',
        writable: true,
        enumerable: true,
        configurable: true
    }
    writable - if it is true value can be changed/modified else it's read-only
    enumerable - if it is true then listed in loops or property can be iterated otherwise not listed
    configurable - if it true property can be deleted and these 3 attributed can be modified.

    We can use Object.defineProperty() method to set these attributes for given object

    const userObj = {
        age: 20,
    };

    Object.defineProperty(userObj, "name", {
        value: "Prajwal",
        writable: false,
        enumerable: true,
        configurable: true,
    });
    console.log(userObj.name);
    user.name = "Prajwal Singla";
    console.log(userObj.name);

    As writable is set to false we can't update value of name key

    If we have set enumerable to false we can't loop for particular key in object

    For configurable set to false and if we try to change value of any descriptor we get error

    Any string type property used as a key for an object will be enumerable as true by default
    But symbol type property used as a key will have enumerable as false by default.
*/

function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error("target should not be null or undefined");
  }

  /*
    Using Object constructor to wrap and turn primitives like numbers,boolean
    string,BigInt,NaN into its wrapper Object form
  */

  target = Object(target);

  // Loop through all sources objects and assign properties to target object
  for (let source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    /*
        Using Object constructor to wrap and turn primitives like numbers,boolean
        string,BigInt,NaN into its wrapper Object form
    */
    source = Object(source);
    // Reflect.ownKeys return array of own property keys including both enumerable and non-enumerable
    const keys = Reflect.ownKeys(source);
    const descriptors = Object.getOwnPropertyDescriptors(source);
    keys.forEach((key) => {
      const targetDescriptor = Object.getOwnPropertyDescriptor(target, key);
      if (targetDescriptor && targetDescriptor.writable === false) {
        throw new Error(`Property ${key} is not writable to target`);
      }

      // We should only assign enumerable properties of the source.
      if (descriptors[key].enumerable) {
        target[key] = source[key];
      }
    });
  }
  return target;
}

// Test cases
// const target = null;
// const source = { name: "Hello" };
// objectAssign(target, source);

// const target = "world";
// const source = { name: "Hello" };
// console.log(objectAssign(target, source));

// const target = { a: 1, b: 2 };
// const source = { c: 30, d: -1 };
// console.log(objectAssign(target, source));

const target = { a: 1, b: 2 };
const source1 = { c: 40, d: -1 };
const source2 = { e: 50, a: 0 };
const source3 = { f: 3, f: -1 };
console.log(objectAssign(target, source1, source2, source3));
