/*
	��̬����JS�ļ��ķ���
	var flag=true;		//���flagΪ�棬��ô�ͼ���BrowserDetect.js�ı�
	if (flag){
		var script=document.createElement('script');
		script.type="text/javascript";
		script.src="browserdetect.js";
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	��̬����JS�ļ��ķ������޸�Ϊ������ʽ��
	var flag=true;		//���flagΪ�棬��ô�ͼ���BrowserDetect.js�ı�
	if (flag){
	loadScript('browserdetect.js');		//��������
	}

	function loadScript(url){
	var script=document.createElement('script');
	script.type="text/javascript";
	script.src=url;
	document.getElementsByTagName('head')[0].appendChild(script);
	}

	��̬����JS�ı�
	var flag=false;		//���flagΪ�棬��ô�ͼ���JS�ű�
	if (flag){
	var script=document.createElement('script');
	script.type="text/javascript";
		script.appendChild(document.createTextNode("alert('Lee')"));	//������һ�й���һ��
		script.text="alert('Lee')";										//������һ�й���һ��
	document.getElementsByTagName('head')[0].appendChild(script);
	}

	��̬����CSS�ļ�
	var flag=true;		//���flagΪ�棬��ô�ͼ���JS�ű�
	if (flag){
	var link=document.createElement('link');
	link.rel="stylesheet";
	link.type="text/css";
	link.href="basic.css";	
	document.getElementsByTagName('head')[0].appendChild(link);
	}

	��̬����style��ʽ
	var flag=true;		//���flagΪ�棬��ô�ͼ���JS�ű�
	if (flag){
	var style=document.createElement('style');
	style.type="text/css";
	style.appendChild(document.createTextNode('#box{width:200px;height:200px;'+
		'background:red}'));	//���뻻�д���+
	document.getElementsByTagName('head')[0].appendChild(style);
	}




*/

window.onload=function(){
	
	
}



var flag=true;		//���flagΪ�棬��ô�ͼ���JS�ű�

if (flag){
	var style=document.createElement('style');
	style.type="text/css";
	style.appendChild(document.createTextNode('#box{width:200px;height:200px;'+
		'background:red}'));	//���뻻�д���+
	document.getElementsByTagName('head')[0].appendChild(style);


}





































