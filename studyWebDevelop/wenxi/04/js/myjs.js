//JS控制部分
//弹出函数
/*$(function(){
	function myfunction1(){
		if($('.float1').css("display")=="none"){
			$('.float1').show;
		}
	}
})
*/
//打开
function myfunction1(){
	if($('.float1').css("display")=="none"){
		$('.float1').css("display","block");
		$('.hiddenwrap').css("display","block");
	}
}
//关闭
function myfunction2(){
	if($('.float1').css("display")=="block"){
		$('.float1').css("display","none");
		$('.hiddenwrap').css("display","none");
	}

}