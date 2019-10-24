//jQuery事件处理机制-绑定事件
//任务
//1鼠标移动到DIV背景颜色变成绿色，移开则恢复
//2在文本框输入的时候背景变色
//3长度达到6位时自动提交
//4点击“提交”按钮时，提示“数据已提交”，该事件只允许触发一次
//5解除所有的事件绑定

$(function(){

	//1鼠标移动到DIV背景颜色变成绿色，移开则恢复
	//on()函数，用于为选中元素绑定事件；它通常有两个参数，第一个代表绑定触发的事件
	//第二个参数代表触发事件发生后要执行的代码，第二个参数是一个函数
	//移入
	$("div").on("mouseover",function(){
		$("div").css("background","lightgreen");
	});
	//移除
	$("div").on("mouseout",function(){
		//$(this)代表当前触发的对象
		$(this).css("background","#ccc");
	});
	
	//2在文本框输入的时候背景变色
	//键盘按下
		$("input").on("keydown",function(){
			$(this).css("background","lightgrey");
		});
	//键盘弹起
	//在键盘弹起时候判断文本框的内容长度
		$("input").on("keyup",function(){
			$(this).css("background","white");
			//在键盘弹起时候判断文本框的内容长度
			var v = $(this).val();	//获取当前文本框的值
			if(v.length==6){
				//触发已经绑定在按钮上的事件
				//利用trigger()函数，触发绑定元素上的指定事件
				$("button").trigger("click");
			}
		});

	//3点击“提交”按钮时，提示“数据已提交”，该事件只允许触发一次
	//利用one()函数为对象绑定一次性事件，只触发一次
	$("button").one("click",function(){
		alert("数据已提交！");
	});

	//4长度达到6位时自动提交

	//5解除所有的事件绑定
	//利用off()函数解除事件绑定
	//off()如果没有参数，则代表解除所有指定元素的绑定事件
	//off("click")里面有参数，则代表解除指定元素的对应事件
	//$("*").off("click");
	//$("*").off();


});