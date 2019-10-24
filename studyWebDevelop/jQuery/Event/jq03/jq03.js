//jQuery事件处理机制-键盘事件
//任务
//实现数字的大小写转换显示

//定义一个数组用于存放大写数字
	var numarr = ["零","壹","贰","叁","肆","伍","陆","柒","扒","玖"];
	$(function(){
		$("input").on("keydown",function(event){		//利用event获取事件的信息
			//keydown keyup 
			//keypress	鼠标按下抬起的完整动作
			//console.info("触发了keydown事件");
			//利用event.keyCode获取按下键的ASCII码值
			//console.info("触发了keydown事件"+event.keyCode);
			//0对应的ASCII码值为48，相减的结果为0和数组0下标对应
			//var t = numarr[event.keyCode-48];	
			//console.info("本次输入的是："+t);
			//在原有基础上增加汉子
			//$(".sc").text($(".sc").text()+t);	//将得到的大写数字再一起输入显示出来 

			//判断按键的ASCII码值，只有输入数字有效
		if(event.keyCode>=48&&event.keyCode<=57){
			var t = numarr[event.keyCode-48];
			$(".sc").text($(".sc").text()+t);
			return true;	//事件正常触发
		}else{
			return false;	//当keydown中的事件处理函数返回值为false的时候，本次事件被忽略
			}

		});
	
	

	});