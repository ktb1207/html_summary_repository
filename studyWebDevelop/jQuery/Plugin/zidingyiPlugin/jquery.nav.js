

//�Զ�����
//jQueryΪ��������Ṱ�������������ֱ��ǣ�
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
			//find()�������ڵ�ǰjQuery����ÿ��ƥ��Ԫ�ص����к��Ԫ����ɸѡ����ָ�����ʽ��Ԫ��
				$(this).find('.nav').slideDown();
	
			},function(){
				$(this).find('.nav').stop().slideUp();	//stop()���������Ͼ��뿪�����ټ�����ʾ
			});
		
		}
	
	
	});

})(jQuery);	//������$=jQuery