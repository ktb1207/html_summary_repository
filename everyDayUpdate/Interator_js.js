/**
*
*关于Iterator（遍历器）的概念
*
*背景：
*
*JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。
*这样就需要一种统一的接口机制，来处理所有不同的数据结构。
*
*
*遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
*任何数据结构只要部署 Iterator 接口，就可以完成遍历操作
*
*
*
**/

/**
*
*1.Iterator 的遍历过程：
*
*（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
*
*（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
*
*（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
*
*（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
*
*/




/**
*
*2.默认 Iterator 接口
*
*Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环
*
*一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”
*
*ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性
*
*Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
*
***************************************重点注意***************************************
*对象（Object）没有默认部署 Iterator 接口
*是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。
*本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。
*
*
*对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function
*
**/



/**
*
*关于for...of和for...in的使用
*
*1.JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}
*上面代码表明，for...in循环读取键名，for...of循环读取键值。
*
*
*2.对于普通的对象，for...of结构不能直接使用，会报错，for...in循环依然可以用来遍历键名。
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function
*
**/