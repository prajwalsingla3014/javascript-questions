/*
    Promise.race() is a helper function that runs multiple promises
    in parallel and returns a promise which resolve or rejects based
    on whichever promises settles first
*/

const racePromise = Promise.race([Promise.resolve(1), Promise.reject(2)]);

racePromise
  .then((value) => console.log("Resolved with ", value))
  .catch((err) => console.log("Rejected with ", err));

// Promise.race Polyfill

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  });
};

const racePromises = Promise.myRace([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
  Promise.reject(3),
]);

racePromises
  .then((value) => console.log("Resolved with ", value))
  .catch((err) => console.log("Rejected with ", err));
