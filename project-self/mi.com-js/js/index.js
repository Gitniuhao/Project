handleCart();
changeLogo();
handleNavContent();
handelCarousel();
handleBannerList();
handleTiemDown();
handelFlash();
handleElec();

//购物车交互部分
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box a');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = oCartContent.querySelector('.cart-content .loader');
	var oSpan = oCartContent.querySelector('.cart-content span');
	oCart.onmouseenter = function(){
		// console.log(11)
		oLoader.style.display = 'block'
		oCartBox.style.background = '#fff';
		oCartBox.style.color = '#ff6700';
		animation(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'block';
		})
	}
	oCart.onmouseleave = function(){
		oCartBox.style.background = '#424242';
		oCartBox.style.color = '#b0b0b0';
		animation(oCartContent,{height:0},true,function(){
			oSpan.style.display = 'none';
			oLoader.style.display = 'none';
		})
	}
}

//图标转换部分
function changeLogo(){
	var aLogo = document.querySelector('.header .logo');
	var aLogo1 = document.querySelector('.header .logo1');
	var aLogo2 = document.querySelector('.header .logo2');
	aLogo.onmouseenter = function(){
		animation(aLogo1,{left:55})
		animation(aLogo2,{left:0})
	}
	aLogo.onmouseleave = function(){
		animation(aLogo1,{left:0})
		animation(aLogo2,{left:-55})
	}
}
//下拉菜单交互部分
function handleNavContent(){
	function handleHide(){
		hideTimer =setTimeout(function(){
				animation(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = '';
			})
			},500)
	}
	//加载数据函数
	function loadDate(index){
		var date = aNavContentData[index];
		// console.log(date)
		var html ='<ul>'
			for(var i =0;i < date.length;i++){
				html += '<li>'
				html += '	<div class="img-box">'
				html += '		<a href="'+date[i].url+'"><img src="'+date[i].img+'" alt=""></a>'
				html += '		<p class="product-name">'+date[i].name+'</p>'
				if(date[i].price){
					html += '		<p class="product-price">'+date[i].price+'元起</p>'
				}				
				html += '	</div>'
				html += '</li>'
			}
		html += '</ul>';
		oNavContent.innerHTML = html;
	}
	var aNavItem = document.querySelectorAll('.header-nav .header-nav-list-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var hideTimer = 0 , loaderTimer = 0;
	// console.log(oNavContent)
	for(var i =0;i < aNavItem.length;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			oNavContent.innerHTML = '<div class="loader"></div>'
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200},true)
			var index = this.index;
			clearTimeout(loaderTimer);
			loaderTimer = setTimeout(function(){
				//加载数据
				loadDate(index);
			},250)
		}
		aNavItem[i].onmouseleave = function(){
			handleHide()
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		handleHide();
	}
}
//轮播图交互部分
function handelCarousel(){
		new Carousel({
	      id:'carousel',
	   	  aImg:['images/carousel1.jpg','images/carousel2.jpg','images/carousel3.jpg','images/carousel4.jpg'],
	      height :460,
	      width:1226,
	      autoPlayTime:5000
	   })
}
//分类列表交互部分
function handleBannerList(){
	function loadDate(index){
		//通过下标获取到对应的数据
		var date = aBannerListContnetDate[index];
		var html = '<ul>';
		for(var i =0;i <date.length;i++){
			html +=			'<li>'
			html +=			'	<a href="'+date[i].url+'">'
			html +=			'		<img src="'+date[i].img+'" alt="">'
			html +=			'		<span>'+date[i].name+'</span>'
			html +=			'	</a>'
			html +=			'</li>'
		}
		html += '</ul>'
		oListContent.innerHTML = html;
	}
	var aList = document.querySelectorAll('.banner .list li');
	var oListContent = document.querySelector('.banner .list-content');
	var oListBox = document.querySelector('.banner .list-box');
	// console.log(aList);
	// console.log(oListContent);
	// console.log(oListBox);
	for(var i = 0;i < aList.length;i++){
		aList[i].index = i;
		aList[i].onmouseenter = function(){
			for(var j = 0;j < aList.length; j++){
				aList[j].className = 'list-item';
			}
			this.className = 'list-item active';
			oListContent.style.display = 'block';
			loadDate(this.index)
		}
	}
	oListBox.onmouseleave = function(){
		oListContent.style.display = 'none';
		for(var j = 0;j < aList.length; j++){
				aList[j].className = 'list-item';
			}	
	}
}
//倒计时交互部分
function handleTiemDown(){
	function to2Str(num){
		return num <10? '0'+num : ''+num;
	}
	var aTimeNum = document.querySelectorAll('.flash .timer-shuzi')
	// console.log(aTimeNum)
	var endDate = new Date('2019-9-5 15:00:00');
	var endTime = endDate.getTime();
	var downTimer = 0;
	function handleTime(){
		var allTime = parseInt((endTime - Date.now())/1000);
		if(allTime < 0){
			allTime = 0;
			clearInterval(downTimer);
		}
		var iHour = parseInt(allTime / 3600);
		var iMinute = parseInt((allTime % 3600)/60);
		var iSecond = (allTime % 3600)%60;
		// console.log(iSecond)
		aTimeNum[0].innerHTML = to2Str(iHour); 
		aTimeNum[1].innerHTML = to2Str(iMinute); 
		aTimeNum[2].innerHTML = to2Str(iSecond); 
	}
	downTimer = setInterval(handleTime,500);
	handleTime()	
}
//小米闪购交互部分
function handelFlash(){
	var aSpan = document.querySelectorAll('.flash .more span');
	var oProducte = document.querySelector('.flash .right-bd .producate');
	// console.log(aSpan);
	// console.log(oProducte);
	aSpan[0].onclick = function(){
		oProducte.style.marginLeft = '0' + 'px';
	}
	aSpan[1].onclick = function(){
		oProducte.style.marginLeft = '-978' + 'px';
	}
}
//家电选项卡交互部分
function handleElec(){
	function loadDate(index){
		var data = aBdListContentDate[index];
		var html = '<ul class="producate">'
		for(var i = 0;i < data.length-1;i++){
		    html +=' <li class="bd-item spec>';
			html +='	<a href="'+data[i].url+'" class="item-ctr">';
			html +='		<img   src="'+data[i].img+'" alt="">';
			html +='		<p class="producate-name">'+data[i].name+'</p>';
			html +='	</a>';
			html +='	<div class="num">'
			html +='	<p class="producate-desc">'+data[i].desc+'</p>';
			html +='	<p class="producate-price">';
			html +='		<span>'+data[i].price+'元</span>';
			if(data[i].del){
				html +='		<del>'+data[i].del+'元</del>';
			}			
			html +='	</p>';
			html +='	</div>'
			if(data[i].flag){
				html +='	<span class="flag '+data[i].flag.name+'">'+data[i].flag.content+'</span>';
			}
			if(data[i].comment){
				html +='	<div class="comment">';
				html +='		<p class="comment-content">'+data[i].comment.content+'</p>';
				html +='		<p class="comment-author">来自于 <span>'+data[i].comment.author+'</span> 的评价</p>';
				html +='	</div>';
			}
			html +='</li>';
		}
		var lastDate =data[data.length-1];
			html +=' <li class=" producate-item top-item transition">'
			html +=' 	<a href="'+lastDate.top.url+'" class="mg"></a>'
			html +=' 	<p>'+lastDate.top.desc+'</p>'
			html +=' 	<p class="num">'+lastDate.top.price+'</p>'
			html +=' 	<img src='+lastDate.top.img+' alt="">'
			html +=' </li>'
			html +=' <li class=" producate-item bottom-item transition">'
			html +=' 	<a href="'+lastDate.bottom.url+'" class="mg"></a>'
			html +=' 	<p class="view">浏览更多</p>'
			html +=' 	<p class="hot">'+lastDate.bottom.name+'</p>'
			html +=' 	<i class="iconfont">'+lastDate.bottom.icon+'</i>'
			html +=' </li>'
		html += '</ul>';
		oRightBd.innerHTML = html;

	}
 var aSpan = document.querySelectorAll('.elec .more span');
 var oRightBd = document.querySelector('.elec .right-bd');
 // console.log(oRightBd);
 loadDate(0);
 for(var i =0;i < aSpan.length;i++){
 	aSpan[i].index = i;
 	aSpan[i].onmouseenter = function(){
 		for(var j =0;j < aSpan.length;j++){
 			aSpan[j].className = 'tab-item'
 		}
 		this.className = 'tab-item actived';
 		loadDate(this.index);

 	}
 }
}
