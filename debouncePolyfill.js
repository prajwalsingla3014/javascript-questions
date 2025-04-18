/*
    Debouncing is a programming practice used to ensure that time-consuming tasks
    do not fire so often, that it stalls the performance of the web page.In
    debouncing,the function is only executed after a specific delay since the last
    event's occurrence.Debouncing is ideal when you want to wait for a pause in the events
    before triggering a function.This is useful for situations like search suggestions.
*/

// PolyFill for debounce function

const myDebounce = (callback, delay) => {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

let startTime = Date.now();

const fetchData = () => {
  console.log(`fetchData called after ${Date.now() - startTime}ms`);
};

const debouncedFunc = myDebounce(fetchData, 50);
debouncedFunc();
