
/*
	//����Ƿ�֧��sheet��ʽ������ʽ/����ʽ
	//IEΪfalse,��������ȷ��֧�֣����������Ϊtrue
	//alert(document.implementation.hasFeature('stylesheets','2.0'));

*/
/*
	var link=document.getElementsByTagName('link')[0];	//��ȡ��һ��������ʽ��ǩ
	//alert(link);		//object HTMLLinkElement
	var sheet=link.sheet;
	//alert(sheet);		//object CSSStyleSheet]
	
*/
/*
	//���Ӽ��Ļ�ȡsheet�ķ���
		//document.styleSheets�õ�����StyleSheetList����
		//var sheet=document.styleSheets;		//	�õ�object StyleSheetList����
		//alert(sheet);		//object StyleSheetList
		var sheet=document.styleSheets[0];		//�õ���һ��sheet��ʽ��,�����������
		//alert(sheet);		//object CSSStyleSheet
		//�ж������sheet��ʽ���Ƿ񱻽��ã�����false�򿪣�����true�򱻽���
		//alert(sheet.disabled);	//true
		//sheet.disabled=true;		//�������������sheet��ʽ��
		//alert(sheet.href);		//��ȡcss·��
	
*/



window.onload=function(){
	var sheet=document.styleSheets[0];	
	//sheet.cssRules,��ʽ���򼯺�
	//��ʽ�Ĺ�����ǣ�һȺ��ʽ�ļ��ϱ�ʾһ������
	//alert(sheet.cssRules);		//[object CSSRuleList��ʽ���򼯺�
	//alert(sheet.cssRules[0]);		//object CSSStyleRule],�õ����ǵ�һ����ʽ����
	//alert(sheet.cssRules[0].cssText);	//�õ���һ��css�������ʽ�ı�
	//alert(sheet.cssRules[0].selectorText);		//�õ���һ�������ѡ���#box
	//sheet.deleteRule(0);		//ɾ����һ������
	//sheet.insertRule("body{background-color:red}",0);	//���һ�������ڵ�һ��λ����
	



















}


































