/*
$(":input").click(function(){
		//$("#box").load("test.html");    //·����������ͬһ��Ŀ¼���棬ֱ��д�ļ���
		//$("#box").load("test.html .url");	//�����.url�ɸ���class��ѡ���Լ���
		//����Ǽ��ط��������ļ�������.php��������Ҫ�������ݣ�����Ҫ��������ύ����
		//��Ҫʹ�õڶ�������data
		//��������ύ���������ַ�ʽget()��post()
		//get()��ʽ
		//$("#box").load("test.php?url=ycku");
		//post()��ʽ
		$('#box').load('test.php',{
			url:'ycku'
		});
		//�������������ص�����callback��������������
		// 1 responseText(���󷵻�)
		// 2 textStatus(����״̬)
		// 3 XMLHttpRequest(XMLHttpRequest����)
		//$('#box').load('test.php',{
			url:'ycku',
		//},function(response,stutas,xhr){
			//alert("�ɹ���");
			//alert(response);	//response,�ӷ��������ص�����
			//alert(stutas);	//scuess,��Ӧ��HTTP״̬��������ֵsucces��error
			if(stutas=="success"){
				alert("�ɹ����أ�");
			}else{
				alert("ʧ�ܣ�");
			}
			//alert(xhr);	//[object Object]
			//xhr������4������
			//1 responseText ��Ϊ��Ӧ���巵�ص��ı�
			//2 status ��Ӧ��HTTP״̬˵��
			//3 statusText HTTP״̬��˵��
			alert(xhr.status);	//200,״̬��

		});
	});
*/
$(function(){
	//$('#box').load('test.html');
	$('input').click(function(){
		//$('#box').load('test.html');
		$("#box").load("test.php?url=ycku",function(response,status,xhr){
			$('#box').load('test.html');
		});
		/*$('#box').load('test.php',{
			url:'ycku'
		});
		*/
	});
});
