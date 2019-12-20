require('pages/common')//引进共通样式
require('pages/common/footer')//引进底部导航共通样式
require('pages/common/logo')//引进logo样式
var _util = require('util')
var api = require('api')
require('./index.css')


;(function($){
	var type = _util.getParamsFromUrl('type') || 'default'
	$('.'+ type).show()
})(jQuery);