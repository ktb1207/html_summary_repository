/*
����ʽ��װ
	function getId(id){
		return document.getElementById(id);
	}
����
	alert(getId('box').innerHTML);

*/

/*
�����Ƿ�װ�������
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
����
	alert(Base.getId('box').innerHTML);
	alert(Base.getName('sex')[0].value);
	alert(Base.getTagName('p')[0].innerHTML);
*/


	function getId(id){
		return document.getElementById(id);
	}

	

