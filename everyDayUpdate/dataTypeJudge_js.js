/*
 * @Author: kongtb 
 * @Date: 2020-06-28 12:35:08 
 * @Last Modified by: kongtb
 * @Last Modified time: 2020-06-28 13:25:35
 */

/******
* 关于JS中数据类型判断知识点总结
*/  

// 1.typeof关键字
// 适用：基本类型判断
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object

// 解释说明：
// 空数组和null被typeof解释为object,有人认为typeof关键字对 数组和null 的类型判断是错误的，
// 其实typeof对于 数组和null的类型判断是正确的，只是不够精确而已！！！


// 2.instanceof关键字
// 概念：instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性；
// 意思：判断对象是否是某一数据类型（如Array）的实例，
// 重点关注一下是判断一个 对象 是否是数据类型的实例

console.log(2 instanceof Number);                    // false 因为2不是对象
console.log(true instanceof Boolean);                // false 因为true不是对象
console.log('str' instanceof String);                // false 因为str不是对象
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true

console.log(null instanceof Null) // error:null is not a constructor 浏览器认为null，undefined不是构造器
console.log(undefined instanceof undefined) // error:undefined is not a constructor 浏览器认为null，undefined不是构造器
console.log([] instanceof Object) // true 
console.log(function(){} instanceof Object)
// 解释说明：
// instanceof 不适用于检测基本类型值（string,number,boolean）和null及undefined


// 3.constructor 关键字
// 该属性返回对创建此对象的数组函数的引用，每个具有原型的对象都会自动获得constructor属性
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true

// 注意：
// 用costructor来判断类型看起来是完美的，然而，如果我创建一个对象，更改它的原型，这种方式将变得不可靠！！！
function Fn(){};
Fn.prototype=new Array();
var f=new Fn();
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true


// 4.Object.prototype.toString.call() --- 最精准
// 使用 Object 对象的原型方法 toString ，使用 call 进行狸猫换太子



/*****************************************分割线***********************************************/ 
// 1.判断对象是否为空对象
let obj = {}
// 1.JSON
if (JSON.stringify(obj) === '{}') {
  console.log('空对象！')
}
// 2.Object.keys(), es6方法会返回一个由一个给定对象的自身可枚举属性组成的数组

if (Object.keys(obj).length === 0) {
  console.log('空对象！')
}

// 3.循环

for (var i in obj) { 
  return true // 不为空
}
return false // 空对象

// 2.判断字符串是否为数字
let num = '3'
// 1.isNaN, null、空格以及空串会被按照0来处理

if ((!isNaN(num)) && num != null && num != '') {
  console.log('num为数字！')
}
// 2.正则
function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(regPos.test(val) || regNeg.test(val)) {
      return true;
  } else {
      return false;
  }
}