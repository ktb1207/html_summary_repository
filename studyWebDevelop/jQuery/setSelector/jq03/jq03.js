//���ʺ�����Ԫ������

$(function(){
	
	//��������
	//����ָ��Ԫ�ص�htmlƬ�Σ�����html()����
	//html()��������������html��ǩ
	$("#divHTML").html("<b>Hello Word !</b>");
	//����ָ��Ԫ�ص��ı����ݣ�����text()����
	//text()����������������html��ǩ���Ὣ��ȫ����Ϊ�ı�������ʾ
	$("#divText").text("Hello Word !");

	//��ȡhtmlƬ��
	//html()������ȡ�����治��Ҫ�����������ȡ
	var qwe = $("#divHTML").html();
	//alert(qwe);

	//��ȡ�ı�����
	//text()������ȡ�����治��Ҫ�����������ȡ
	var aa = $("#divText").text();
	alert(aa);

	//���úͻ�ȡ�������ֵ
	//$("#txtUsername").attr("value","������");
	$("#txtUsername").val("������");


	//��ȡ��Ӧ��ֵ
	//val()�������治��Ҫ�����Ȼ�ȡָ�����ֵ
	alert($("#abutton").val());

	//��������һ�������ö��ֵ
	$("#mselect").val(["a","c"]);
});