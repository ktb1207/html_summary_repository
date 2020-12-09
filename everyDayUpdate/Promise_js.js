/**
*Promise 的含义
*
*1.Promise 是异步编程的一种解决方案
*传统解决方案：回调函数和事件
*
*
*2.Promise对象有以下两个特点。
*
*（1）对象的状态不受外界影响。
* promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
*
* 2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
*
*
*3.有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
*/


/**
*
*Promise基本用法
*
*1.ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
* const promise = new Promise(function(resolve,reject){})
* Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数.
*
* resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（
*
*reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”
*
*
*
*
* 2.Promise 新建后就会立即执行。
*
*
* 3.调用resolve或reject并不会终结 Promise 的参数函数的执行。

new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
//2
//1
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。
这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
*
**/


/**
*
*4.Promise.prototype.then()
*
*Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的
*
*then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
*因此可以采用链式写法，即then方法后面再调用另一个then方法。

getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});


**/


/**
*
*5.Promise.prototype.catch() 
*
*Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，
*用于指定发生错误时的回调函数。
*
*
*跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，
*Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
*
*
*
*
*/


/**
*
*6.Promise.prototype.finally() 
*
*
*finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
*
**/


/**
*
*7.Promise.all()
*
*Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
* const p = Promise.all([p1, p2, p3]);
*
*Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，
*就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
*
*
*
*p的状态由p1、p2、p3决定，分成两种情况。
*
*1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，
*传递给p的回调函数。
*
*
*2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，
*会传递给p的回调函数。
*
**/


/**
*8.Promise.race()
*
*Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
*
*const p = Promise.race([p1, p2, p3]);
*
*Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，
*就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
*
*只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
*那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
*
*
*
**/



/**
*
*
*9.Promise.allSettled()
*
*const p = Promise.allSettled([p1, p2, p3]);
*
*
*Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
*
*只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。
*
*
*
**/


/**
*
*10.Promise.any() 
*
*Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
*
*只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
*
*如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
*
*
*Promise.any()抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。
*
*它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误。
*
**/



/**
*11.Promise.resolve()
*将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
*
*Promise.resolve('foo')
*
*等价与
*
*new Promise(resolve => resolve('foo'))
*
*Promise.resolve方法的参数分成四种情况。
*
*1.参数是一个 Promise 实例
*如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
*
*2.参数是一个thenable对象
*Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
*
*
*3.参数不是具有then方法的对象，或根本就不是对象
*如果参数是一个原始值，或者是一个不具有then方法的对象，
*则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
*
*
*
*
*4.不带有任何参数
*Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
*
*
**/


/**
*
*12.Promise.reject() 
*
*Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
*
*注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
*这一点与Promise.resolve方法不一致。
*
*/

