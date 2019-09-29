handleNvbcontent();
handleCate();
handleCart();
popout();
//弹框
function popout(){
	//下载APP
	var oApp = document.querySelector('#xiazaiapp');
	var oAppBox = document.querySelector('.appbox');
	oApp.onmouseenter = function(){
		oAppBox.style.display = 'block';
	}
	oApp.onmouseleave = function(){
		oAppBox.style.display = 'none';	
	}

	//logo
	var oLogo = document.querySelector('.logo1');
	var oLogoBox = document.querySelector('.logobox');
	oLogo.onmouseenter=function(){
		animate(oLogoBox,'left',0);
	}
	oLogo.onmouseleave=function(){
		animate(oLogoBox,'left',-55);
	}
	//问号
	var oApp1 = document.querySelector('.cont2-txt div i');
	var oAppBox1 = document.querySelector('.appbox1');
	oApp1.onmouseenter = function(){
		oAppBox1.style.display = 'block';
	}
	oApp1.onmouseleave = function(){
		oAppBox1.style.display = 'none';	
	}
}
//购物车
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.top .top-cart');
	var oCartBox = document.querySelector('.top .top-cart a');
	var oCartContent = document.querySelector('.top .top-cart .cart-js');
	var oLoader = document.querySelector('.loader');
	var oSpan = document.querySelector('.top .top-cart .cart-js span');
	//2.绑定事件
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';
		oCartBox.style.backgroundColor = '#fff';
		oCartBox.style.color = '#ff6700';
		// oCartContent.style.height = 100+'px';
		animate3(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'block';
		});
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartBox.style.color = '#b0b0b0';
		animate3(oCartContent,{height:0},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'none';
		});
	}
}
//下拉菜单交互功能
function handleNvbcontent(){
	//1.获取元素
	var aNvbtiem = document.querySelectorAll('.header .header-nvb li');
	var oNvbContent = document.querySelector('.header .header-nvb-content');
	var oNvbContentBox = oNvbContent.querySelector('.container')
	var hideTimer =0,loadTimer =0;
	for(var i=0;i<aNvbtiem.length-2;i++){
		aNvbtiem[i].index = i;
		aNvbtiem[i].onmouseenter = function(){
			oNvbContentBox.innerHTML = '<div class="loader"></div>';
			clearTimeout(hideTimer);
			oNvbContent.style.borderTop='1px solid #ccc';
			animation(oNvbContent,{height:230},true);
			//加载数据
			var index = this.index;
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				loadData(index);
			},500)
		}
		aNvbtiem[i].onmouseleave = function(){
			handleHide();
		}
	}
	oNvbContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNvbContent.onmouseleave = function(){
		handleHide();
	}
	//收起菜单+延时定时器
	function handleHide(){
		hideTimer = setTimeout(function(){
			oNvbContent.style.borderTop='1px solid #ccc';
			animation(oNvbContent,{height:0},true,function(){
				oNvbContent.style.borderTop = '';
			});
		},500)
	}
	//加载数据函数
	function loadData(index){
		// console.log(index)
		var data  = aNvbContentData[index];
		var html = '<ul>';
		for(var i= 0;i<data.length;i++){
			html += '<li>';
			html +=	'	<div class="img-box">';
			html +=	'		<a href="'+data[i].url+'"><img src="'+data[i].img+'" alt=""></a>';
			html +=	'	</div>';
			html +=	'	<p class="product-name">'+data[i].name+'</p>';
			html +=	'	<p class="product-price">'+data[i].price+'元</p>';
			html +=	'</li>';
		}

		html += '</ul>'
		oNvbContentBox.innerHTML = html;
	}
}
//全部商品分类
function handleCate(){
	var oBtnsp = document.querySelector('.header .nvbtop a');
	var oBoxLi = document.querySelector('.lun-lu');
	
	var aCateItem = document.querySelectorAll('.cate .cate-item'); //列表里每个li
	var oCateContent = document.querySelector('.cate-box .cate-content'); //内容
	var oCartBox = document.querySelector('.cate-box');  //大盒子
	//显示列表栏
	oBtnsp.onmouseenter =function(){
		oBoxLi.style.display = 'block';
	}
	oBtnsp.onmouseleave =function(){
		oBoxLi.style.display = 'none';
	}
	for(var i=0;i<aCateItem.length;i++){
		aCateItem[i].index = i;
		aCateItem[i].onmouseenter = function(){
			for(var j=0;j<aCateItem.length;j++){
				aCateItem[j].className = 'cate-item';
			}
			this.className = 'cate-item active';
			oCateContent.style.display = 'block';
			//加载数据
			loadData(this.index);
		}
	}
	oCartBox.onmouseenter =function(){
		oBoxLi.style.display = 'block';
	}
	oCartBox.onmouseleave = function(){
		oCateContent.style.display = 'none'
		oBoxLi.style.display = 'none';
		for(var j=0;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item';
		}
	}
	function loadData(index){
		//通过下标获取对应的数据
		var data = aCateContentData[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html += '<li>';
			html += '	<a href="'+data[i].url+'">';
			html += '		<img src="'+data[i].img+'">';
			html += '		<span>'+data[i].name+'</span>';
			html += '	</a>';
			html += '</li>';
		}
		    html += '</ul>';
		oCateContent.innerHTML = html;
	}
}