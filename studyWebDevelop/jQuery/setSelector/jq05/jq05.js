//jQuery���ʺ�����Ԫ�ص�����ͳߴ�
//����
//1�õ����ĳ���
//2�õ���������
//3�õ��ڿ�����ݳߴ磨������������߿�
//4�õ��ڿ������
//5�õ��ڿ���ڲ��ߴ磨�����߿�
//6�õ��ڿ���ⲿ�ߴ磨������������
//7�õ��ڿ���ⲿ�ߴ磨�����ⲹ����

$(function(){
	//1�õ����ĳ���
	var w = $(".big").width();	//width()�������ڻ�ȡ���ݵĿ��
	var h = $(".big").height();	//height()�������ڻ�ȡ���ݵĸ߶�
	//��Console����̨�д�ӡ������͸�
	console.info("������ݿ��Ϊ��"+w+"�߶�Ϊ��"+h);

	//2�õ���������
	var p = $(".big").position();	//position()���������ȡ���ϽǶ��������
	console.info("���ĳߴ�����Ϊ��"+p.left+","+p.top);

	//3�õ��ڿ�����ݳߴ磨������������߿�
	//width��height�õ��ľ������ݳߴ粻�����ڲ������߿���ⲹ��
	var wa = $(".small").width();	
	var ha = $(".small").height();
	console.info("�ڿ�����ݳߴ�Ϊ����"+wa+"��"+ha);

	//4�õ��ڿ������
	//position�ǵ�ǰ�ӽڵ�����ڸ��ڵ��λ�ƣ����Դ˴�����ֱ����position()����
	//offset()���ڻ�ȡ��ǰԪ����Դ��ڵľ���
	var pa = $(".small").offset();	
	console.info("�ڿ�ĳߴ�����Ϊ��"+pa.left+","+pa.top);
	
	//5�õ��ڿ���ڲ��ߴ磨�������߿�ָ�������ݼ��ڱ߾�
	//innerWidth()��innerHeight()�����õ��������ݺ��ڱ߾�ĳߴ磨�������߿�
	var iw = $(".small").innerWidth();	
	var ih = $(".small").innerHeight();
	console.info("�ڿ�ĳߴ�Ϊ(�������߿�)����"+iw+"��"+ih);

	//6�õ��ڿ���ⲿ�ߴ磨�������ⲹ����
	//outerWidth()��outerHight()�õ����ǰ������ݳߴ硢�ڲ������߿�ĳߴ絫�ǲ������ⲹ��
	var ow = $(".small").outerWidth();	
	var oh = $(".small").outerHeight();
	console.info("�ڿ���ⲿ�ߴ�Ϊ(�������ⲹ��)����"+ow+"��"+oh);

	//7�õ��ڿ���ⲿ�ߴ磨�����ⲹ����
	//outerWidth()��outerHight()����Ĳ���Ϊtrue�����������ⲹ��
	var ww = $(".small").outerWidth(true);	
	var wh = $(".small").outerHeight(true);
	console.info("�ڿ���ⲿ�ߴ�Ϊ(�����ⲹ��)����"+ww+"��"+wh);









});