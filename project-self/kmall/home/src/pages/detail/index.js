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
		this.loadProductDetail()	
		//绑定事件
		this.bindEvent() 
	},
	bindEvent:function(){
		var _this = this
		//绑定切换图片显示到大图框中的事件
		$('.detail-box').on('mouseenter','.product-small-img-item',function(){
			var $this = $(this)
			//处理选中
			$this.addClass('active')
			.siblings('.product-small-img-item')
			.removeClass('active')
			//将选中图片显示到main-img中
			var imgUrl = $this.find('img').attr('src')//获取图片地址
			$('.product-main-img img').attr('src',imgUrl)
		})
		//绑定增加/减少商品数量的事件
		$('.detail-box').on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $('.count-input')
			var current = parseInt($input.val())
			if($this.hasClass('plus')){//增加:当商品数量小于商品的库存数量时可以增加，否则直接等于商品数量
				$input.val(current < _this.stock ? current + 1 : _this.stock)
			}else if($this.hasClass('minus')){//减少：当商品的数量大于0时可以减少，否则直接等于0
				$input.val(current > 0 ? current -1 : 0)
			}
		})
		//绑定添加购物车事件
		$('.detail-box').on('click','.add-cart-btn',function(){
			var count = $('.count-input').val()
			api.addCart({
				data:{
					productId:_this.productsListParams.id,
					count:count
				},
				success:function(result){
					_util.goResult('addCart')
				}
			})
		})
	},
	loadProductDetail:function(){
		var _this = this
		api.getProductDetail({
			data:this.productsListParams,
			success:function(result){
				const product = result.data
				//数据缓存：库存商品数量
				_this.stock = product.stock
				// console.log(_this.stock)
				// console.log(_this.productsListParams.id)
				if(!_this.productsListParams.id){
					return
				}
				product.images = product.images.split(',')//将多个图片地址转换为字符串
				product.activeImage = product.images[0]//将显示图片默认显示第一张
				// console.log(product)	
				var html = _util.render(tpl,product)
				$('.detail-box').html(html)
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery);