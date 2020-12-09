/**
 * Symbol
 * */ 

/**
 * 产生背景：ES5 的对象属性名都是字符串，这容易造成属性名的冲突；从根本上防止属性名的冲突，
 *          保证每个属性的名字都是独一无二的，这就是 ES6 引入Symbol的原因。
 * */ 
/**
 * 概述：
 *     ES6 引入了一种新的 原始数据类型 Symbol，表示独一无二的值；
 *    它是 JavaScript 语言的第七种数据类型
 *    前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
 * */ 

// 1.创建:--- Symbol 值通过Symbol函数生成
let s = Symbol();
typeof s // "symbol"

/**
 * 注意：
 *    Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象
 * */ 

// 2.参数---Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，
// 或者转为字符串时，比较容易区分。
let s1 = Symbol('foo');
let s2 = Symbol('bar');
console.log(s1) // Symbol(foo)
console.log(s2) // Symbol(bar)

// 3.参数对象---
// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
let obj = {
  name: 'tom',
  sey: function () {
    return this.name
  }
}
let s3 = Symbol(obj)
console.log(s3) // Symbol([object Object])

/**
 * 注意事项
 * 
 * Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
*/
// a.无参数
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false
// b.有参数
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
/**
 * 注意事项
 * 
 * Symbol 值不能与其他类型的值进行运算，会报错。
 * 
*/
let sym = Symbol('My symbol');
"your symbol is " + sym // // TypeError: can't convert symbol to string

/**
 * 注意事项
 * 
 * Symbol 值可以显式转为字符串。Symbol 值也可以转为布尔值，但是不能转为数值。
 * 
*/
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

let sym = Symbol();
Boolean(sym) // true

/*******************************分割线*********************************/ 
// 1.Symbol.prototype.description
// ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
const sym = Symbol('foo');

sym.description // "foo"

// 2.作为属性名的 Symbol 
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

/**
 * 注意：Symbol 值作为对象属性名时，不能用点运算符。
 * 因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，
 * 导致a的属性名实际上是一个字符串，而不是一个 Symbol 值
 * */ 
a.mySymbol = 'word'
a[mySymbol] // undefined

/***************************************分割线****************************************/ 

// 1.属性名的遍历
/**
 * Symbol 作为属性名，遍历对象的时候
 * 该属性不会出现在for...in、for...of循环中，
 * 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
 * 
 * 但是
 * 它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名；
 * 该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
 * */ 


// 2.Symbol.for()
// 使用场景：有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点
/**
 * 使用：
 * 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
 * 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
 * 
 * */ 
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

/**
 * Symbol.for()与Symbol()区别：
 * 
 * 相同：Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。
 * 区别：前者会被登记在全局环境中供搜索，后者不会。
 *      Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，
 *      而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
 * 
 * */ 


// 3.Symbol.keyFor()
// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined 变量s2属于未登记的 Symbol 值，所以返回undefined。
