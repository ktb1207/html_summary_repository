// JavaScript Document
require.config({
	paths : {
		'jquery' : '../lib/jquery-1.8.3.min',
		'jcitySelect':'../widget/jquery.cityselect'
	},
	shim : {
		'jcitySelect':{
			deps : ['jquery'],
			exports : '_'
		}
	}
});


require(['jquery','jcitySelect'], function(jquery,jcitySelect) {	
	
	$("#city_4").citySelect({
    	prov:"湖南", 
    	city:"长沙",
		dist:"岳麓区",
		nodata:"none"
	}); 
	
});