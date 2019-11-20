(function($){
	ClassicEditor
	.create(document.querySelector('#content'),{
		language:'zh-cn',
		ckfinder:{//后台即将要接收的路由
			uploadUrl:'/article/uploadImg'
		}
	})
	.catch(err =>{
		console.log(err)
	})
})(jQuery);