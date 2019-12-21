var Hogan = require('hogan.js')
module.exports = {
	validate:function(values,type){
		//非空验证,当验证类型为required时，如果有值，则用双重否定转换成布尔值
		if(type == 'required'){
			return !!values
		}
		//用户名合法验证，利用正则表达式然后test传入的value,从而返回布尔值
		if(type == 'username'){
			return /^[a-z][a-z0-9_]{2,5}$/.test(values)
		}
		//密码合法验证
		if(type == 'password'){
			return /^\w{3,6}$/.test(values)
		}
		//手机号合法验证
		if(type == 'phone'){
			return /^1[3578]\d{9}$/.test(values)
		}
		//邮箱验证:1942472006@qq.com
		if(type == 'email'){
			return /^\w+@\w+\.\w{2,3}$/.test(values)
		}
	 },
	 showSuccessMsg:function(msg){//弹出成功提示信息
	 	alert(msg)
	 },
	 showErrMsg:function(msg){//弹出失败提示信息
	 	alert(msg)
	 },
	 goLogin:function(){//跳转到登录页面
	 	window.location.href = '/user-login.html'
	 },
	 getParamsFromUrl:function(key){//从url中获取参数
	 	var query = window.location.search.substr(1)//去掉?
	 	var reg = new RegExp('(^|&)'+key+'='+'([^&]*)(&|$)')
	 	var result = query.match(reg)
	 	return result ? decodeURIComponent(result[2]) : null
	 },
	 render:function(tpl,data){//动态渲染页面
	 	var template = Hogan.compile(tpl);
		var html = template.render(data);
		return html;
	 }
}