/**
 * Generator 函数的语法
 * 
 * 简介：Generator 函数是 ES6 提供的一种异步编程解决方案
 * 
 * 理解：Generator 函数有多种理解角度
 * 1.首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
 * 
 * 2.Generator 函数除了状态机，还是一个遍历器对象生成函数。
 * 执行 Generator 函数会返回一个遍历器对象，
 * 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
 * 
 * 3.形式上，Generator 函数是一个普通函数，但是有两个特征
 * 一是，function关键字与函数名之间有一个星号；
 * 二是，函数体内部使用yield表达式，定义不同的内部状态
*/
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

/**
 * 4.Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
 * ****
 * 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，
 * 而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator）
 * 
 * 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
 * 
 * 也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，
 * 直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，
 * yield表达式是暂停执行的标记，而next方法可以恢复执行。
 * 
 * 
*/


/**
 * 
 * yield 表达式
 * 
 * 理解：yield表达式就是暂停标志
 * 
 * 遍历器对象的next方法的运行逻辑如下：
 * 
 * （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
 * （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
 * （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，
 * 作为返回的对象的value属性值。
 * 4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
 * 
 * 另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
 * 
*/


/***
 * yield表达式与return语句相似及区别
 * 
 * 相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
 * 
 * 区别：
 * 区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。
 * 
 * 一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。
 * 
 * 正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。
 * 
 * 
*/

/**
*for...of 循环 
*
*for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
*
**/
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5


/**
*
*Generator.prototype.throw()
*
*Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
*
*/
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b


/**
*
*Generator.prototype.return() 
*
*Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
*
*如果return方法调用时，不提供参数，则返回值的value属性为undefined。
*
*/
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }


/**
*
*next()、throw()、return() 的共同点
*
*next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。
*它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式
*
*
**/
// next()是将yield表达式替换成一个值。
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

// throw()是将yield表达式替换成一个throw语句。

// return()是将yield表达式替换成一个return语句。

/**
*Generator 函数也不能跟new命令一起用，会报错。
*
**/

/******************************************分割线*********************************************/

/**
*Generator应用
*
*Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。
**/

// 1）异步操作的同步化表达 
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()