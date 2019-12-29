require('pages/common')
var _nav = require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
require('./index.css')
var api = require('api')
var _util = require('util')
require('util/pagination')
var tpl = require('./index.tpl')

var page = {
	paymentsParams:{
		orderNo:_util.getParamsFromUrl('orderNo')
	},
	init:function(){
		this.$paymentBox = $('.payment-box')
		this.loadPayments()
	},
	loadPayments:function(){
		var _this = this
		if(this.paymentsParams.orderNo){
			api.getPayments({
			data:{
				orderNo:_this.paymentsParams.orderNo
			},
			success:function(result){
				const data = result.data
				// console.log(data)
				var html = _util.render(tpl,{
					payment:data
				})
				_this.$paymentBox.html(html)

				//再获取订单成功之后开始监听订单的状态
				_this.listenPaymentStatus()
			},
			error:function(){
				 _this.$paymentBox.html('<p class="empty-message">获取支付信息失败,请稍后再试</p>')
			}
		})
		}else{
			 _this.$paymentBox.html('<p class="empty-message">没有订单,请重新跳转页面</p>')
		}		
	},
	listenPaymentStatus:function(){
		var _this = this
		var timer = setInterval(function(){
			api.getPaymentStatus({
				data:{
					orderNo:_this.paymentsParams.orderNo
				},
				success:function(result){
					const status = result.data
					// console.log(status)
					if(status){
						window.location.href = './result.html?type=payment&orderNo='+ _this.paymentsParams.orderNo
					}
				}
			})
		},1000)
	}
}

;(function($){
	page.init()
})(jQuery);