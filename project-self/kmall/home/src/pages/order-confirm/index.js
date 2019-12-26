require('pages/common')
var _nav = require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
require('./index.css')
var api = require('api')
var _util = require('util')
require('util/pagination')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var modalTpl = require('./modal.tpl')

var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box')
		this.$productBox = $('.product-box')
		this.$modalBox = $('.modal-box')
		//绑定事件
		this.bindEvent()
		this.loadShippingBox()		
		this.loadProductBox()
	},
	bindEvent:function(){
		var _this = this
		
	},
	loadShippingBox:function(){
		var html = _util.render(shippingTpl)
		this.$shippingBox.html(html)
	},
	loadProductBox:function(){
		var html = _util.render(productTpl)
		this.$productBox.html(html)
	}
}

;(function($){
	page.init()
})(jQuery);