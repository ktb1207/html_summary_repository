/**
 * 关于 ES6中class的学习总结
 * */

// 1.类的由来

// JavaScript 语言中，生成实例对象的传统方法是通过构造函数。
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。
// ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

/**
 * 总结：
 * 1.class 有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。
 * 2.也就是说，ES5 的构造函数Point，对应 ES6 的Point类的构造方法。
 * 3.类的所有方法都定义在类的prototype属性上面。
 * 4.在类的实例上面调用方法，其实就是调用原型上的方法
 * 5.类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式
 * 6.类不存在变量提升（hoist），这一点与 ES5 完全不同。
 * 7.类的方法内部如果含有this，它默认指向类的实例。
 * 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
 * 另一种解决方法是使用箭头函数。
 *
 *
 * 5.类的内部所有定义的方法，都是不可枚举的，这一点与 ES5 的行为不一致。
 * 6.类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。这一点与 ES5 的行为不一致。
 */

// 2.constructor 方法

// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
// constructor方法默认返回实例对象（即this）

// 3.取值函数（getter）和存值函数（setter）
// 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: ' + value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop;
// 'getter'

// 4.静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
// 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod(); // 'hello'

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function

/**
 * 总结：
 * 1.如果静态方法包含this关键字，这个this指的是类，而不是实例。这一点与非静态方法有区别，重视
 * 2.静态方法可以与非静态方法重名。
 * 3.父类的静态方法，可以被子类继承。
 *
 */
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {}

Bar.classMethod(); // 'hello'

// 5.静态属性--提案
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}

// 6.实例属性的新写法
// 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
// 定义在类的最顶层
class IncreasingCounter {
  _count = 0; // 定义在类顶层
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
