handleCart()
navFixed()

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
//导航栏定位交互部分
function navFixed(){
	var oNav = document.querySelector('.header');
	window.onscroll = function(){
		if(getScrollTop() >= 700){
				oNav.style.position = 'fixed';
				oNav.style.zIndex = 999;
				oNav.style.top = 0;
		}else{
				oNav.style.position = 'static';
		}
	  }
    }


