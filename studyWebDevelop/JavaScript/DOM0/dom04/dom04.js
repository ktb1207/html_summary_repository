


window.onload=function(){
	var table=document.createElement('table');	//����һ��table��ǩԪ��
	table.width=300;		//table.setAttribute('width','300')
	table.border=1;

	table.createCaption().innerHTML='��Ա��';
	var thead=table.createTHead();
	var tr=thead.insertRow(0);
	tr.insertCell(0).innerHTML='����';
	tr.insertCell(1).innerHTML='�Ա�';
	tr.insertCell(2).innerHTML='����';


	document.body.appendChild(table);			


}


































