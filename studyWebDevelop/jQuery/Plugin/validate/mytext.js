

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
				required:'�˺Ų���Ϊ��',
				minlength:'�˺Ų�������6λ',
			},
		},
	});



});