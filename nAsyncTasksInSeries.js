//  Implement n async tasks in series

const createAsyncTask = () => {
  const value = Math.floor(Math.random() * 10);
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value > 5) {
          resolve(value * 1000);
        } else {
          reject(`Error: ${value}`);
        }
      }, value * 1000);
    });
  };
};

const task1 = createAsyncTask();
const task2 = createAsyncTask();
const task3 = createAsyncTask();
const task4 = createAsyncTask();
const task5 = createAsyncTask();
const task6 = createAsyncTask();

const tasksList = [task1, task2, task3, task4, task5, task6];

const asyncSequence = async (tasksList, callback) => {
  const results = [];
  const errors = [];
  for (let task of tasksList) {
    try {
      const promise = task();
      const result = await promise;
      console.log(result);
      results.push(result);
    } catch (error) {
      console.log(error);
      errors.push(error);
    }
  }
  callback(results, errors);
};

asyncSequence(tasksList, (results, errors) => {
  console.log("Errors ", errors);
  console.log("Results ", results);
});
