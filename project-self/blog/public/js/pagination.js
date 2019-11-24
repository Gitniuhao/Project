(function($){//编辑分页组件
	$.fn.extend({
		pagination:function(options){
			var $elem = this//this就是#page
			$elem.on('click','a',function(){
				var $this = $(this)//而这里的this是通过事件委托而得出的其中的a标签
				//1.获取当前页的页码
				var currentPage = $elem.find('.active a').html()/1;
				//2.根据当前页计算出点击的页码
				//根据属性的值得出内容
				var labelText = $this.attr('aria-label')
				var page = 1;
				if(labelText == 'Next'){//如果属性的值是'next',那就当前页加一
					page = currentPage + 1
				}else if(labelText == 'Previous'){//如果属性的值是'Previous',那就当前页减一
					page = currentPage - 1
				}else{//如果得出是页码,那就等于当前页
					page = $this.html()/1
				}
				//如果点击当前页阻止请求
				if(page == currentPage){
					return false;
				}
				//3.发送ajax请求
				//因为在列表页获取到的不是精准的一类，而是所有的，所以由后台把id传到前台进行就能精准渲染
				var id = $elem.data('id');
				var url = options.url+"?page="+page
				if(id){
					url = url+"&id="+id
				}
				$.ajax({
					url:url,
					type:"GET",
					dataType:'json'
				})
				.done(function(result){
					// console.log(result)
					$elem.trigger('get-data',result.data)
				})
				.fail(function(err){
					console.log(err)
				})
			})
		}
	})
})(jQuery);