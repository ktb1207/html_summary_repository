
$(function(){
	$.ajax({
			url:'index.php?type=get',
			type:'post',
			dataType:'json',
			success:function(response,status,xhr){
				var html="";
				$.each(response,function(index,value){
					html+="<ul><li>"+value.name+"</li><li>"+value.sex+"</li><li>"+value.tel+"</li><li><a href='#'>修改</a><a href='#'>删除</a></li></ul>";	
				});
				$("#bottom").prepend(html);
				
			},
			
		});
//
	$(':button').click(function(){
		var user=$('input[name="user"]').val();
		var adata=$('input[name="adata"]').val();
		var sex=$('select').val();
		//alert(sex);
		$.ajax({
			url:'index.php?type=set',
			type:'post',
			dataType:'json',
			data:{
				name:user,
				tel:adata,
				sex:sex,
			},
			
			success:function(response,status,xhr){
				//alert(response);
				var html="";
				html+="<ul><li>"+user+"</li><li>"+sex+"</li><li>"+adata+"</li><li><a href='#'>修改</a><a href='#'>删除</a></li></ul>";
				$("#bottom").prepend(html);
			},
			
		});
	
	});

});