//jQuery��������-�Զ��嶯��
//����
//1λ�ƶ���
//2���䶯��
//3��������

$(function(){
	//1λ�ƶ���
	//animate({},{})��������ʵ��λ�ƣ�����������������һ����ʾλ�Ƶ�Ŀ��ֵ
	//�ڶ�������duration������̳�����ʱ��
	//animate��һ��ȱ�㼴��֧����ɫ�������״����
	$(".me1").animate(
		{left:"70%",top:"80%",width:"5%",height:"5%",borderWidth:"1px"},		//��һ������Ŀ��ֵΪcss����
		{queue:true,duration:1000}		//queue:true����������
	);

	//2���䶯��  1���

	//3��������
	//�������Ŀ��ֵ��Ϊԭ���ĳ�ʼֵ����ԭ
	$(".me1").animate(
		{left:"10%",top:"30%",width:"20%",height:"20%",borderWidth:"30px"},		//��һ������Ŀ��ֵΪcss����
		{queue:true,duration:1000}		//queue:true����������
	);

	$(".me2").animate(
		{left:"10%",top:"80%",width:"5%",height:"5%",borderWidth:"1px"},		//��һ������Ŀ��ֵΪcss����
		{queue:true,duration:1000}		//queue:true����������
	);

	$(".me2").animate(
		{left:"70%",top:"30%",width:"20%",height:"20%",borderWidth:"30px"},		//��һ������Ŀ��ֵΪcss����
		{queue:true,duration:1000}		//queue:true����������
	);




});