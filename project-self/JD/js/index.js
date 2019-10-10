;(function($){
	handleDropDown();
	handleSearch();
	handleCategory();
	handleCarousel();
	handleTodays();
	handleTab();


	//共通只加载一次html
	function loadHtmlOnce($elem,cb){
	  // var $elem = $(this);
	  var $layer = $elem.find('.dropdown-layer');
	  var dataUrl = $elem.data('url');		
	  if(!dataUrl) return;
	  if($elem.data('isLoaded')) return;
	  	$.getJSON(dataUrl,function(data){
	  		$elem.data('isLoaded',true);
	  		// var html ='';
	  		// for(var i=0;i<data.length;i++){
	  		// 	html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
	  		// }
	  		// setTimeout(function(){
	  		// 	$layer.html(html);
	  		// },1000)
	  		typeof cb == 'function' && cb(data,$layer);				
	  })
	}
	//封装加载图片的函数
	function loadImage(imgUrl,success,error){
		var image = new Image();//得到一个实例
		image.onload = function(){//成功时的回调
			success();
		}
		image.onerror = function(){//失败时的回调
			error();
		}
		//模仿延迟加载图片
		setTimeout(function(){
			image.src = imgUrl;//表明去哪个地址请求图片
		},500)		
	}
	//轮播图图片懒加载共通
	function carouselLazyLoad($elem){
		$elem.item = {};
		$elem.loadItemNum = $elem.find('.carousel-item').length;
		$elem.loadedItemNum = 0;//表示已经加载过几张图片 
		$elem.fnload = null;
		
		//开始加载
		$elem.on('carousel-show',$elem.fnload = function(ev,index,elem){
			$elem.trigger('load',[index,elem])
			
		})
		//执行加载
		$elem.on('load',function(ev,index,elem){
			if($elem.item[index] != 'loaded'){//使得图片只加载一次
				// console.log('load',index);
				//加载图片
				//找到图片标签
				var $imgs = $(elem).find('.carousel-img');
				$imgs.each(function(){
					var $img = $(this);
					//拿到真正的图片地址
					var imgUrl = $img.data('src');
					//获取到图片
					loadImage(imgUrl,function(){
						$img.attr('src',imgUrl);
					},function(){
						$img.attr('src',"images/focus-carousel/placeholder.png")
					})
				})
					$elem.item[index] = 'loaded';	
					$elem.loadedItemNum ++;
					if($elem.loadedItemNum == $elem.loadItemNum){//当加载过的图片和图片的数量想等时,去掉carousel-show事件
						$elem.trigger('carousel-loaded');
					}				
				}
			})
			
		//加载结束
		$elem.on('carousel-loaded',function(ev){
			$elem.off('carousel-show',$elem.fnload);
		})
	}
	//选项卡图片懒加载
	function floorImageLazyLoad($elem){
		$elem.item = {};
		$elem.loadItemNum = $elem.find('.tab-item').length;
		$elem.loadedItemNum = 0;//表示已经加载过几张图片 
		$elem.fnload = null;
		
		//开始加载
		$elem.on('floor-show',$elem.fnload = function(ev,index,elem){
			$elem.trigger('floor-load',[index,elem])
			
		})
		//执行加载
		$elem.on('floor-load',function(ev,index,elem){
			if($elem.item[index] != 'loaded'){//使得图片只加载一次
				// console.log('load',index);
				//加载图片
				//找到图片标签
				var $imgs = $(elem).find('.floor-img');
				$imgs.each(function(){
					var $img = $(this);
					//拿到真正的图片地址
					var imgUrl = $img.data('src');
					//获取到图片
					loadImage(imgUrl,function(){
						$img.attr('src',imgUrl);
					},function(){
						$img.attr('src',"images/floor/placeholder.png")
					})
				})
					$elem.item[index] = 'loaded';	
					$elem.loadedItemNum ++;
					if($elem.loadedItemNum == $elem.loadItemNum){//当加载过的图片和图片的数量想等时,去掉floor-show事件
						$elem.trigger('floor-loaded');
					}				
				}
			})
			
		//加载结束
		$elem.on('floor-loaded',function(ev){
			$elem.off('floor-show',$elem.fnload);
		})
	}

	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
		var $layer = $dropdown.find('.dropdown-layer');
	    $dropdown.dropDown({delay:200});
	    $dropdown.on('dropDown-show',function(ev){
	    	// var $elem = $(this);
	    	// var $layer = $elem.find('.dropdown-layer');
	    	// var dataUrl = $elem.data('url');		
	    	// if(!dataUrl) return;
	    	// if($elem.data('isLoaded')) return;
	    	// 	$.getJSON(dataUrl,function(data){
	    	// 		$elem.data('isLoaded',true);
	    	// 		var html ='';
	    	// 		for(var i=0;i<data.length;i++){
	    	// 			html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
	    	// 		}
	    	// 		setTimeout(function(){
	    	// 			$layer.html(html);
	    	// 		},1000)				
	    	// })
	    	loadHtmlOnce($(this),createHtml);	    	
	    	$layer.zIndex = 99;
	    	function createHtml(data,$layer){
	    		var html ='';
	  			for(var i=0;i<data.length;i++){
	  				html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
	  			}
	  			setTimeout(function(){
	  				$layer.html(html);
	  			},1000)
	    	}
	     })	    	
	  }


	function handleSearch(){
		$('.search').search();
		//组件外拿到数据成功后的操作
		$('.search').on('getData',function(ev,data){
			// console.log(data)
			//1.将获取的数据包装成html代码
			var html = createLayerHtml(data,8);
			//2.将html代码放入下拉层中
			$('.search').search('addHtml',html);
			//3.将下拉层显示出来
			$('.search').search('showLayer');
		});
		//组件外拿数据失败后的操作
		$('.search').on('getNoData',function(){
			$('.search').search('hideLayer','');
			$('.search').search('addHtml');
		})
		function createLayerHtml(data,itemNum){
			var html = '';
			for(var i=0;i<data.result.length;i++){
				if(i >= itemNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>'
			}
			return html;
		}
	}

	function handleCategory(){
		var $dropdown = $('.category .dropdown');
		$dropdown.on('dropDown-show',function(ev){
			// var $elem = $(this);
			// var $layer = $elem.find('.dropdown-layer'); 
			// var dataaUrl = $elem .data('url');
			// if(!dataUrl) return;
			// if($elem.data('isLoaded')) return;
			// $.getJSON(dataUrl,function(data){
			// 	$elem.data('isLoaded',true);
			// 	var html = '';
			// 	console.log(data)
			// 	for(var i=0;i<data.length;i++){
			// 		html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
			// 		for(var j=0;j<data[i].items.length;j++){
			// 			html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
			// 		}
			// 		html += '</dd></dl>'
			// 	}
			// 	//.模仿数据加载
			// 	setTimeout(function(){
			// 		$layer.html(html);
			// 	},1000)
				
			// })
			loadHtmlOnce($(this),createHtml);
	    	function createHtml(data,$layer){
	    		var html ='';
	  			for(var i=0;i<data.length;i++){
					html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
					}
					html += '</dd></dl>'
				}
	  			setTimeout(function(){
	  				$layer.html(html);
	  			},1000)
	    	}
		})
		$dropdown.dropDown({delay:200,js:true,mode:"fade"});	
	}
	
	function handleCarousel(){
		var $carousel = $('.focus .carousel-wrap');
		carouselLazyLoad($carousel);
		$carousel.carousel();
	}

	function handleTodays(){
		var $carousel = $('.todays .carousel-wrap');
		carouselLazyLoad($carousel);
		$carousel.carousel({interval:4000});
	}

	function handleTab(){
		var $floor = $('.floor');
		$floor.each(function(){
			floorImageLazyLoad($(this));
		})
		$floor.tab({});
	}
})(jQuery);