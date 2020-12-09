
/**
 * 关于js模块化方案
 * AMD、CMD、CommonJs、ES6的对比
 * */ 

/**
 * 浏览器传统加载方法：
 * 1.页面内嵌的脚本
 * <script type="application/javascript">
 * 
 * </script>
 * 
 * 2.外部脚本
 * <script type="application/javascript" src="path/to/myModule.js"></script>
 * 
 * 默认情况下，浏览器同步加载JavaScript脚本，即渲染引擎遇到<script>标签就会停下来，等到脚本执行完毕再继续向下渲染。
 * 如果是外部脚本，还必须加入脚本下载的时间。
 * 
 * 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”
 * 
 * 3.defer和sync--异步脚本加载
 * 渲染引擎遇到这一行命令就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。
 * 
 * defer与async的区别是，前者要等到整个页面正常渲染结束才会执行，
 * 而后者一旦下载完成，渲染引擎就会中断渲染，执行这个脚本以后再继续渲染。
 * 
 * defer是“渲染完再执行”，async是“下载完就执行”。
 * 
 * 如果有多个defer脚本，则会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
 * 
 * 
 * 4.浏览器加载ES6模块
 * 浏览器加载ES6模块时也使用<script>标签，但是要加入type=”module”属性。
 * <script type="module" src="foo.js"></script>
 * 
 * 对于带有type=”module”的<script>，浏览器都是异步加载的，不会造成浏览器堵塞，
 * 即等到整个页面渲染完再执行模块脚本，等同于打开了<script>标签的defer属性。
 * 
 * 
 * 注意：
 * 对于外部的模块脚本（上例是foo.js），有几点需要注意。
 * a.代码是在模块作用域之中运行，而不是在全局作用域中运行。模块内部的顶层变量是外部不可见的。
 * b.模块脚本自动采用严格模式，无论有没有声明use strict。
 * c.模块之中可以使用import命令加载其他模块,也可以使用export命令输出对外接口。
 * d.在模块之中，顶层的this关键字返回undefined，而不是指向window
 * e.同一个模块如果加载多次，将只执行一次。
*/



/**
 * AMD、CMD、CommonJs、ES6区别：
 * 
 * 他们都是用于在模块化定义中使用的，AMD、CMD、CommonJs是ES5中提供的模块化编程的方案，
 * import/export是ES6中定义新增的
 * */ 

/**
 * 1.AMD-异步模块定义
 * AMD是RequireJS在推广过程中对模块定义的规范化产出，它是一个概念，RequireJS是对这个概念的实现
 * 
 * AMD是一个组织，RequireJS是在这个组织下自定义的一套脚本语言
 * 
 * RequireJS：是一个AMD框架，可以异步加载JS文件,----依赖前置
 * 通过define()函数定义，第一个参数是一个数组，里面定义一些需要依赖的包，
 * 第二个参数是一个回调函数，通过变量来引用模块里面的方法，最后通过return来输出。
 * 
 * define(['lib/jquery.js', 'package/lib'],function(jquery,lib){
 *    function foo() {
 *      console.log(jquery)
 *    }
 * 
 *    return {
 *      foo:foo
 *    }
 * 
 * })
 * */ 

/**
 * 2.CMD--同步模块定义
 * CMD---是SeaJS在推广过程中对模块定义的规范化产出，是一个同步模块定义，是SeaJS的一个标准，
 * SeaJS是CMD概念的一个实现，SeaJS是淘宝团队提供的一个模块开发的js框架.-----没有依赖前置
 * 
 * 通过define()定义，没有依赖前置，通过require加载jQuery插件，
 * CMD是依赖就近，在什么地方使用到插件就在什么地方require该插件，
 * 即用即返，这是一个同步的概念
 * 
 * 
 * define(function(require,exports,module){
 *    // 通过require引入依赖
 *    var $ = require('jquery');
 * })
 * 
 * 
 * */ 


/**
 * 3.CommonJS规范---是通过module.exports定义的
 * 
 * 在前端浏览器里面并不支持module.exports,通过node.js后端使用的。
 * 
 * Nodejs端是使用CommonJS规范的
 * 
 * 前端浏览器一般使用AMD、CMD、ES6等定义模块化开发的
 * 
 * 输出方式有2种：默认输出---module export  和带有名字的输出---exports.area
 * */ 

/**
 * 4.ES6模块化---export/import对模块进行导出导入的
 * 
 * ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
 * CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
 * 
*/

/**
 * 5.ES6模块与CommonJS模块的差异
 * 
 * a.CommonJS模块输出的是一个值的复制，ES6模块输出的是值的引用。
 * b.CommonJS模块是运行时加载，ES6模块是编译时输出接口。
 * 第二个差异是因为CommonJS加载的是一个对象（即module.exports属性），该对象只有在脚本运行结束时才会生成。
 * 而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
 * 
 * 
 * commonjs输出的是值的复制：
 * CommonJS模块输出的是值的复制，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
 * 
 * ES6模块的运行机制与CommonJS不一样：
 * JS引擎对脚本静态分析的时候，遇到模块加载命令import就会生成一个只读引用。
 * 等到脚本真正执行时，再根据这个只读引用到被加载的模块中取值。
 * 因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
 * 
 * 
 * ES6模块之中，顶层的this指向undefined，CommonJS模块的顶层this指向当前模块，这是两者的一个重大差异。
 * */ 


/**
 * 
 * 6.Node对es6模块的处理
 * Node对ES6模块的处理比较麻烦，因为它有自己的CommonJS模块格式，与ES6模块格式是不兼容的。
 * 
 * 目前的解决方案是，将两者分开，ES6模块和CommonJS采用各自的加载方案。
 * 在静态分析阶段，一个模块脚本只要有一行import或export语句，Node就会认为该脚本为ES6模块，否则就为CommonJS模块。
 * 
 * 如果不指定绝对路径，Node加载ES6模块会依次寻找以下脚本
 * 
 * 带有路径
 * import './foo';
 * // 依次寻找
 * //   ./foo.js
 * //   ./foo/package.json
 * //   ./foo/index.js
 * 
 * 不带路径
 * import 'baz';
 * // 依次寻找
 * //   ./node_modules/baz.js
 * //   ./node_modules/baz/package.json
 * //   ./node_modules/baz/index.js
 * // 寻找上一级目录
 * 
 * 
 * import命令加载CommonJS模块
 * Node采用CommonJS模块格式，模块的输出都定义在module.exports属性上面。
 * 在Node环境中，使用import命令加载CommonJS模块，Node会自动将module.exports属性当作模块的默认输出，
 * 即等同于export default。
 * // a.js
    module.exports = {
      foo: 'hello',
      bar: 'world'
    };
    // 等同于
    export default {
      foo: 'hello',
      bar: 'world'
    };
 * 
 *
 *
 *
 * require命令加载ES6模块
 *
 * 采用require命令加载ES6模块时，ES6模块的所有输出接口都会成为输入对象的属性。
    
  // es.js
  let foo = {bar:'my-default'};
  export default foo;
  foo = null;

  // cjs.js
  const es_namespace = require('./es');
  console.log(es_namespace.default);
  // {bar:'my-default'}

default接口变成了es_namespace.default属性。另外，由于存在缓存机制，es.js对foo的重新赋值没有在模块外部反映出来。


*/

/*********************************分割线************************************/  

/**
****循环加载
* 循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。
*/
// a.js
var b = require('b');
// b.js
var a = require('a');

// 循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现这种现象。

// 对于JavaScript语言来说，目前最常见的两种模块格式CommonJS和ES6在处理“循环加载”时的方法是不一样的，
// 返回的结果也不一样。

/***
*
*****CommonJS模块的加载原理

CommonJS的一个模块就是一个脚本文件。require命令第一次加载该脚本时就会执行整个脚本，然后在内存中生成一个对象。
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
*上面的代码就是Node内部加载模块后生成的一个对象。
*该对象的id属性是模块名，
*exports属性是模块输出的各个接口
*loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。
*
*
*以后需要用到这个模块时就会到exports属性上面取值。
*
*即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值
*
*也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，
*以后再加载时就返回第一次运行的结果，除非手动清除系统缓存。
*
*
**/ 

/*******
*
******CommonJS模块的循环加载
*
*
*CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候就会全部执行。
*一旦出现某个模块被“循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。
*****/

/***
*
******ES6模块的循环加载
*
*
*ES6处理“循环加载”与CommonJS有本质的不同。
*ES6模块是动态引用，如果使用import从一个模块中加载变量（即import foo from ‘foo’），
*那么，变量不会被缓存，而是成为一个指向被加载模块的引用
*
例子

  // a.js如下
  import {bar} from './b.js';
  console.log('a.js');
  console.log(bar);
  export let foo = 'foo';

  // b.js
  import {foo} from './a.js';
  console.log('b.js');
  console.log(foo);
  export let bar = 'bar';

  说明：
  a.js加载b.js，b.js又加载a.js，构成循环加载。------执行a.js

  由于a.js的第一行是加载b.js，所以先执行的是b.js。

  而b.js的第一行又是加载a.js，这时由于a.js已经开始执行，

  所以不会重复执行，而是继续执行b.js，因此第一行输出的是b.js。

  接着，b.js要打印变量foo，这时a.js还没有执行完，取不到foo的值，因此打印出来的是undefined

  b.js执行完便会开始执行a.js，这时便会一切正常。

  结果：
  
  b.js
  undefined
  a.js
  Bar


*/ 


