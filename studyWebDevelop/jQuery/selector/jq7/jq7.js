
//子元素选择器与可见性选择器

 $(function(){
	//出现在其父元素第一个位置的li元素

	//获取父元素下面第一个子节点为li的li元素
	//$("li:first-child").css("border","1px solid red");

	//出现在其父元素最后一个位置的li元素

	//获取父元素下面最后一个子节点为li的li元素
	//$("li:last-child").css("border","1px solid red");

	//出现在其父元素第三个位置的li元素
	//获取父元素下面第三个子节点为li的li元素
    //$("li:nth-child(3)").css("border","1px solid red");

	//所有可显示的元素
	$(":visible").css("border","1px solid red");

 });

