 
 handleCart();
 changeLogo();
 handleList();
 handleNavContent();
 navFixed()
 handelTab();

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
//分类列表交互部分
function handleList(){
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
	var oNav = document.querySelector('.header .header-nav .nav-all');
	var oListCon = document.querySelector('.header .header-nav .list');
	var aList = document.querySelectorAll('.header .list li');
	var oListContent = document.querySelector('.header .list-content');
	var oNavTop = document.querySelector('.header .nav-top');
	oNav.onmouseenter = function(){
		oListCon .style.display = 'block';
	}
	oNav.onmouseleave = function(){
		oListCon .style.display = 'none';
	}
	oListCon.onmouseenter = function(){
		oListCon .style.display = 'block';
	}
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
	oNavTop.onmouseleave = function(){
		oListContent.style.display = 'none';
		oListCon .style.display = 'none';
		for(var j = 0;j < aList.length; j++){
				aList[j].className = 'list-item';
			}	
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
		console.log(date)
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
//导航栏定位交互部分
function navFixed(){
	var oNav = document.querySelector('.main .main-nav');
	// console.log(oNav)
	// var isFixed = false;
	window.onscroll = function(){
		if(getScrollTop() >= 234){
				oNav.style.position = 'fixed';
				oNav.style.zIndex = 999;
				oNav.style.top = 0;
		}else{
				oNav.style.position = 'static';	
		}
	  }
   }
//选项卡交互部分
function handelTab(){
	var aBtn = document.querySelectorAll('.main .main-nav #btn-list li');
	var oContent = document.querySelector('.main .main-content #content-list');	
	loadDate(0);
	for(var i = 0;i<aBtn.length;i++){
		aBtn[i].index = i;
		aBtn[i].onclick = function(){
			for(var j =0;j<aBtn.length;j++){
				aBtn[j].className = 'main-nav-list';
			}
			this.className = 'main-nav-list active';
			// aContentList[this.index].style.display = 'block';
			loadDate(this.index);
		}
	}	
	function loadDate(index){
		var data = aContentData[index];
		var html = '<li class="main-content-list">';	
	 		html +=	   '<ul>';
		for(var i=0;i<data.length;i++){
			 html +=	   '	<li class="main-content-item transition">';
			 html +=	   '		<a href="javascript:;">';
			 html +=	   '			<img src="'+data[i].img+'" alt="">';
			 html +=	   '			<div class="name">'+data[i].name+'</div>';
			 html +=	   '			<p class="desc">'+data[i].desc+'</p>';
			 html +=	   '			<span class="price">'+data[i].price+'</span>';
			 html +=	   '			<del>'+data[i].del+'</del>';			 
			 if(data[i].flagtx){
			 	html +=	   '			<div class="flag flagtx">'+data[i].flagtx+'</div>';
			 }else{
			 	html +=	   '			<div class="flag">'+data[i].flag+'</div>';
			 }
			if(data[i].tx){
				 html +=     '            <div class="tx">'+data[i].tx+'</div>';
			}
			 html +=	   '		</a>';
			 html +=	   '	</li>';
		}			
		 html +=	   '</ul>';
		 html +=	'</li>';
		oContent.innerHTML = html;
	}
	
}
 // 倒计时部分代码
		var oTimer =document.getElementById('timer');
		var endDate=new Date('2019-9-28 18:00:00');
		var endTime=endDate.getTime();
		function to2Str(num){
				return num<10? '0'+num : ''+num;
			}					
		function handleTime(){
			var allTime =parseInt((endTime-Date.now())/1000);
			if(allTime<=0){
				allTime=0;
				clearInterval(time);
			}	
			var iHour =parseInt(allTime/3600);
			var iMinute =parseInt((allTime%3600)/60);
			var iSecond =parseInt((allTime%3600)%60);
			oTimer.innerHTML='距结束'+to2Str(iHour)+':'+to2Str(iMinute)+':'+to2Str(iSecond);
		}	
		var time =setInterval(handleTime,1000);
		handleTime();

