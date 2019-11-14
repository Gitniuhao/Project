;(function($){
var $register = $('#register') 
var $login = $('#login');
//1.1.登录 => 注册 没有账号，跳转注册页面
$('#go-register').on('click',function(){
	$login.hide();
	$register.show()
})
//1.1.注册 => 登录 已有账号，跳转到登录页面
$('#go-login').on('click',function(){
	$register.hide();
	$login.show()
})

//2.注册进行验证然后发送ajax请求
$('#sub-register').on('click',function(){
	var userName = $register.find('[name = username]').val()
	var passWord = $register.find('[name = password]').val()
	var rePassWord = $register.find('[name = repassword]').val()
	var $err = $register.find('.err')
	var errMassage = '';
	//规定用户名是字母开头，且后面可以是数字字母下划线，个数为3-8位
	var	userReg = /^[a-z]\w{2,7}$/i
	//规定密码可以是任意数字字母下划线，个数为5-10
	var passwordReg = /^\w{5,10}$/
	if(!userReg.test(userName)){//验证用户名是否符合要求
		errMassage = '用户名不符合要求，请重新命名'
	}else if(!passwordReg.test(passWord)){//验证密码是否符合要求
		errMassage = '密码不符合要求，请重新设置'
	}else if(rePassWord != passWord){//验证两次密码是否一致
		errMassage = '两次密码不一致，请重新输入'
	}else{//注册成功
		errMassage = ''
	}

	if(errMassage){
		$err.html(errMassage)
	}else{
		$err.html('')
		//发送ajax请求
		$.ajax({
			url:'/user/register',
			type:'POST',
			dataType:'json',
			data:{
				username:userName,
				password:passWord
			}
		})
		.done(function(date){
			console.log(data)
		})
		.fail(function(err){
			console.log(err)
		})
	}
})
})(jQuery);