$(function(){
	//解决引入Zepto和jQuery的冲突
	var $q = jQuery.noConflict(); 	
	
	/*demo1 jquery阻止事件冒泡*/
	$q(".demo1").on("click",function(){
		var td = $q(this);
		var val = td.attr("value");
		if(val=="on"){
			td.css("background-color","#666666");
			td.attr("value","off");
		}else{
			td.css("background-color","#ffffff");
			td.attr("value","on");
		}
		
	});
	$q(".demo1-child").on("click",function(e){
		var td = $q(this);
		var val = td.attr("value");
		if(val=="on"){
			td.css("background-color","#008000");
			td.attr("value","off");
		}else{
			td.css("background-color","#333333");
			td.attr("value","on");
		}
		window.event? window.event.cancelBubble = true : e.stopPropagation();					//兼容
		//return false;					//javascript的return false只会阻止默认行为，而是用jQuery的话则既阻止默认行为又防止对象冒泡。
	});
	
	/*demo2 zepto阻止事件冒泡*/
	$(".demo2").on("tap",function(){
		var td = $(this);
		var val = $(this).attr("value");
		if(val=="on"){
			td.css("background-color","#008000");
			td.attr("value","off");
		}else{
			td.css("background-color","#ffffff");
			td.attr("value","on");
		}
	})
	
	$(".demo2-child").on("tap",function(e){
		var td = $(this);
		var val = td.attr("value");
		if(val=="on"){
			td.css("background-color","#333333");
			td.attr("value","off");
		}else{
			td.css("background-color","#008000");
			td.attr("value","on");
		}
		window.event? window.event.cancelBubble = true : e.stopPropagation();					//兼容
		//return false;					//javascript的return false只会阻止默认行为，而是用jQuery的话则既阻止默认行为又防止对象冒泡。
	})
	
	/*demo4阻止默认行为*/
	$("#sub").submit(function(e){
		var val = $("#input02").val();
		console.log(val);
		if(val==""||val==null){
			//return false;																		//兼容
			window.event? window.event.returnValue = false : e.preventDefault();				//兼容
		}
		
	})
	
	/*demo5阻止默认行为*/
	var ah = document.getElementById("jump");
	ah.onclick=function(e){
		window.event? window.event.returnValue = false : e.preventDefault();
	}
	
	
	
	
	/*注意事项
	 1.event代表事件的状态，例如触发event对象的元素、鼠标的位置及状态、按下的键等等；
	 2.event对象只在事件发生的过程中才有效。
	 3.firefox里的event跟IE里的不同，IE里的是全局变量，随时可用；firefox里的要用参数引导才能用，是运行时的临时变量。
	 4.在IE/Opera中是window.event，在Firefox中是event；*/
	
	
	
})
