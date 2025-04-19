/*
    Implement a custom function mySetTimeout() and myClearTimeout().setTimeout function
    is utilized to introduce a delay to execute a function call after specified amount of
    time has passed.clearTimeout function stops the execution of function call which was
    scheduled to be called after the specified delay.
*/

function createMySetTimeout() {
  let timerId = 0;
  const timerMap = {};

  function mySetTimeout(callback, delay, ...args) {
    const id = timerId++;
    timerMap[id] = true;
    const startTime = Date.now();
    function check() {
      if (!timerMap[id]) return;
      if (Date.now() - startTime >= delay) {
        callback(...args);
      } else {
        requestIdleCallback(() => check());
      }
    }
    requestIdleCallback(() => check());
    return id;
  }

  function myClearTimeout(id) {
    if (timerMap[id]) delete timerMap[id];
  }

  return { myClearTimeout, mySetTimeout };
}

const { mySetTimeout, myClearTimeout } = createMySetTimeout();

const startTime = Date.now();
const print = () =>
  console.log(`Timer executed after ${Date.now() - startTime} ms`);
const id1 = mySetTimeout(print, 4000);
