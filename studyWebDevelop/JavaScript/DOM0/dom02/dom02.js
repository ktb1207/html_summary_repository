


window.onload=function(){
	var table=document.createElement('table');	//创建一个table标签元素
	table.width=300;		//table.setAttribute('width','300')
	table.border=1;
	table.setAttribute('bordercolor','red');		//table属性操作赋值

	var caption=document.createElement('caption');
	table.appendChild(caption);
	//caption.innerHTML="人员表";
	var captionText=document.createTextNode('人员表');	//创建文本节点
	caption.appendChild(captionText);

	var thead=document.createElement('thead');
	table.appendChild(thead);
	var tr=document.createElement('tr');
	thead.appendChild(tr);
	var th=document.createElement('th');
	tr.appendChild(th);
	th.appendChild(document.createTextNode('李四'));
	var th2=document.createElement('th');
	tr.appendChild(th2);
	th2.appendChild(document.createTextNode('男'));
	var th3=document.createElement('th');
	tr.appendChild(th3);
	th3.appendChild(document.createTextNode('20'));


document.body.appendChild(table);			//页面加入创建的table元素位于body子节点的末尾
}


































