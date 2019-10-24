//jQuery事件处理机制-表单事件
//任务
//1所有文本框获得焦点时背景变为绿色，且字体加粗，失去焦点后恢复
//2“姓名”文本框，同步显示在页面上
//3“性别”下拉框内容发生变化后，同步显示在页面上
//4如果“姓名”为空或者“性别”没有选择的时候，则不允许提交

$(function(){

//1所有文本框获得焦点时背景变为绿色，且字体加粗，失去焦点后恢复
//focus()函数用于被指定的选择器获得焦点时候触发事件
//blur()函数用于被指定选择器失去焦点时候触发事件
	//获得焦点
	$("input[name='name']").on("focus",function(){
		$(this).addClass("fousin");
	});
	//失去焦点
	$("input[name='name']").on("blur",function(){
		$(this).removeClass("fousin");
	});

//2“姓名”文本框，同步显示在页面上
//change()函数用于被指定选择器的内容发生改变时触发事件
//文本框触发change()函数的条件是内容发生改变且失去焦点之后才触发
	$("input[name='name']").on("change",function(){
		var v = $(this).val();	//获取当前事件对象的值
		$("#tips").text("姓名为："+v);
	});

//3“性别”下拉框内容发生变化后，同步显示在页面上
	$("select").on("change",function(){
		var s = $(this).val();	//获取当前事件对象的值
		$("#tips").text("性别为："+s);
	});

//4如果“姓名”为空或者“性别”没有选择的时候，则不允许提交
//submit()函数为在表单提交前触发，可以通过这个函数来控制表单是否提交
	$("form").on("submit",function(){
		var name = $("input[name='name']").val();	//获取姓名的值
		var sex = $("select").val();				//获取性别的值
		if(name !="" && sex !="请选择"){
			alert("恭喜通过验证！")
			return true;	//	返回函数值为true，表单正常提交
		}else{
			alert("表单验证未通过，请审查输入项！");
			return false;
		}
	});
	








});