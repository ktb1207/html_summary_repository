
//index.js
$(function(){
/*******************************��ѯ��ť*******************************/
	$('#search_button').button({			
		icons : {
			primary : 'ui-icon-zoomout',	//��ťǰ����ͼ��
			//secondary:' ui-icon-triangle-1-s'		//��ť��������ͼ��
		},
	});	

/******************************ע��***********************************/
	//$('#reg_a').click(function(){
		$('#reg').dialog({
		autoOpen:true,
		modal:true,
		width:320,
		height:340,
		resizable:false,
		buttons:{
			'�ύ':function(){
				alert('ע����Ϣ���ύ��')
			},
			'ȡ��':function(){
				$('#reg').dialog('close');
			},
		},
	});
	//});
	
/*****************************�Ա�ť*********************************/
	//$('#reg').buttonset();

/*****************************����*****************************************/
	$('#date').datepicker({
		dateFormat:'yy-mm-dd',		//��ʾ��������ʽ��-��-��
		//dayNames:['������','����һ','���ڶ�','������','������','������','������'],
		//dayNamesShort:['������','����һ','���ڶ�','������','������','������','������'],
		dayNamesMin:['��','һ','��','��','��','��','��'],
		monthNames:['һ��','����','����','����','����','����','����','����','����','ʮ��','ʮһ��','ʮ����'],
		monthNamesShort:['һ','��','��','��','��','��','��','��','��','ʮ','ʮһ','ʮ��'],
		firstDay:1,
		//showOtherMonths:true,			//���������ʾ�����ǲ���Ĳ���ѡ
		//selectOtherMonths:true,		//������ʾ�Ŀ���ѡ���ˣ���һ��ΪtrueΪǰ��
		changeMonth:true,				//��ʾ�·������˵�����ѡ��
		changeYear:true,				//��ʾ��ݿ���ѡ�������˵�
		//autoSize:true,				//�Ƿ��Զ�������ʾ��С
		//showOn:'button',				//��ʾһ����ť
		//buttonText:'����',			//�ı䰴ť��ʾ���ı�����
		//showButtonPanel:true,			//��Ϊtrueʱ�������������
		//closeText:'�ر�',				//�ر��ı���������
		//currentText:'����',				//���������������ı�
		//nextText:'��һ��',				//����ǰ��ҳ��ʾ�ı�
		//prevText:'��һ��',				//����ǰ��ҳ��ʾ�ı�
		//yearSuffix:'��',				//�����ֺ����������塮�ꡯ
		//showMonthAfterYear:true,		//����������ʾ��ʽ
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