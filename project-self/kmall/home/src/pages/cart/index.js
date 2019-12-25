require('pages/common')
require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
require('./index.css')
var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
require('util/pagination')

var page = {
	productsListParams:{
		id:_util.getParamsFromUrl('productId')
	},
	init:function(){
		//加载商品列表
		this.loadCartDetail()	
		//绑定事件
		this.bindEvent() 
	},
	bindEvent:function(){
		var _this = this
		
	},
	loadCartDetail:function(){
		var _this = this
		var $cartBox = $('.cart .cart-box')
		api.getCartDetail({
			success:function(result){
				var data = result.data
				console.log(data)
				if(data.cartList.length > 0){
					var html = _util.render(tpl,data)
					$cartBox.html(html)
				}else{
					$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
				}		
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery);