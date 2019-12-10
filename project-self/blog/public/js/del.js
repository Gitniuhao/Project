(function($){
	$('.del').on('click',function(){
		if(!window.confirm('您确定要删除这条数据？')){
			return false;
		}
	})
})(jQuery);