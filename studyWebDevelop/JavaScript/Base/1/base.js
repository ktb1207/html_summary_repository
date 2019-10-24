/*
函数式封装
	function getId(id){
		return document.getElementById(id);
	}
调用
	alert(getId('box').innerHTML);

*/

/*
对象是封装方便管理
	var Base={
		getId:function(id){
			return document.getElementById(id);	
		},
		getName:function(name){
			return document.getElementsByName(name);
		},
		getTagName:function(tag){
			return document.getElementsByTagName(tag);
		},
	};
调用
	alert(Base.getId('box').innerHTML);
	alert(Base.getName('sex')[0].value);
	alert(Base.getTagName('p')[0].innerHTML);
*/


	function getId(id){
		return document.getElementById(id);
	}

	

