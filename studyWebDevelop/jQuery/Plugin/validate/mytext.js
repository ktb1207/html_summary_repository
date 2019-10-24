

//validate.js
$(function(){
	$('#reg').validate({
		rules:{
			user:{
				required:true,
				minlength:6,
			},		
		},
		
		rules:{
			email:{
				required:true,
				email:true,
			},		
		},
		messages:{
			user:{
				required:'账号不得为空',
				minlength:'账号不得少于6位',
			},
		},
	});



});