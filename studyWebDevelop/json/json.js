/*
//JSON��ֵ
	10
	"hello"
	true
	null
//��ͨ�����ʾ
var box={
	name:'lee',
	age:100,
};
alert(box.name);
//JSON�����ʾ
 '{"name":"lee","age":100}'	ps:json��ʵ����һ���ַ����������κα�ʾ��Ӧ�ü�������''
 //��ͨ����
var box = [100,'lee',true];
//JSON����
'[100,"lee",true]'	��ӵ����ű�ʾΪ�ַ���
//��õ�JSON�ṹ
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
//ģ�����JSON�����ַ����Ĺ��� var ajson=load('abc.json'); //��JSON���ؽ������Ҹ�ֵ��ajson����
	var ajson='[{"tittle":"a","num":1},{"tittle":"b","num":2},{"tittle":"c","num":3}]';
	//alert(ajson);	//[{"tittle":"a","num":1},{"tittle":"b","num":2},{"tittle":"c","num":3}]
	//alert( typeof ajson);  //string,�ַ�����������

//����JSON--parse()
	var json='[{"tittle":"a","num":1},{"tittle":"b","num":2},{"tittle":"c","num":3}]';
	var box=JSON.parse(json);
	//alert(box);	//����[object Object],[object Object],[object Object]
	alert(box[0].tittle);	//a

//���л�-��javascriptԭ��ֵת����JSON--stringify()
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
//stringify()�����Խ���������������ɸѡ����,�ڶ�����������һ��������ߺ���
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
//var json = JSON.stringify(box,['num','height']);	//����һ������ɸѡ
//alert(json);	//[{"num":1,"height":177},{"num":2,"height":188}],ɹѡ������û��"title":"b"
var json = JSON.stringify(box,function(key,value){	//����һ������
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
//��������������ʵ���Ű������,�ڶ�����������Ҫ�Ļ�Ϊnull 
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

//pares()ͬ����������������������stringify()����һ��



