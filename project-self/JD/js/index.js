;(function($){
	handleDropDown();
	handleSearch();
	handleCategory();
	handleCarousel();


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

	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
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
		var $carousel = $('.carousel-wrap');
		$carousel.carousel({});
	}
	
})(jQuery);