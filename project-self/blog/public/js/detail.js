(function($){
	$('.btn-sub-comment').on('click',function(){
		var val = $('#comment-content').val()
		var $err = $('.err')
		//当输入框为空时的处理
		if(!val){
			$err.html('请输入评论后再提交！！')
			return
		}else{
			$err.html('')
		}
		//规定评论的字符长度
		if(val.length > 100){
			$err.html('评论长度不能超过100个字符！！')
			return
		}else{
			$err.html('')
		}
		//评论成功，发送ajax请求
		var id = $(this).data('id')
		$.ajax({
			url:'/comment/add',
			type:'POST',
			dataType:'json',
			data:{
				content:val,
				article:id
			}
		})
		.done(function(result){
			console.log(result)
		})
		.fail(function(){
			$err.html('评论失败，请稍后重试！！')
		})

	})
})(jQuery);