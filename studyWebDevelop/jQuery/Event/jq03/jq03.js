//jQuery�¼��������-�����¼�
//����
//ʵ�����ֵĴ�Сдת����ʾ

//����һ���������ڴ�Ŵ�д����
	var numarr = ["��","Ҽ","��","��","��","��","½","��","��","��"];
	$(function(){
		$("input").on("keydown",function(event){		//����event��ȡ�¼�����Ϣ
			//keydown keyup 
			//keypress	��갴��̧�����������
			//console.info("������keydown�¼�");
			//����event.keyCode��ȡ���¼���ASCII��ֵ
			//console.info("������keydown�¼�"+event.keyCode);
			//0��Ӧ��ASCII��ֵΪ48������Ľ��Ϊ0������0�±��Ӧ
			//var t = numarr[event.keyCode-48];	
			//console.info("����������ǣ�"+t);
			//��ԭ�л��������Ӻ���
			//$(".sc").text($(".sc").text()+t);	//���õ��Ĵ�д������һ��������ʾ���� 

			//�жϰ�����ASCII��ֵ��ֻ������������Ч
		if(event.keyCode>=48&&event.keyCode<=57){
			var t = numarr[event.keyCode-48];
			$(".sc").text($(".sc").text()+t);
			return true;	//�¼���������
		}else{
			return false;	//��keydown�е��¼�����������ֵΪfalse��ʱ�򣬱����¼�������
			}

		});
	
	

	});