var { API_CONFIG } = require('./config.js')
var _util = require('util')

const getApiObj = (API_CONFIG)=>{
	const apiObj = {}
	for(let key in API_CONFIG){//遍历对象里的每一项
		 apiObj[key] = (options)=>{//apiObj[key]为apiObj这个对象里的一项
		 	let url = API_CONFIG[key][0] || '/';//将API_CONFIG[key]第0项赋予apiObj里的url
		 	let method = API_CONFIG[key][1] || 'get';
		 	//发送请求
		 	return request({
				url:url,
				method:method,
				data:options.data,
				success:options.success,
				error:options.error
			})
		 } 
	}
	return apiObj
}

const request = (options)=>{//在这个函数里发送ajax请求
	$.ajax({
		url:options.url,
		method:options.method,
		dataType:'json',
		data:options.data,
		success:function(result){
			if(result.code == 0){//登录成功
				options.success && options.success(result)
			}else if(result.code == 1){//登录失败，账号或密码错误
				options.error && options.error(result.message)
			}else if(result.code == 10){//登录失败，没有管理员权限
				_util.goLogin()//跳转到登录页面
			}
		},
		error:function(err){
			options.error && options.error('网络失败，请稍后重试~')
		}
	})	
}

module.exports = getApiObj(API_CONFIG)