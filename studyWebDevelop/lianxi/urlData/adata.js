
$(function(){
	
	$(":button").click(function(){
		var name = $("input[type=text]").val();
	    var ma = $("input[type=password]").val();
		alert(name);
		window.location.href='bdata.html?a='+name+'&b='+ma;
	});
});