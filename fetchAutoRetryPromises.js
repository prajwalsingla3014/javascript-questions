// Implement Auto Retry Promises

/*
    Implement a fetchWithAutoRetry function which will automatically retry
    to fetch when error occurs until the maximum retry limit is reached.
*/

function fetchWithAutoRetry(fetchData, retryLimit) {
  return new Promise((resolve, reject) => {
    (function retryFetch() {
      fetchData()
        .then((data) => resolve(data))
        .catch((err) => {
          if (retryLimit-- > 0) {
            retryFetch();
          } else {
            reject(err);
          }
        });
    })();
  });
}

const fetchData = () => {
  let count = 0;
  return () => {
    if (count++ === 4) {
      return Promise.resolve("Data Successfull");
    } else {
      return Promise.reject("Data Rejected");
    }
  };
};

fetchWithAutoRetry(fetchData(), 3).then(console.log).catch(console.log);
fetchWithAutoRetry(fetchData(), 5).then(console.log).catch(console.log);
