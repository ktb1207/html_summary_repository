//JS���Ʋ���
//��������
/*$(function(){
	function myfunction1(){
		if($('.float1').css("display")=="none"){
			$('.float1').show;
		}
	}
})
*/
//��
function myfunction1(){
	if($('.float1').css("display")=="none"){
		$('.float1').css("display","block");
		$('.hiddenwrap').css("display","block");
	}
}
//�ر�
function myfunction2(){
	if($('.float1').css("display")=="block"){
		$('.float1').css("display","none");
		$('.hiddenwrap').css("display","none");
	}

}