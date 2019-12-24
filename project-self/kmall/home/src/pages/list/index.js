require('pages/common')
require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
require('./index.css')
var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
require('util/pagination')

var page = {
	productsListParams:{
		page:_util.getParamsFromUrl('page') || '1',
		category:_util.getParamsFromUrl('categoryId'),
		keyword:_util.getParamsFromUrl('keyword'),
		orderBy:_util.getParamsFromUrl('orderBy') || 'default',
	},
	init:function(){
		//加载商品列表
		this.loadProductsList()	
		//绑定事件
		this.bindEvent()
		this.initPagination()
	},
	initPagination:function(){
		this.$pagination = $('.pagination-box')
		this.$pagination.pagination()//初始化分页器组件\
		var _this = this
		this.$pagination.on('page-change',function(ev,page){
			//重新赋值page，然后请求页面数据进行渲染页面
			_this.productsListParams.page = page;
			_this.loadProductsList()
		})
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){//绑定点击事件
			// console.log(this)
			var $this = $(this)
			//点击按默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return
				}
				//先给自身添加active类，再把兄弟的active类删除
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				//将排序方式再赋值default
				_this.productsListParams.orderBy = 'default'
			}else if($this.hasClass('price')){//点击按价格排序
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				if($this.hasClass('asc')){//如果类名是升序，先删除升序类，再添加降序类，最后赋值降序
					$this.removeClass('asc')
					.addClass('desc')
					_this.productsListParams.orderBy = 'price_desc'
				}else if($this.hasClass('desc')){//如果类名是降序类，先删除降序类，再添加升序类，最后赋值升序
					$this.removeClass('desc')
					.addClass('asc')
					_this.productsListParams.orderBy = 'price_asc'
				}
			}
			//再赋值page,然后再请求一次商品列表
			_this.productsListParams.page = 1;
			_this.loadProductsList()
		})
	},
	loadProductsList:function(){
		var _this = this
		api.getProductsList({
			data:this.productsListParams,
			success:function(result){
				const data = result.data
				// console.log(data)
				if(data.list.length >0){//如果list内有内容再进行渲染
					var html = _util.render(tpl,{
						list:data.list
					})
					$('.product-list-box').html(html)
					//渲染分页器到页面
					_this.$pagination.pagination('render',{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total
					})
				}else{//list没有内容的话返回提示信息
					$('.product-list-box').html('<p class="empty-message">您找的商品去火星了!</p>')
				}
				
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery);