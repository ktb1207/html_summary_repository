//jQueryѡ����ʵ����

	$(function(){
		$("#btnQuery").on("click",function(){
			//alert("ִ���˵����¼�");
			var v = $("#txtSelector").val();	//val��������˼�ǻ�ȡ�ı������������
			//�Ƴ�Class�� removeClass()
			//�Ƴ��Ѿ�ӵ��selectorstyle���selectorstyle��
			$(".selectorstyle").removeClass("selectorstyle");
			// addClassΪѡ�е��������css Class��
			$(v).addClass("selectorstyle");
			//��ȡѡ��Ԫ�ص�����
			var num=$(v).size();	
			alert("��������ǣ�"+v+"��ѯ��������Ϊ��"+num+"��");
		})
	
	});