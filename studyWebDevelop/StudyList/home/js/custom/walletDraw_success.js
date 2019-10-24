$(function() {
	walletDraw_success.init();
})

var walletDraw_success = (function() {
	var applyMoney = "";

	var GetParas = function() {
		var paras = utils.url_getParameter();
		applyMoney = paras["applyMoney"];
	}

	var BindControl = function() {
		$('#spn_balance').text(Number(applyMoney).toFixed(2));

		$("#a_detail").click(function() {
			window.location.href = "#";
		});
	}
	return {
		init : function() {
			GetParas();
			BindControl();
		}
	}
})()