/*
    Implement a custom function mySetInterval and myClearInterval which are polyfills
    for built in setInterval and clearInterval functions.setInterval is used to execute
    a function call at specified intervals of delay. clearInterval function stops the
    execution of the function call which was scheduled to be called after delay.
*/

function createMySetInterval() {
  let intervalId = 0;
  let intervalMap = {};

  function mySetInterval(callback, delay, ...args) {
    const id = ++intervalId;
    function scheduleInterval() {
      intervalMap[id] = setTimeout(() => {
        callback(...args);
        if (intervalMap[id]) scheduleInterval();
      }, delay);
    }

    scheduleInterval();
    return id;
  }

  function myClearInterval(id) {
    if (intervalMap[id]) {
      clearTimeout(intervalMap[id]);
      delete intervalMap[id];
    }
  }

  return { myClearInterval, mySetInterval };
}

const { myClearInterval, mySetInterval } = createMySetInterval();

const print = () =>
  console.log(`Interval executed at ${Date.now() - startTime}ms`);

const startTime = Date.now();

const id1 = mySetInterval(print, 1000);

setTimeout(() => myClearInterval(id1), 7000);
