require('pages/common')//引进共通样式
require('pages/common/footer')//引进底部导航共通样式
require('pages/common/logo')//引进logo样式
var _util = require('util')
var api = require('api')
require('./index.css')


;(function($){
	var type = _util.getParamsFromUrl('type') || 'default'
	if(type == 'payment'){//在结果页面时payment时的处理
		var orderNo = _util.getParamsFromUrl('orderNo') || ''
		var $btn = $('.order-detail')
		var url = $btn.attr('href')+orderNo;
		$btn.attr('href',url)
	}
	$('.'+ type).show()
})(jQuery);