require('pages/common')
require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
var _side = require('pages/common/side')
require('./index.css')
var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
require('util/pagination')

var page = {
	orderListParams:{
		page:_util.getParamsFromUrl('page') || '1',
		keyword:_util.getParamsFromUrl('keyword'),
	},
	init:function(){
		this.$orderBox = $('.order-box')
		//加载商品列表
		this.loadOrderList()	
		this.initPagination()
		this.renderSide()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		this.$pagination = $('.pagination-box')
		var _this = this
		this.$pagination.on('page-change',function(ev,page){
			//重新赋值page，然后请求页面数据进行渲染页面
			_this.orderListParams.page = page;
			_this.loadOrderList()
		})
		this.$pagination.pagination()//初始化分页器组件\
	},	
	loadOrderList:function(){
		var _this = this
		api.getOrderList({
			data:this.orderListParams,
			success:function(result){
				const data = result.data
				console.log(data)
				if(data.list.length >0){//如果list内有内容再进行渲染
					data.list.forEach(function(order){
						 order.createTime = new Date(order.createdAt).toLocaleString()
					})
					var html = _util.render(tpl,{
						list:data.list
					})
					_this.$orderBox.html(html)
					//渲染分页器到页面
					_this.$pagination.pagination('render',{
                        current:data.current,
                        total:data.total,
                        pageSize:data.pageSize
                    })
				}else{//list没有内容的话返回提示信息
					_this.$orderBox.html('<p class="empty-message">您还没有订单!</p>')
				}
				
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery);