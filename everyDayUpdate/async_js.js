/**
*async 函数
*含义：ES2017 标准引入了 async 函数，使得异步操作变得更加方便
*
*async 函数是什么？一句话，它就是 Generator 函数的语法糖。
*
*（1）async函数就是将 Generator 函数的星号（*）替换成async
*（2）将yield替换成await
*
*
*async函数对 Generator 函数的改进，体现在以下四点：
*
*（1）内置执行器。
* Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
* 也就是说，async函数的执行，与普通函数一模一样，只要一行。
*
* （2）更好的语义。
* async和await，比起星号和yield，语义更清楚了
*
* （3）更广的适用性。
* co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
* 而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
**
* 
* （4）返回值是 Promise。
*
*  async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便
**/


/**
*
*2.基本用法
* 
*async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
*当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
*
*/

/**
*
*3.语法
*
*返回 Promise 对象
*
*async函数返回一个 Promise 对象。
*async函数内部return语句返回的值，会成为then方法回调函数的参数。
*
*
*
*/
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

/**
*Promise 对象的状态变化
*
*async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变
*
*除非遇到return语句或者抛出错误
*
*
**/
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)

// 上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，
// 才会执行then方法里面的console.log。


/**
*await 命令
*正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。
*如果不是 Promise 对象，就直接返回对应的值。
*
*
**/


/**
*任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
*
**/
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

/**
*有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
* 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
*
**/
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world



/**
*4.使用注意点
*
* 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，
*所以最好把await命令放在try...catch代码块中。
*
*
*
*第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
*
*
*第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。
*
**/
// 单个触发
let foo = await getFoo();
let bar = await getBar();

// 并发
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);



/**
*
*5.第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。
*
*async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
*
*/