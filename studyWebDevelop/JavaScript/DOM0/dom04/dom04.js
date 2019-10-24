


window.onload=function(){
	var table=document.createElement('table');	//创建一个table标签元素
	table.width=300;		//table.setAttribute('width','300')
	table.border=1;

	table.createCaption().innerHTML='人员表';
	var thead=table.createTHead();
	var tr=thead.insertRow(0);
	tr.insertCell(0).innerHTML='姓名';
	tr.insertCell(1).innerHTML='性别';
	tr.insertCell(2).innerHTML='年龄';


	document.body.appendChild(table);			


}


































