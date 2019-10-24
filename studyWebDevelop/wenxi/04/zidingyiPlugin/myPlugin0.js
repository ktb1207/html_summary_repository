

$(function(){
	//下拉子菜单的css样式控制
	$('.nav').css({
		'list-style':'none',
		'margin':0,
		'padding':0,
		'display':'none',
	});
	//鼠标悬停的现实和隐藏
	//houver(over,out)
	$('.nav').parent().hover(function(){
		//find()函数将在当前jQuery对象每个匹配元素的所有后代元素中筛选符合指定表达式的元素
		$(this).find('.nav').slideDown();
	
	},function(){
		$(this).find('.nav').stop().slideUp();	//stop()用于鼠标放上就离开将不再继续显示
	});

});