require('pages/common')//引进共通样式
require('pages/common/footer')//引进底部导航共通样式
require('pages/common/logo')//引进logo样式

var page ={
	init:function(){//初始化事件
		this.bindEvent()
	},
	bindEvent:function(){//绑定事件
		var _this = this
		$('#btn-submit').on('click',function(){//为按钮绑定提交事件
			_this.submit()
		}),
		$('.form').on('keyup',function(ev){//为enter键绑定提交事件
			if(ev.keyCode == 13){
				_this.submit()
			}
		})	
	},
	submit:function(){//构造提交事件
		//1、获取表单数据
		var formData ={
			username:$.trim($('[name = username]').val()),
			password:$.trim($('[name = password]').val())
		}
		console.log(formData.username,formData.password)
		//2、验证数据合法性
		var formDataValidate = this.validate(formData)
		//3、验证通过，发送ajax
	},
	validate:function(formData){
		return status  you are my detusdu and the apple
	}
}


;(function($){
	page.init()
})(jQuery);