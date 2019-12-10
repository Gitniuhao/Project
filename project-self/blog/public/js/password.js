(function($){
	var $formPassword = $('.form-password')
	$('.btn-sub-password').on('click',function(){
		var password = $formPassword.find('[name = password]').val();
		var repassword = $formPassword.find('[name = repassword]').val();
		var $err = $formPassword.find('.err')
		//规定密码可以是任意数字字母下划线，个数为5-10
		var passwordReg = /^\w{5,10}$/;
		if(!passwordReg.test(password)){//验证密码是否符合要求
			$err.eq(0).html('密码是5-10的任意字符，请重新设置!') 
			return false;
		}else{
			$err.eq(0).html('') 
		}
		if(repassword != password){//验证两次密码是否一致
			$err.eq(1).html('两次密码不一致，请重新输入!')
			return false;
		}else{
			$err.eq(1).html('')
		}
	})
})(jQuery);