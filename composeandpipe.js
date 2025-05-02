// Compose and Pipe

const addFive = (num) => {
  return num + 5;
};

const subtractTwo = (num) => {
  return num - 2;
};

const multiplyFour = (num) => {
  return num * 4;
};

/*
    Implement compose function so that multiplyFour takes
    initialValue 5 and result will be returned to subtractTwo
    function and so on
*/

function compose(...fns) {
  return function (initValue) {
    return fns.reduceRight((acc, curr) => {
      return curr(acc);
    }, initValue);
  };
}

const evaluate = compose(addFive, subtractTwo, multiplyFour);
console.log(evaluate(5));

/*
    Implement pipe function so that addFive takes
    initialValue 5 and result will be returned to subtractTwo
    function and so on
*/

function pipe(...fns) {
  return function (initValue) {
    return fns.reduce((acc, curr) => {
      return curr(acc);
    }, initValue);
  };
}

const evaluateValue = pipe(addFive, subtractTwo, multiplyFour);
console.log(evaluateValue(5));
