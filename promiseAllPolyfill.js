/*
    Promise.all is a helper function provided by javascript to handle
    multiple promises at once, in parallel, and get results in single array.
    If any promise is rejected it will return rejected promise if all are
    fulfilled it returns array of fulfilled promises
*/


const promiseVal = Promise.all([Promise.resolve(1),new Promise(resolve => setTimeout(() => resolve(2),1000)),Promise.reject(3)])
promiseVal.then(data => console.log('Resolved with ', data)).catch(err => console.log('Rejected with ', err))

// Polyfill for Promise.all

Promise.myAll = function(promiseArr) {
    const result = []
    let totalResolved = 0;
    return new Promise((resolve,reject) => {
        promiseArr.forEach((promise,index) => {
            Promise.resolve(promise).then(data => {
                result[index] = data
                totalResolved++
                if(totalResolved === promiseArr.length) {
                    resolve(result)
                }
            }).catch(error => {
                reject(error)
            })
        })
    })
}

const promiseValue = Promise.myAll([Promise.resolve(1),new Promise(resolve => setTimeout(() => resolve(2),1000)),Promise.resolve(3)])
promiseValue.then(value => console.log('Resolved with ', value)).catch(err => console.log('Rejected with ', err))

