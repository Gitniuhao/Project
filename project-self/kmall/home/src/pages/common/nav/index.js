require('./index.css')
var api = require('api')
var _util = require('util')

const page ={
	init:function(){
		this.bindEvent()
		this.loadUsername()
		this.loadCartNum()
		return this
	},
	loadCartNum:function(){//加载购物车数量
		var $cartNum = $('.cart-num')
		api.getCartCount({
			success:function(result){
				var count = result.data
				$cartNum.text(count || 0)
			},
			error:function(){	
				$cartNum.text(0)
			}
		})
	},
	bindEvent:function(){//绑定事件
		$('#logout').on('click',function(){
			api.logout({
				success:function(){//退出成功则刷新页面回到not-login页面
					window.location.reload()
				},
				error:function(err){//退出失败则弹窗提示错误信息
					_util.showErrMsg(err)
				}
			})
		})
	},
	loadUsername:function(){
		api.getUsername({
			success:function(result){//获取用户名则让not-login页面隐藏，login页面显示，并且改变username的内容
				$('.not-login').hide()
				$('.login')
				.show()
				.find('.username')
				.text(result.data.username)
			}
		})
	}
}
module.exports = page.init();