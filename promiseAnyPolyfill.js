/*
    Promise.any() is a helper function that runs multiple promises
    in parallel and resolves to the value of the first successfully
    resolved promise from the input array of promises. If all promises
    in array are rejected or if array is empty then Promises.any rejects
    with an Aggregate Error containing rejection reasons of input promises
*/

const anyPromise = Promise.any([
  Promise.reject(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
]);

anyPromise
  .then((value) => console.log("Resolved with ", value))
  .catch((err) => console.log("Rejected with ", err));

// Promise.Any polyfill

Promise.myAny = function (promises) {
  const errors = [];
  let totalRejected = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      reject(new AggregateError(errors, "Empty Array"));
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((err) => {
          errors[index] = err;
          totalRejected++;
          if (totalRejected === promises.length) {
            reject(new AggregateError(errors, "All promises rejected"));
          }
        });
    });
  });
};

const promise1 = Promise.myAny([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3),
]);

promise1
  .then((value) => console.log("Resolved with ", value))
  .catch((err) => console.log("Rejected with ", err));
