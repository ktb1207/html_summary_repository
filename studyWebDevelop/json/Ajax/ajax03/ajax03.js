
/*
//$.aiax()����
$('input').click(function(){
		$.ajax({
			type:'POST',
			url:'test.php',
			data:{
				url:'ycku'
			},
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});
			
	});
//���ύ
//�˷�������Ԫ���ر�������£�д�����ǳ��鷳�����׳���
//�����ύ������ʱ��data������Ҫ�޸ĵķǳ���
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:{
				user:$('form input[name=user]').val(),
				email:$('form input[name=email]').val()
			},
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});	
	});
//serialize()�����л�����
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:$('form').serialize(),		//�����л�
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});	
	});
//serialize()�����Ի�ȡ��ѡ�������������
$('form input[name=sex]').click(function(){
		//alert($(this).serialize());	//sex=%E5%A5%B3 ���������
		$('#box').html(decodeURIComponent($(this).serialize()));
	});
//serialize()ת����JSON����
//serializeArray()����
$('form input[name=sex]').click(function(){
		//console.log($(this).serializeArray());	//[Object { name="sex",  value="��"}]
		var json = $(this).serializeArray();
		$('#box').html(json[0].name+"="+json[0].value);
	});
//$.aiaxSetup()-����
$('form input[type=button]').click(function(){
		//��ʼ���ظ�������
		$.ajaxSetup({
			type:'POST',
			url:'user.php',
			data:$('form').serialize(),		//�����л�
		});
		$.ajax({
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});	
		
	});
//$.param()������
//��ʹ��data���Խ��д��ݵ�ʱ��������Զ�����ʽ���Σ�����ʹ��$.param()����
//������ת�����ַ�����ֵ����ʽ���Է���������˽���
//��Ϊ���data���󴫲Σ���������ֵ�����ݹ������ɷ�������������ֱ��ʹ��objҪ����
$('form input[type=button]').click(function(){
		$.ajax({
			type:'POST',
			url:'user.php',
			data:$.param({
				user:$('form input[name=user]').val(),
				email:$('form input[name=email]').val()
			}),
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});
		
	});
	//
	$('form input[name=sex]').click(function(){
		//console.log($(this).serializeArray());	//[Object { name="sex",  value="��"}]
		var json = $(this).serializeArray();
		$('#box').html(json[0].name+"="+json[0].value);
	});
*/
$(function(){
	$('input').click(function(){
		$.ajax({
			type:'POST',
			url:'test.php',
			data:{
				url:'ycku'
			},
			success:function(response,status,xhr){
				$('#box').html(response);
			}
		});
			
	});
});

