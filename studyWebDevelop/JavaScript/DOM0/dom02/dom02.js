


window.onload=function(){
	var table=document.createElement('table');	//����һ��table��ǩԪ��
	table.width=300;		//table.setAttribute('width','300')
	table.border=1;
	table.setAttribute('bordercolor','red');		//table���Բ�����ֵ

	var caption=document.createElement('caption');
	table.appendChild(caption);
	//caption.innerHTML="��Ա��";
	var captionText=document.createTextNode('��Ա��');	//�����ı��ڵ�
	caption.appendChild(captionText);

	var thead=document.createElement('thead');
	table.appendChild(thead);
	var tr=document.createElement('tr');
	thead.appendChild(tr);
	var th=document.createElement('th');
	tr.appendChild(th);
	th.appendChild(document.createTextNode('����'));
	var th2=document.createElement('th');
	tr.appendChild(th2);
	th2.appendChild(document.createTextNode('��'));
	var th3=document.createElement('th');
	tr.appendChild(th3);
	th3.appendChild(document.createTextNode('20'));


document.body.appendChild(table);			//ҳ����봴����tableԪ��λ��body�ӽڵ��ĩβ
}


































