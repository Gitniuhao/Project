topicon();
toplistcont();
handleCarousel();
weixin();
// top区域
function toplistcont(){
	var oBtn1=document.getElementById('btn1');
	var oBtn2=document.getElementById('btn2');
	var oBtn3=document.getElementById('btn3');
	var oBtn4=document.getElementById('btn4');
	var oBox1=document.getElementById('box1');
	var oBox2=document.getElementById('box2');
	var oBox3=document.getElementById('box3');
	var oBox4=document.getElementById('box4');
	otopbtn = function(obtn,obox){
		obtn.onmouseenter = function(){
			obox.style.display = 'block';
		}
		obtn.onmouseleave = function(){
			obox.style.display = 'none';
		}
	}
	otopbtn(oBtn1,oBox1);
	otopbtn(oBtn2,oBox2);
	otopbtn(oBtn3,oBox3);
	otopbtn(oBtn4,oBox4);
}
//实现轮播图
function handleCarousel(){
	//创建对象
	new Carousel({
		id:'carousel',
		aImg:['../images/headerbackground.png','../images/headerbackground2.png','../images/headerbackground3.png'],
		width:1380,
		height:480,
		autoPlayTime:3000
	})
}
//回到顶部
function topicon(){
	var oTopicon = document.querySelector('.toptop .icon');
	var isShow = false;
	window.onscroll = function(){
		var wh = window.innerHeight - 400;
		if(getScrollTop() >= wh){
			if(!isShow){
				oTopicon.style.display = 'block';
				isShow= true;
			}
		}else{
			if(isShow){
				oTopicon.style.display = 'none';
				isShow = false;
			}
		}
	}
}
//微信二维码
function weixin(){
	var oMig = document.querySelector('.footer img');
	var oWbtn = document.getElementById('weixin');
	oWbtn.onmouseenter = function(){
		oMig.style.display = 'block';
	}
	oWbtn.onmouseleave = function(){
		oMig.style.display = 'none';
	}
}