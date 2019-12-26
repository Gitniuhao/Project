require('pages/common')
var _nav = require('pages/common/nav')//引进导航共通样式
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
		this.$cartBox = $('.cart .cart-box')
		//加载商品列表
		this.loadCartDetail()	
		//绑定事件
		this.bindEvent()		
	},
	bindEvent:function(){
		var _this = this
		//处理单个选中/取消
		this.$cartBox.on('click','.select-one',function(){
			var $this = $(this)
			if($this.is(':checked')){//选中
				//更新页面需要获取商品的id
				var productId = $this.parents('.product-item').data('product-id')
				// console.log(productId)
				api.updateCartChoice({
					data:{
						productId:productId,
						checked:true
					},
					success:function(result){
						const data = result.data
						// console.log(data)
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}else{//取消
				// console.log('off')
				api.updateCartChoice({
					data:{
						productId:productId,
						checked:false
					},
					success:function(result){
						const data = result.data
						// console.log(data)
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//处理全部选中/取消,因为是全部，所有不需要单个商品的id
		this.$cartBox.on('click','.select-all',function(){
			var $this = $(this)
			if($this.is(':checked')){//选中
				api.updateCartChoice({
					data:{
						checked:true
					},
					success:function(result){
						const data = result.data
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}else{//取消
				// console.log('off')
				api.updateCartChoice({
					data:{
						checked:false
					},
					success:function(result){
						const data = result.data
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//处理删除单个商品，所以需要商品的id
		this.$cartBox.on('click','.delete-selected',function(){
			var $this = $(this)
			//更新页面需要获取商品的id
			var productId = $this.parents('.product-item').data('product-id')
			if(_util.showConfirm('您确定要删除所中的商品嘛？')){//返回布尔值判断是否进入
				api.deleteCartProduct({
					data:{
						productId:productId
					},
					success:function(result){
						const data = result.data
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//处理删除全部商品，所以不需要商品的id
		this.$cartBox.on('click','.delete-one',function(){
			var $this = $(this)
			if(_util.showConfirm('您确定要删除所中的商品嘛？')){//返回布尔值判断是否进入
				api.deleteCartProduct({
					success:function(result){
						const data = result.data
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//处理修改商品数量
		this.$cartBox.on('click','.count-btn',function(){
			var $this = $(this)
			// console.log($this)
			//获取当前商品的id
			var productId = $this.parents('.product-item').data('product-id')
			var $input = $('.count-input')
			//获取当前值
			var current = parseInt($input.val())
			console.log(current)
			//获取库存
			var stock = $input.data('stock')
			var count = current
			if($this.hasClass('plus')){//增加
				if(current == stock){
					_util.showConfirm('商品数量已经到达上限~')
					return
				}
				count = current + 1;
			}else if($this.hasClass('minus')){//减少
				if(current == 1){
					_util.showConfirm('商品数量不能小于1~')
					return
				}
				count = current - 1;
			}
			api.updateCartCount({
				data:{
					productId:productId,
					count:count
				},
				success:function(result){
					const data = result.data
					_this.renderCart(data)
				},
				error:function(){
					_this.showErrPage()
				}
			})
		})

		//处理结算跳转
		this.$cartBox.on('click','.btn-submit',function(){
			if(_this.totalCartPrice > 0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrMsg('请先添加您需要结算的商品~')
			}
		})			
	},
	renderCart:function(data){//抽离加载购物页面的逻辑
		//重新加载购物车数量
		_nav.loadCartNum()
		if(data.cartList.length > 0){
			//缓存商品总价
			this.totalCartPrice = data.totalCartPrice
			var html = _util.render(tpl,data)
			this.$cartBox.html(html)
		}else{
			this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
		}	
	},
	loadCartDetail:function(){
		var _this = this		
		api.getCartDetail({
			success:function(result){
				var data = result.data
				// console.log(data)
				// if(data.cartList.length > 0){
				// 	var html = _util.render(tpl,data)
				// 	_this.$cartBox.html(html)
				// }else{
				// 	_this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
				// }
				_this.renderCart(data)		
			}
		})
	},
	showErrPage:function(){
		this.$cartBox.html('<p class="empty-message">好像出错了,请稍后再试!</p>')
	}
}

;(function($){
	page.init()
})(jQuery);