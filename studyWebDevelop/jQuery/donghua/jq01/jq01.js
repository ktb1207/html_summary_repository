//jQuery��������-��ʾ������
//����
//1�������DIV�����ʾ������
/*
	1�޶���Ч����ʾ������
	$(function(){
		$("#toggle").click(function(){			//.on("click",function(){})�ļ�д��ʽ
			if($(".me").css("display")=="block"){	//�жϵ�ǰ��DIV����ʾ����״̬
				$(".me").css("display","none");		
			}else if($(".me").css("display")=="none"){
				$(".me").css("display","block");	
			}
		});

	});

*/

$(function(){
	$("#toggle").click(function(){			//.on("click",function(){})�ļ�д��ʽ
		if($(".me").css("display")=="block"){	//�жϵ�ǰ��DIV����ʾ����״̬
			//����
			//hide()��������������������ڶ���������ʾ���������Ժ�������Ķ���
			//hide(1000,function(){alert("������������");});
			$(".me").hide(1000);		//1000����������
			//$(".me").slideUp(1000);		//����������Ч������
			//$(".me").fadeOut(1000);		//����Ч��
		}else if($(".me").css("display")=="none"){
			//��ʾ
			$(".me").show(1000);		//1000��������ʾ
			//$(".me").slideDown(1000);	//����������Ч����ʾ
			//$(".me").fadeIn(1000);		//����Ч��
		}

	});

});