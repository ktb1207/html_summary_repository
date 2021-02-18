### 关于js中浅拷贝和深拷贝的总结：
---
**[一、为何存在浅拷贝和深拷贝？]()**
Javascript中存在两大数据类型：
- 基本类型
- 引用类型

基本类型的数据保存在栈内存中
引用类型的数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的**引用指针**，存在栈中。

**[二、浅拷贝]()**
浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝；
如果属性是基本类型，拷贝的就是基本类型的值；
如果属性是引用类型，拷贝的是栈中指向引用类型数据的引用指针；
即浅拷贝是拷贝一层；
深层次的引用类型则共享内存地址；

##### 浅拷贝简单实现如下：

```js
function shallowClone(obj) {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
```

##### 在Javascript中，存在浅拷贝的现象有：
- [Object.assign]()
- [Array.prototype.slice()]()
- [Array.prototype.concat]()
- [使用拓展运算符实现的复制]()
注：以上的方法即浅拷贝，但是如果源数据第一层为基本类型值，则相当于深拷贝

Object.assign
```js
var obj = {
    age: 18,
    nature: ['smart', 'good'],
    names: {
        name1: 'fx',
        name2: 'xka'
    },
    love: function () {
        console.log('fx is a great girl')
    }
}
var newObj = Object.assign({}, fxObj);
// 第一层为基本类型值
newObj.age = 20;
console.log(obj) // {age: 18, nature: Array(2), names: {…}, love: ƒ}
console.log(newObj) // {age: 20, nature: Array(2), names: {…}, love: ƒ}
// 第一层为深拷贝
newObj.nature = 'str';
console.log(obj) // {age: 18, nature: Array(2), names: {…}, love: ƒ}
console.log(newObj) // {age: 20, nature: 'str', names: {…}, love: ƒ}
```

**[三、深拷贝]()**
深拷贝开辟一个新的栈，两个对象属性完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

##### 常见的深拷贝方式有：
- [_.cloneDeep()]()
```js
const _ = require('lodash');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```
- [jQuery.extend()]()
```js
const $ = require('jquery');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f); // false
```
- [JSON.stringify()]()
```js
const obj2=JSON.parse(JSON.stringify(obj1));
// 但是这种方式存在弊端，会忽略undefined、symbol和函数
const obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```
- [手写循环递归]()
```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```


