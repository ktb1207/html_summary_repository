/**
*
* ES Proxy
*
* 说明：Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，
* 都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
*
*/

// 1.ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
// var proxy = new Proxy(target, handler);

var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2

// 2.如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

/************************************分割线******************************************/

// Proxy 实例的方法

//1. get()
// get方法用于拦截某个属性的读取操作
// 接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），
// 其中最后一个参数可选。

//2. set()
// set方法用来拦截某个属性的赋值操作
// 接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

//3.apply()
// apply方法拦截函数的调用、call和apply操作。

//4. has()
// has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。