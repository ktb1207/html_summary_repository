/*
//JSON简单值
	10
	"hello"
	true
	null
//普通对象表示
var box={
	name:'lee',
	age:100,
};
alert(box.name);
//JSON对象表示
 '{"name":"lee","age":100}'	ps:json其实就是一个字符串，所以任何表示都应该加上引号''
 //普通数组
var box = [100,'lee',true];
//JSON数组
'[100,"lee",true]'	外加单引号表示为字符串
//最常用的JSON结构
[
	{
		"title":"a",
		"num":1
	},{
		"title":"b",
		"num":2
	},{
		"title":"c",
		"num":3
	}
]
//模拟加载JSON数据字符串的过程 var ajson=load('abc.json'); //把JSON加载进来并且赋值给ajson变量
	var ajson='[{"tittle":"a","num":1},{"tittle":"b","num":2},{"tittle":"c","num":3}]';
	//alert(ajson);	//[{"tittle":"a","num":1},{"tittle":"b","num":2},{"tittle":"c","num":3}]
	//alert( typeof ajson);  //string,字符串数据类型

//解析JSON--parse()
	var json='[{"tittle":"a","num":1},{"tittle":"b","num":2},{"tittle":"c","num":3}]';
	var box=JSON.parse(json);
	//alert(box);	//返回[object Object],[object Object],[object Object]
	alert(box[0].tittle);	//a

//序列化-将javascript原生值转换成JSON--stringify()
	var box=[
		{
			title:'a',
			num:1
		},
		{
			title:'b',
			num:2	
		}
	];
	var json=JSON.stringify(box);
	alert(json);	//[{"title":"a","num":1},{"title":"b","num":2}]
//stringify()还可以接受两个参数用于筛选过滤,第二个参数接受一个数组或者函数
var box=[
		{
			title:'a',
			num:1,
			height:177
		},
		{
			title:'b',
			num:2,
			height:188
		},
		
	];
//var json = JSON.stringify(box,['num','height']);	//接受一个数组筛选
//alert(json);	//[{"num":1,"height":177},{"num":2,"height":188}],晒选出来的没有"title":"b"
var json = JSON.stringify(box,function(key,value){	//接受一个函数
	if(key=="title"){
		return "Mr."+value;
	}else{
		return value;
	}
});
alert(json);//[{"title":"Mr.a","num":1,"height":177},{"title":"Mr.b","num":2,"height":188}]
*/

var box=[
		{
			title:'a',
			num:1,
			height:177
		},
		{
			title:'b',
			num:2,
			height:188
		},
		
	];
//第三个参数用于实现排版和缩进,第二个参数不需要的话为null 
var json = JSON.stringify(box,null,2);
/*alert(json);[
  {
    "title": "a",
    "num": 1,
    "height": 177
  },
  {
    "title": "b",
    "num": 2,
    "height": 188
  }
]*/

//pares()同样接受另外两个参数，和stringify()方法一样



