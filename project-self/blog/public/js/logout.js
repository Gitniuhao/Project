;(function($){
$('#logout').on('click',function(){
	$.ajax({
		url:'/user/logout',
		type:'GET',
	})
	.done(data =>{
		//退出登录成功就跳转到首页
		if(data.code == 0){
			window.location.href ='/' ;
		}
	})
	.fail(err =>{
		$userInfo.find('.err').html('请求失败，请稍后重试！')
	})
})
})(jQuery);
