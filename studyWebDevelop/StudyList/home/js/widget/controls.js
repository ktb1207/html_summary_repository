var controls = (function() {
	var dialogSelect = function(elem, elem_dialog) {
		//触发元素
		var $elem = $(elem);
		//选择弹窗
		var $dialog = $(elem_dialog);
		var $wrap = $dialog.find("#wrapper");
		var $item = $dialog.find("ul li");

		var hDom = $(document).height();
		var hWid = $(window).height();

		$elem.click(function() {
			setTimeout(function() {
				$dialog.height(hDom);
				$wrap.height(0.8 * hWid);
				$dialog.show();
				setTimeout(function() {
					$wrap.removeClass('translateInY').addClass('translateInY');
					var myScroll = new iScroll('wrapper');
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				}, 100);
			}, 500);
		})

		$item.bind("tap", function() {
			$elem.attr("data-index", $(this).index() + 1 + "");
			$elem.find(".mid").remove();
			$elem.find("dt").after("<dd class='mid'><span class='gyfx'>" + $(this).html() + "</span></dd>");
			$dialog.hide();
		})
	}

	var switchBtn = function(elem) {
		var $elem = $(elem);
		var $div_elem = $elem.parent();
		$div_elem.bind("tap", function() {
			if($div_elem.hasClass("ui-flipswitch-active")){
				$elem.val(1);
			}
			else {
				$elem.val(0);
			}
		})
	}

	return {
		dialogSelect : function(elem, elem_dialog) {
			dialogSelect(elem, elem_dialog);
		},
		switchBtn : function(elem) {
			switchBtn(elem);
		}
	}
})()