
/*
//Ajaxȫ���¼�.aiaxStart()��.ajaxStop()
$(document).ajaxStart(function(){
		$('.loading').show();
	}).ajaxStop(function(){
		$('.loading').hide();
	});
//�첽���������
//$.ajax()��������
	$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'http://www.adbdifs.com/user.php',
			data:$('form').serialize(),
			success:function(response,status,xhr){
				$('#box').html(response);
			},
			//timeout:1000,		//���ü��س�ʱʱ��
			//global:false,		//��������ĳ��$.ajax()������ȫ���¼�
			error:function(xhr,errorText,errorType){
				//alert("������...");
				//alert(errorText+":"+errorStatus);  //error:notfind
				//alert(xhr.status+":"+xhr.statusText);
			}
		});
	});
//$.get()��$.post()�Ĵ�������
	$.post('user1.php').error(function(xhr,errorText,errorType){
			alert(errorText+":"+errorType);  //error:Not Found
			alert(xhr.status+":"+xhr.statusText);	//404:Not Found
	});
//ȫ�ִ����¼�
	$(document).ajaxError(function(event,xhr,setting,errorType){
		alert("cuowu");
	});
//ȫ���¼�
	$(document).ajaxSend(function(event,xhr,setting){
		alert('����֮ǰ');			//1
	}).ajaxComplete(function(){
		alert('������ɺ󣬲��ܳɹ�����ʧ��');		//3
	}).ajaxSuccess(function(){
		alert('����ɹ���');		//2
	}).ajaxError(function(){
		alert('����ʧ��');			//2
	});
//$.post()��$.get()��Ӧ�ֲ�������
$('form input[type=button]').click(function(){
		$.post('user.php',$('form').serialize(),function(response,status,xhr){
			$('#box').html(response);
		}).success(function(){
			alert('����ɹ���');
		}).error(function(){
			alert('����ʧ��');	
		}).complete(function(){
			alert('������ɺ󣬲��ܳɹ�����ʧ��');
		});
	});
//$.ajax()��Ӧ�ֲ��¼�
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:$('form').serialize(),
			success:function(response,status,xhr){
				$('#box').html(response);
			},
			error:function(xhr,errorText,errorType){
				alert("������...");
			},
			beforeSend:function(){
				alert('����֮ǰ');
			},
			success:function(){
				alert('����ɹ���');
			},
			error:function(){
				alert('����ʧ��');
			},
			complete:function(){
				alert('������ɺ󣬲��ܳɹ�����ʧ��');
			}

		});
	});
*/
$(function(){
	$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user1.php',
			data:$('form').serialize(),
			success:function(response,status,xhr){
				$('#box').html(response);
			},
			//timeout:500,		//���ü��س�ʱʱ��
			//global:false,		//��������ĳ��$.ajax()������ȫ���¼�
			error:function(xhr,errorText,errorType){
				//alert(errorText);	//error
				//alert(errorStatus);//error
				//alert(errorType);//���ؿ���Ϣ
				//alert(errorStatus+":"+errorType);  //error:
				//alert(errorStatus+":"+errorText);	//error:
				//alert(xhr.status+":"+xhr.statusText);
				//alert(errorText+":"+errorType);
				//alert(xhr.status+":"+xhr.statusText);//0:error
				/*for(var i in xhr){
					document.write(i+"<br>");
				}
				*/
				//alert(xhr.status);	//404
				//alert(xhr.statusText);	//Not Found	
				alert(xhr.status+":"+xhr.statusText);404:Not Found
			}
		});
	});
});


