
$(function(){
	//��������ѡ������ȡ��ǰҳ��������ı���
	//���Թ�����
	$("input"[type='text']).css("border","1px solid red");

	//����βƥ����ɶ�����.com��β�ĳ�����ɸѡ
	//$������xxx��β�����
	$("a[href$='.com']").css("border","1px solid red");

	//^-����ͷƥ�䣬ɸѡhttp://��ͷ�ĳ�����
	$("a[href^='http://']").css("border","1px solid red");

	//*=ģ��ƥ��/����ƥ��
	$("*[value*='input']").css("border","1px solid red");

	//�ڲ���������ֵ������£�����ֱ������������д����������
	$("*[rows]").css("border","1px solid red");

	//���Ϲ������������������ͬʱ��Ч
	&("input[type='radio'][checked='checked']").css("border","1px solid red");
	&("input[type='checkbox'][checked='checked']").css("border","1px solid red");
	//�������ѡ����
	&("input[type='radio'][checked='checked'],input[type='checkbox'][checked='checked']")
		.css("border","1px solid red");
	
	//����������ɸѡ
	$("input[type='text'][disabled='disabled']").css("border","1px solid red");

})