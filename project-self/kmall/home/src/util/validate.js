module.exports = function(values,status){
	//非空验证
	if(values == 'required'){
		return !!values
	}
	//用户名合法验证
	if(values.username){
		return /^[a-z][a-z0-9_]{2,5}$/i.test(values.username)
	}
	if(values.password){
		return /^\w{3,6}$/.test(values.password)
	}
}