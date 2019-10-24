// JavaScript Document
require.config({
	paths : {
		'jquery' : '../lib/jquery-1.8.3.min',
		'jqueryMb': '../lib/jquery.mobile-1.4.5.min',
		'jqueryTmpl' : '../lib/jquery.tmpl.min',
		'scale':'../util/scale',
		'commom':'../util/common',
		'EncryptAjax': '../widget/encryptAjax'
	},
	shim : {
		'jqueryMb':{
			deps : ['jquery'],
			exports : '_'
		},
		'jqueryTmpl':{
			deps : ['jquery'],
			exports : '_'
		},
		'common':{
			deps : ['jquery'],
			exports : '_'
		}
	}
});


require(['jquery','jqueryMb','jqueryTmpl','scale','commom','EncryptAjax'], function(jquery,jqueryMb,jqueryTmpl,scale,commom,EncryptAjax) {	
	
	
	var locationUrl = window.location.href;
	var	nAmount = getQueryString(locationUrl, 'nAmount'); //金额
	var	alias = getQueryString(locationUrl, 'alias'); //产品名称
	
});