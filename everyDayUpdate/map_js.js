/**
* ES6--map
* 说明：JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
*
* 含义：ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，
*       各种类型的值（包括对象）都可以当作键。
*
**/
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true


//1.作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

//2.Map构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
  ['name', '张三'],
  ['title', 'Author']
];
const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);

// 3.如果对同一个键多次赋值，后面的值将覆盖前面的值。
const map = new Map();
map.set(1, 'aaa');
map.set(1, 'bbb');
map.get(1) // "bbb"

// 4.如果读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf'); // undefined

/**************************************分割线**************************************************/

// map 实例的属性和操作方法

// 1.size 属性-----size属性返回 Map 结构的成员总数。
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size; // 2

// 2.set(key, value)---
// set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
const m = new Map();
m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

//3.set方法返回的是当前的Map对象，因此可以采用链式写法。
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

//4. get(key)---get方法读取key对应的键值，如果找不到key，返回undefined。

const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

// 5.has(key)---has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

// 6.delete(key)---delete方法删除某个键，返回true。如果删除失败，返回false。

//7.clear()---clear方法清除所有成员，没有返回值。

/*******************************分割线**********************************************/

// 遍历方法--Map 结构原生提供三个遍历器生成函数和一个遍历方法
// **  Map 的遍历顺序就是插入顺序。

//1.Map.prototype.keys()：返回键名的遍历器。
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

//2.Map.prototype.values()：返回键值的遍历器。

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

///3.Map.prototype.entries()：返回所有成员的遍历器。

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

/**************************************分割线****************************************/

// 与其他数据结构的互相转换

//1. Map 转为数组
// Map 转为数组最方便的方法，就是使用扩展运算符（...）。
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);

[...myMap];
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

[...myMap.keys(), ...myMap.values()]

// 2.数组 转为 Map
// 将数组传入 Map 构造函数，就可以转为 Map。
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])

//3.Map 转为对象
// 如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)

// 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

// 4.对象转为 Map
// 对象转为 Map 可以通过Object.entries()。
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

// 5. Map 转为 JSON
// Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)

// 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

// 6.JSON 转为 Map
// JSON 转为 Map，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}


/*******************************************分割线****************************************************/

// WeakMap

// WeakMap结构与Map结构类似，也是用于生成键值对的集合。

// WeakMap与Map的区别有两点。

// 1.首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。

// 2.其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
