

//自定义插件
//jQuery为开发插件提拱了两个方法，分别是：
//jQuery.fn.extend();
//jQuery.extend();
;(function($){
	$.extend({
		'nav':function(){
			$('.nav').css({
				'list-style':'none',
				'margin':0,
				'padding':0,
				'display':'none',
			});
			
			$('.nav').parent().hover(function(){
			//find()函数将在当前jQuery对象每个匹配元素的所有后代元素中筛选符合指定表达式的元素
				$(this).find('.nav').slideDown();
	
			},function(){
				$(this).find('.nav').stop().slideUp();	//stop()用于鼠标放上就离开将不再继续显示
			});
		
		}
	
	
	});

})(jQuery);	//传参数$=jQuery