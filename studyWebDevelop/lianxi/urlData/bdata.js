
 

  $(function(){
	var thisURL = document.URL;  //file:///C:/Users/Administrator/Desktop/lianxi/urlData/bdata.html?a=name&b=ma
	var getval =thisURL.split('?')[1];	//a=name&b=ma
	var showna= getval.split("&")[0];	//name&b
	var showma= getval.split("&")[1];
	var na=showna.split("=")[1];
	var ma=showma.split("=")[1];
	
	$("input[type=text]").val(na);
	$("input[type=password]").val(ma);
	
  });