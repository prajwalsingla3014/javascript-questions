//  Implement n async tasks in parallel

const createAsyncTask = () => {
  const value = Math.floor(Math.random() * 10);
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

const task1 = createAsyncTask();
const task2 = createAsyncTask();
const task3 = createAsyncTask();
const task4 = createAsyncTask();
const task5 = createAsyncTask();
const task6 = createAsyncTask();

const tasksList = [task1, task2, task3, task4, task5, task6];

const asyncParallel = (tasks, callback) => {
  const results = [];
  const errors = [];
  let completed = 0;
  tasks.forEach((task) => {
    task
      .then((val) => {
        results.push(val);
      })
      .catch((error) => {
        errors.push(error);
      })
      .finally(() => {
        completed++;
        if (completed >= tasks.length) {
          callback(errors, results);
        }
      });
  });
};

asyncParallel(tasksList, (error, result) => {
  console.error("Error: ", error);
  console.log("Result: ", result);
});
