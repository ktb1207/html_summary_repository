/**
 * Created by ktb on 17-8-8.
 */
//1.函数接收任意传参，不需要提前定义形参，只需在调用时直接传递函数实参---Array.prototype.slice.call()：

    function testArg(){
        var arg = Array.prototype.slice.call(arguments);
        for(var i=0;i<arg.length;i++){
            console.log(typeof arg[i]);
            if(typeof arg[i]=='undefined'){
                console.log("第"+i+"个为undefind:"+arg[i]);
            }else if(typeof arg[i]=='number'){                    //为数字
                console.log("第"+i+"个为数字:"+arg[i]);
            }else if(typeof arg[i]=='string'){              //为字符串
                console.log("第"+i+"个为字符串:"+arg[i]);
            }else if(typeof arg[i]=='function'){            //为函数
                console.log("第"+i+"个为函数:"+arg[i]());
            }else if(typeof arg[i]=='object'){              //对象，包括 null、数组、对象
                if(Array.isArray(arg[i])){
                    console.log("第"+i+"个为数组:"+arg[i]);
                }else if(arg[i].constructor == Object){
                    console.log("第"+i+"个为object:"+arg[i]);
                }
            }else{

            }
        }
    }

    function go(){
        return '执行传进来的函数';
    }

    testArg(1,2,3);
    testArg(456);
    testArg('welcome',789);
    testArg([7,8,'abc','efg']);
    testArg({name:"tom",age:20,sex:"male"});
    testArg(go);
    testArg(undefined);
    testArg(456,'englsh',[7,8,9,],go,{name:"jim",school:'middle'});

//2.更高级判断数据类型---Object.prototype.toString.call()：

    console.log(Object.prototype.toString.call(123))            //[object Number]
    console.log(Object.prototype.toString.call('123'))          //[object String]
    console.log(Object.prototype.toString.call(undefined))      //[object Undefined]
    console.log(Object.prototype.toString.call(true))           //[object Boolean]
    console.log(Object.prototype.toString.call({}))             //[object Object]
    console.log(Object.prototype.toString.call([]))             //[object Array]
    console.log(Object.prototype.toString.call(function(){}))   //[object Function]
    console.log(Object.prototype.toString.call(null))           //[object Null]

    //判断是否为函数

    function isFunction(it) {
        return Object.prototype.toString.call(it) === '[object Function]';
    }

    //判断是否为数组：

    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

 //3.typeof
    var a_string = 'abc';
    var a_num = 123;
    var a_und = undefined;
    var a_null = null;
    var a_bool = true;
    function afun(){

    }
    var arr = [];
    var person = new Object();
    var child = new afun();
    console.log('字符串使用typeof返回值'+typeof a_string);
    console.log('数字使用typeof返回值'+typeof a_num);
    console.log('undefined使用typeof返回值'+typeof a_und);
    console.log('null使用typeof返回值'+typeof a_null);
    console.log('布尔值使用typeof返回值'+typeof a_bool);
    console.log('函数使用typeof返回值'+typeof afun);
    console.log('数组使用typeof返回值'+typeof arr);
    console.log('object使用typeof返回值'+typeof person);
 //4.instanceof
    console.log(person instanceof Object);
    console.log(arr instanceof Object);
    console.log(arr instanceof Array);
 //5.constructor
    console.log(arr.constructor);
    console.log(person.constructor);
    console.log(child.constructor);
    
    for(var i=0;i<=5;i++){
    	setTimeout(function(){
    		console.log(i);
    	},1000)
    }
