	handleCart();
	handleNavContent();
	handleCarousel(); 
	handleList();
	function animation(obj,options,isLinear,fnEnd){
	//让动画默认就是匀速执行
	if(isLinear == undefined){
		isLinear = true;
	} 
	//防止开启多个定时器
	clearInterval(obj.timer);
	var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
	obj.timer = setInterval(function(){//开启定时器
		var isStopAll = true;//当这个值为真是，关闭定时器，停止所有动画
		for(var attr in options){
			var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
			if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
				current = Math.round(current *100);
			}
			if(isLinear){//执行匀速动画
				//匀速动画速度
				if(current < options[attr]){
					iSpeed = 15;
				}else{
					iSpeed = -15;
				}
				//匀速动画的结束条件
				if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
					if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
						obj.style[attr] = options[attr]/100;
					}else{
						obj.style[attr] = options[attr] + 'px';
					}
				}else{
					isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
				}
			}else{//减速动画
				//减速动画速度
				iSpeed = (options[attr] - current)/10;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//减速动画的结束条件
				if(iSpeed){
					isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
				}
			}
			if(isStopAll){//判断此变量，决定是否关闭定时器
				clearInterval(obj.timer);//关闭定时器
				typeof fnEnd == 'function' && fnEnd();//如果有传入函数的话，执行否则不执行
			}else{//不停止动画，继续执行
				if(attr == 'opacity'){
					obj.style[attr] = (current + iSpeed)/100;
				}else{
					obj.style[attr] = current + iSpeed +'px';
				}
			}
		}
		
	},50)
}  

 	function handleCarousel(){
		new Carousel({
			id:'carousel',
			aImg:['../images/lbt-1.jpg','../images/lbt-2.jpg','../images/lbt1.jpg'],
			width:1314,
			height:620,
			autoPlayTime:2000
		})
	}

	//购物车交互功能
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box a');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = oCartContent.querySelector('.loader');
	var oSpan = oCartContent.querySelector('span');
	//2.绑定事件
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';
		oCartBox.style.backgroundColor = '#fff';
		oCartBox.style.color = '#ff6700';
		// oCartContent.style.height = '100px';
 
		animation(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'block';
		});

		
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartBox.style.color = '#b0b0b0';
		// oCartContent.style.height = '100px';
		animation(oCartContent,{height:0},true,function(){
			oSpan.style.display = 'none';
			oLoader.style.display = 'none';
		});
		
	}
}

//下拉菜单交互功能
function handleNavContent(){
	//1.获取元素
	var aNavtiem = document.querySelectorAll('.header .header-nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentBox = oNavContent.querySelector('.container')
	var hideTimer = 0,loadTimer = 0;
	for(var i=0;i<aNavtiem.length-2;i++){
		aNavtiem[i].index = i;
		aNavtiem[i].onmouseenter = function(){
			oNavContentBox.innerHTML = '<div class="loader"></div>'
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200});
			var index = this.index;
			//加载数据
			clearTimeout(loadTimer)
			loadTimer = setTimeout(function(){
				loadData(index);
			},1000)
			
		}
		aNavtiem[i].onmouseleave = function(){
			handleHide();
			
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		handleHide();
	}
	function handleHide(){
		hideTimer =setTimeout(function(){
			animation(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = '';
			})
		},500)
	}
	function loadData(index){
		console.log(index)
		var data = aNavContentData[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html +=' <li>';
			html +='	<div class="img-box">';
			html +='		<a href="'+data[i].url+'"><img src="'+data[i].img+'" alt=""></a>';
			html +='	</div>';
			html +='	<p class="product-name">'+data[i].name+'</p>';
			html +='	<p class="product-price">'+data[i].price+'元起</p>';
			html +='</li>';
		}

		html += '</ul>';
		oNavContentBox.innerHTML = html;
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
	var oNav = document.querySelector('.header .header-nav .header-nav-item1');
	var oListCon = document.querySelector('.header .header-nav .list');
	var aList = document.querySelectorAll('.header .list li');
	var oListContent = document.querySelector('.header .list-box .list-content');
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