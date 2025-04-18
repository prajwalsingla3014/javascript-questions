/*
    The call method in JavaScript is used to invoke a function with
    a specified this context and arguments individually. It accepts
    the context object as the first argument followed by individual arguments.
*/


const car = {
    color: 'Black',
    model: 'BMW'
}

function purchaseCar(currency,price) {
    console.log(`I have purchased ${this.color} - ${this.model} car for ${currency}${price}`)
}

// Call Method Provided by JS
purchaseCar.call(car,'Rs',7000000)

// Polyfill for Call Method

Function.prototype.myCall = function(context,...args) {
    if(typeof this !== 'function') {
        throw new TypeError('myCall must be called on a function')
    }

    context = context !== undefined && context !== null ? Object(context) : globalThis
    const uniqueSymbol = Symbol()
    context[uniqueSymbol] = this;
    const result = context[uniqueSymbol](...args)
    delete context[uniqueSymbol]
    return result
}

purchaseCar.myCall(car,'Rs',6000000)