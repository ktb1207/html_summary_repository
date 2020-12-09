/**
 * 关于js 类型转换
 * */ 

/**
 * 一
 * js 的自动装箱：自动装箱就是临时创建一个包装对象，将原始类型的值封装起来，以便调用包装对象的函数。
 * 
 * */ 
var str = 'I am str';
str.toUpperCase();
/**
 * string是原始类型，但为什么我们好像可以调用“string的函数”呢？
 * 因为：原因是js标准库给boolean、number、string分别提供了一个包装对象：Boolean、Number 、String 。
 * 在需要的时候，原始类型会自动转换成相应的包装对象（这个过程叫自动装箱）。
 * */ 

/**
 * 二
 * 两个与类型转换有关的函数：valueOf()和toString()
 * valueOf()：返回这个对象逻辑上对应的原始类型的值
 * toString()：返回这个对象的字符串表示。用一个字符串来描述这个对象的内容。
 * ------valueOf()和toString()是定义在Object.prototype上的方法，也就是说，所有的对象都会继承到这两个方法。
 * */ 

/**
 * valueOf()：的行为
 * 
 * Object.valueOf():返回对象本身（对象类型）。如果自定义对象没有重写valueOf方法，就会使用它。
 * Array.valueOf():返回数组本身（对象类型）
 * Function.valueOf():函数本身（对象类型）。
 * Date.valueOf:返回从 UTC 1970 年 1 月 1 日午夜开始计算，到所封装的日期所经过的毫秒数（原始类型）。
 * Number.valueOf():数字值（原始类型）。
 * Boolean.valueOf():返回布尔值（原始类型）
 * String.valueOf():返回字符串值（原始类型）。
 * 
 * 由上表可见，valueOf()虽然期望返回原始类型的值，
 * 但是实际上有一些对象在逻辑上无法找到与之对应的原始值，因此只能返回对象本身。
 * */ 

/**
 * toString():的行为
 * 不管什么对象，我们总有办法“描述”它，因此js内置对象的toString()总能返回一个原始string类型的值。
 * object.toString:[object Object]
 * Array.toString:返回数组的字符串类型
 * Function.toString():返回函数字符串表示
 * Date.toString:返回时间字符串："Fri Apr 21 2017 14:54:04 GMT+0800 (中国标准时间)"
 * Number.toString():字符串值（原始类型）。
 * Boolean.toString:字符串（原始类型）
 * String.valueOf():返回字符串值（原始类型）。
 * */ 

/**
 * 三
 * js 类型转换可分为：1.隐式类型转换(自动类型转换) 2.显式类型转换(强制类型转换)
 * *********隐式类型转换(自动类型转换)：
 * 当js期望得到某种类型的值，而实际在那里的值是其他的类型，就会发生隐式类型转换。
 * 系统内部会自动调用我们前面说ToBoolean ( argument )、ToNumber ( argument )、ToString ( argument )，尝试转换成期望的数据类型。 
 * 
 * ********显式类型转换（强制类型转换）
 * 程序员显式调用Boolean(value)、Number(value)、String(value)完成的类型转换，叫做显示类型转换。
 * */ 


/**
 * 四
 * js中==的类型转换
 * 
 * 1.首先，要记住**null == undefined**始终为true，这个暂时没有道理可言，记住就好了。
 * 2.首先看==前后有没有NaN，有的话都是返回false。NaN不等于任何值，包括其本身。
 * 3.布尔值会转成数字类型，true转成1，false转成0。
 * true == 1 // true
 * false == 0 // true
 * true == 2 // false
 * 4.数字和字符串比较，字符串会转换成数字。
 * "123" == 123; // true
 * "0" == 0; // true
 * "1a" == 1; // false，"1a"转成数字是NaN
 * 5.undefined和null除了和undefined或null相等，和其他相比都是false
 * undefined == undefined; // true
 * undefined == false; // true
 * undefined == 0; // false
 * 6.数字或者字符串和对象相比，对象使用valueOf()或者toString()方法转换。
 * 7.==等于运算符将原始值和其包装对象视为相等，但===全等运算符将它们视为不等。
 * */ 