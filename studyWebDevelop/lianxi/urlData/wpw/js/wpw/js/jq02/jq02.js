//jQuery�¼��������-����¼�
//����
//1������ťʱ�ı��ı���ı�����ɫ
//2�ƶ���div���ϵ�ʱ�򱳾���ɫ
//3��ҳ������ʾ�������
//4˫���Ŵ�div����

$(function(){

//1������ťʱ�ı��ı���ı�����ɫ
	$("button").on("click",function(){
		$("input").css("background","lightblue");
		//��ֹ�¼�������˫���ύ��ť���ᷢ���Ŵ�div���ڣ�
		//��jQuery��Ϊ�˼򻯲���������on������¼������ṩ�˵ȼ۵ĺ���
		//click-click(),mouseover-mouseover()
		$("button").dblclick(function(event){
			event.stopPropagation();	//ֹͣ˫���¼��Ĵ���
		});
	});

//2�ƶ���div���ϵ�ʱ�򱳾���ɫ
	//�ƶ�����mouseover/�Ƴ�mouseout
	//����
	//$(".me").on("mouseover",function(){
		//$(this).css("background","orange");
		//});
	//�Ƴ�
	//$(".me").on("mouseout",function(){
		//$(this).css("background","#ccc");
		//});
	//��jQuery���ṩ��һ���򻯵ĺ���hover()
	//hover()������������������һ��������ʾ���봥�����ڶ���������ʾ�Ƴ�����
	$(".me").hover(
		function(){
			$(this).css("background","orange");
		},function(){
			$(this).css("background","#ccc");
	});

//3��ҳ������ʾ�������
//����Ϊdocument��Ϊ����ǰҳ����Ϊѡ�����
//���¼��������У���һ��Ĭ�Ϻ�������Ϊ���¼�����event��,���������¼�����������Ϣ
	$(document).on("mousemove",function(event){
		var x = event.pageX;	//pageX����������ĵ��ϵ�x����
		var y = event.pageY;	//pageY����������ĵ��ϵ�y����
		$("#divPos").text("X:"+x+","+"Y:"+y);
	
	});

//4˫���Ŵ�div����
//jQuery�����һ���¼�����ЧӦ�������ڵ�󶨵��¼��ᴫ��Ӱ�쵽������ӽڵ㷢��ͬ���Ĵ����¼�


	$(".me").on("dblclick",function(){
		$(this).width(600);
		$(this).height(200);
	});








});