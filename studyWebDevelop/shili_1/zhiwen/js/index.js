
//index.js
$(function(){
/*******************************��ѯ��ť*******************************/
	$('#search_button').button({			
		
	});	

/******************************ע��***********************************/
	//$('#reg_a').click(function(){
		$('#reg').dialog({
		autoOpen:true,
		modal:true,
		width:320,
		height:380,
		resizable:false,
		buttons:{
			'�ύ':function(){
				$(this).submit();
				alert('ע����Ϣ���ύ��')
			},
			'ȡ��':function(){
				$('#reg').dialog('close');
			},
		},
	}).buttonset();
	//});
	
/*****************************�Ա�ť*********************************/
	//$('#reg').buttonset();

/*****************************����*****************************************/
	$('#date').datepicker({
		dateFormat:'yy-mm-dd',		//��ʾ��������ʽ��-��-��
		dayNamesMin:['��','һ','��','��','��','��','��'],
		monthNames:['һ��','����','����','����','����','����','����','����','����','ʮ��','ʮһ��','ʮ����'],
		monthNamesShort:['һ','��','��','��','��','��','��','��','��','ʮ','ʮһ','ʮ��'],
		firstDay:1,
		
		yearRange:'1950:2020',			//�������ѡ������
	});
/***************************��������*************************************/
	$('#reg input[title]').tooltip({
		position:{				//��ʾ��λ��
			my:'left+5 center',
			at:'right center'
		},	
	});

/************************�����Զ���ȫautocomplete*************************/
	
	$('#email').autocomplete({
		delay:100,				//�ӳ�ʱ��
		autoFocus:true,			//Ĭ��Ϊfalse��Ϊtrue��һ��Ĭ��ѡ��
		source:function(request,response){
			//��ȡ�û����������
			//alert(request.term);
			//������Դ,��ȫ����ʾ����
			//response(['aa','aaa','bbb','cc','dddd']);
			//������������
			var hosts=['qq.com','163.com','168.com','sina.com.cn'],
				term=request.term,		//��ȡ�û����������
				name=term,				//������û���
				host='',				//���������
				ix=term.indexOf('@'),	//@��λ��
				result=[];				//�������ճ��ֵ��б�

			result.push(term);

			//����@��ʱ�����·����û���������
			if(ix>-1){
				name=term.slice(0,ix);
				host=term.slice(ix+1);
			}

			if(name){
				//����û��Ѿ�����@�ͺ��������
				//��ô���ҵ���ص�������ʾ����bnaa@1,����ʾbnaa@163.com
				//����û���û������@���ߺ��������
				//��ô�����е���������ʾ����
				var findHosts=[];
				if(host){
					findHosts=$.grep(hosts,function(value,index){
						return value.indexOf(host)>-1;
					});
				}else{
					findHosts=hosts;
				}
				var findResult=$.map(findHosts,function(value,index){
					return name+'@'+value;
				
				});
				result=result.concat(findResult);
			}
			response(result);
		},		
	});
/******************************************************************/
		
});