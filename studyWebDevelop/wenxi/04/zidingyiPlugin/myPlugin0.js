

$(function(){
	//�����Ӳ˵���css��ʽ����
	$('.nav').css({
		'list-style':'none',
		'margin':0,
		'padding':0,
		'display':'none',
	});
	//�����ͣ����ʵ������
	//houver(over,out)
	$('.nav').parent().hover(function(){
		//find()�������ڵ�ǰjQuery����ÿ��ƥ��Ԫ�ص����к��Ԫ����ɸѡ����ָ�����ʽ��Ԫ��
		$(this).find('.nav').slideDown();
	
	},function(){
		$(this).find('.nav').stop().slideUp();	//stop()���������Ͼ��뿪�����ټ�����ʾ
	});

});