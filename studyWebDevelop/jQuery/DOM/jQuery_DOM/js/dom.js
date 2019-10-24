$(function(){
	var li =$("<li style='color:red'>冷漠</li>");
	//$("ol>ul").append(li);
	//$("#warp").find("div").prepend(li);
	//$('a:first').remove();
	//$('ol>ul:first-child').remove();
	$(":submit").click(function(){
		alert($('input[name=user]').val());
		return false;
	});
});
