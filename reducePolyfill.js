const arr = [1,2,3,4,5]

const sum = arr.reduce((acc,curr) => acc+curr,0)
console.log('sum', sum)

// Polyfill for Reduce method

Array.prototype.myReduce = function(callback,initialValue) {
    if(typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }

    let acccumulator = initialValue ? initialValue : this[0]
    const startIndex = initialValue ? 0 : 1
    for(let i=startIndex;i<this.length;i++) {
        acccumulator = callback(acccumulator,this[i],i,this)
    }
    return acccumulator
}

const sumValue = arr.myReduce((acc,curr) => acc+curr,5)
console.log('Sum value', sumValue)