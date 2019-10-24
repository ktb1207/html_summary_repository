
$(function(){
	//内容选择器
	//选择所有内容包含“is”单词的段落
	//$("p:contains(is)").css("border","1px solid red");

	//包含元素选择器
	//找到所有拥有input标签的div对象
	//$("div:has(input)").css("border","1px solid red");

	//非空内容选择器
	//标出所有的非空元素，即拥有子元素或文本的元素
	//$("*:parent").css("border","1px solid red");

	//空内容选择器
	//标出所有空元素，既没有子元素或文本的元素
	//$("*:empty").css("border","1px solid red");

	//获取表单所有元素
	// :之前什么都不写默认就是* 查找所有元素
	//$(":input").css("border","1px solid red");
	//$("form,input,select,button,textarea").css("border","1px solid red");

	//获得表单中所有按钮
	//$(":button").css("border","1px solid red");
	//$(":button,:submit,:reset").css("border","1px solid red");

	//所有不可输入项
	//$(":disabled").css("border","1px solid red");
	//$("*[disabled='disabled']").css("border","1px solid red");
	
	//被选中的元素
	//$(":checked").css("border","1px solid red");	//被选中的单选和复选框

	$(":selected").css("border","1px solid red");	//被选中的下拉菜单中的元素


});
