var nav = require('pages/common/nav')//引进导航共通样式
// console.log(nav)
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索框样式
require('./index.css')
import Swiper from 'swiper'
require('node_modules/swiper/css/swiper.css')
var api = require('api')
var _util = require('util')
var swiperTpl = require('./swiper.tpl')
var categoriesTpl = require('./categories.tpl')

var page ={
	init:function(){
		this.loadCategories()
		this.loadSwiper()
		this.loadFloor()
	},
	loadCategories:function(){
		api.getHomeCategories({//加载首页分类列表
			success:function(result){
				// console.log(result)
				const data = result.data
				var html = _util.render(categoriesTpl,{
					categories:data
				})
				$('.categories').html(html)
			}
		})
	},
	loadSwiper:function(){
	 //先加载出来图片再集成swiper不会产生冲突
	  //加载广告
	  api.getPositionAds({
	  	data:{
           position:1
        },
	  	success:function(result){
	  		const data = result.data
	  		// console.log(data)
	  		var html = _util.render(swiperTpl,{
	  			slides:data
	  		})
	  		$('.swiper-wrapper').html(html)
	  		//集成swiper
	  		var mySwiper = new Swiper ('.swiper-container', {
			    loop: true, // 循环模式选项
			    autoplay:true,//自动轮播
			    // 如果需要分页器
			    pagination: {
			      el: '.swiper-pagination',
			      clickable :true,//点击按钮进行切换
			    },		    
			    // 如果需要前进后退按钮
			    navigation: {
			      nextEl: '.swiper-button-next',
			      prevEl: '.swiper-button-prev',
			    }
			})
	  	 }
	  })        
	},
	loadFloor:function(){
		api.getFloor({
			success:function(result){
				console.log(result)
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery)