require('pages/common')
require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
var _side = require('pages/common/side')
require('./index.css')
var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
require('util/pagination')

var page = {
	orderDetailParams:{
		orderNo:_util.getParamsFromUrl('orderNo'),
	},
	init:function(){
		this.$orderBox = $('.order-box')
		//加载商品列表
		this.loadOrderDetail()	
		this.renderSide()
		this.bindEvent()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	loadOrderDetail:function(){
		var _this = this
		api.getOrderDetail({
			data:this.orderDetailParams,
			success:function(result){
				const order = result.data
				// console.log(order)
				_this.renderOrderDetail(order)
			}
		})
	},
	renderOrderDetail:function(order){//渲染商品详情
		if(order){
			order.createTime = new Date(order.createdAt).toLocaleString()
			//使得当支付和取消的状态码是10(代表未支付）时，使得可以支付和取消
			order.canpy = order.cancel = order.status == 10;
			var html = _util.render(tpl,order)
			this.$orderBox.html(html)
		}else{
			this.$orderBox.html('<p class="empty-message">您还没有订购商品。。<p>')
		}
	},
	bindEvent:function(){
		var _this = this
		this.$orderBox.on('click','.btn-cancel',function(){
			var $this = $(this)
			if(_util.showConfirm('您确定要取消该订单吗？')){
				api.updateOrderStatus({
					data:{
						orderNo:_this.orderDetailParams.orderNo,
						status:20
					},
					success:function(result){
						const order = result.data
						// console.log(order)
						_this.renderOrderDetail(order)
					}
				})
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery);