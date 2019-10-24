var date={};

date.ymd_next =function(ymd,day_gap){
	v_date_from =new Date(ymd.replace(/-/g,"/"));
	v_date_next  =new Date(new Date()-0+day_gap*86400000);
	return v_date_next.getFullYear() 
			 +"-"
			 +(v_date_next.getMonth()+1) 
			 +"-" 
			 +v_date_next.getDate()
			 ;
}

date.ymd_curr =function(){
	v_date_next  =new Date();
	return v_date_next.getFullYear() 
			 +"-"
			 +(v_date_next.getMonth()+1) 
			 +"-" 
			 +v_date_next.getDate()
			 ;	
}
