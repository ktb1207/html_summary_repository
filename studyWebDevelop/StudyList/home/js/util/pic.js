var pic={};
		
//图片完整url：获取
pic.url_get =function(ipic_name,ipic_size_id){		
	var  v_pic_size_id =ipic_size_id;	
	var v_pic_type_id =ipic_name.substring(0,1); 
	var v_pic_name =ipic_name.substring(1);			
	
	var v_pic_path_head ="http://test.huluteng.com/pic/";
	var v_pic_path_tail =String(v_pic_type_id) 
							   +"/" + String(v_pic_size_id) 
							   +"/" + String(v_pic_name.substring(0,8)) 
							   +"/" + String(v_pic_name)
							   ;
	
	return (v_pic_path_head +v_pic_path_tail);
}
		
//图片组：获取指定位置的图片名称
pic.array_at =function(ipic_array,ipic_pos){		
	var v_pic_array = ipic_array.split(',');
	var v_pic_pos = ipic_pos;
	
	v_pic_pos = v_pic_pos -1;			 
	return v_pic_array[v_pic_pos];
}

