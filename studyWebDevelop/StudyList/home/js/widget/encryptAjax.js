define(['jquery'], function($) {
	var EncryptAjax = function() {
		
	};

	EncryptAjax.prototype = {
		/**
		 * @obj {Object} obj
		 * apiParams 接口参数
		 * url 接口url
		 */
		fnAjax: function(obj,sucCallBack,errorCallBack) {

			$.ajax({
				type: "post",
				url: obj.url,
				data: obj.apiParams,
				timeout: 60000,
				dataType: "text",
				mimeType: "text/plain; charset=utf-8",
				success: function(data) {
					sucCallBack(data,obj.params);
				},
				error: function() {
					errorCallBack();
				}
			});
		}
	};

	return EncryptAjax;
});