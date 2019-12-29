var api = require('api')
var _util = require('util')
var ModalTpl = require('./modal.tpl')
var _city = require('util/city')

var formErr = {
    hide: function() {
        $('.error-item')
            .hide()
            .find('.error-msg')
            .text('')
    },
    show: function(msg) {
        $('.error-item')
            .show()
            .find('.error-msg')
            .text(msg)
    }
}

module.exports ={
	show:function(shipping){//显示面板
		//编辑时回传缓存shipping
		this.shipping = shipping
		this.$modalBox = $('.modal-box')
		this.loadModal();
		this.bindEvent();
		this.loadProvinces();
	},
	loadProvinces:function(){
		//获取全部省份
		var provinces = _city.getProvinces();
		//生成页面结构
		var provincesSelectOptions = this.getSelectOptions(provinces);
		var $provincesSelect = $('.province-select')
		//生成下拉结构
		$provincesSelect.html(provincesSelectOptions)

		//处理编辑地址
		if(this.shipping){
			$provincesSelect.val(this.shipping.province)
			this.loadCities(this.shipping.province)
		}
	},
	loadCities:function(province){
		//获取省份对应的城市
		var cities = _city.getCities(province);
		//生成页面结构
		var citiesSelectOptions = this.getSelectOptions(cities);
		var $citiesSelect = $('.city-select')
		//生成下拉结构
		$citiesSelect.html(citiesSelectOptions)

		//处理编辑地址
		if(this.shipping){
			$citiesSelect.val(this.shipping.city)
		}
	},
	getSelectOptions:function(arr){
		var html = '<option value="">请选择</option>'
		for(var i =0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html;
	},
	loadModal:function(){//加载弹出面板
		var html = _util.render(ModalTpl,this.shipping)
		this.$modalBox.html(html)
	},
	bindEvent:function(){
		var _this = this
		//点击叉号关闭弹出面板
		this.$modalBox.on('click','.close',function(){
			_this.hideModal();
		})
		//组织事件冒泡为了点击弹出面包中的其他地方不触发顶层的关闭事件
        this.$modalBox.on('click','.modal-container',function(ev){
            ev.stopPropagation()
        })
        //省份和城市的联动
        this.$modalBox.on('change','.province-select',function(){
        	var $this = $(this)
        	var province = $this.val()
        	_this.loadCities(province)
        })
        //绑定提交数据事件
        this.$modalBox.on('click','.btn-submit',function(){
        	_this.submit()
        })
         this.$modalBox.find('input').on('keyup', function(ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })       
	},
	hideModal:function(){
		this.$modalBox.empty()
	},
	submit:function(){//构造提交事件
		var _this = this
		//1、获取表单数据
		var formData ={
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name = "phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		// console.log(formData.username,formData.password)
		//2、验证数据合法性
		var formDataValidate = this.validate(formData)
		// console.log(formDataValidate)
		if(formDataValidate.status){//3、验证通过，消除错误提示，发送ajax
			formErr.hide()//消除错误提示
			//开始发送ajax
			var request = api.addShippings
			var action = '添加地址'
			if(this.shipping){//在编辑地址的情况下
				request = api.updateShippingDetail
				formData.id = _this.shipping._id
				action = '编辑地址'
			}
			request({
				data:formData,
				success:function(result){//登录成功后的操作
					const shippings  = result.data
					//新增地址成功后处理：
					//1、关闭弹窗
					_this.hideModal()
					//2、传递数据给index文件
					$('.shipping-box').trigger('get-shippings',[shippings])
					//3、提示信息
					_util.showSuccessMsg(action+'成功~')
				},
				error:function(){//登录失败后的操作
					_util.showErrMsg(action+'失败~')
				}
			})
		}else{//验证不通过，出现错误提示
			formErr.show(formDataValidate.msg)//错误提示
		}
	},
	validate:function(formData){
		var result ={
			status:false,
			msg:''
		}
		//用户名非空验证
		if(!_util.validate(formData.name,'required')){
			result.msg = '用户名不能为空'
			return result
		}
		//省份非空验证
		if(!_util.validate(formData.province,'required')){
			result.msg = '省份不能为空~'
			return result
		}
		//城市非空验证
		if(!_util.validate(formData.city,'required')){
			result.msg = '城市不能为空~'
			return result
		}
		//详细地址不能为空
        if(!_util.validate(formData.address,'required')) {
            result.msg = "详细地址不能为空~"
            return result
        }        
		//手机号非空验证
		if(!_util.validate(formData.phone,'required')){
			result.msg = '手机号不能为空~'
			return result
		}
		//手机合法验证
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确~'
			return result
		}
		//以上验证全部通过，将status赋予true,然后再返回出去
		result.status = true;
		return result
	}
}