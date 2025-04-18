/*
    Promise.allSettled is a helper function that runs multiple promises
    in parallel and aggregates the settled statuses (either fulfiller or
    rejected) into result array
*/

const settledPromises = Promise.allSettled([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
  Promise.resolve(3),
  Promise.reject(4),
]);

settledPromises
  .then((value) => console.log("Resolved with ", value))
  .catch((err) => console.log("Rejected with ", err));

// Polyfill for Promise.allSettled

Promise.myAllSettled = function (promises) {
  const result = [];
  let totalSettled = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = { status: "fulfilled", value };
          totalSettled++;
          if (totalSettled === promises.length) {
            resolve(result);
          }
        })
        .catch((reason) => {
          result[index] = { status: "rejected", reason };
          totalSettled++;
          if (totalSettled === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

const settledPromise = Promise.myAllSettled([
  Promise.resolve(1),
  new Promise((_, reject) => setTimeout(() => reject(2), 1000)),
  Promise.resolve(3),
  Promise.reject(4),
]);

settledPromise
  .then((value) => console.log("Resolved with ", value))
  .catch((err) => console.log("Rejected with ", err));
