require('pages/common')//引进共通样式
require('pages/common/footer')//引进底部导航共通样式
require('pages/common/logo')//引进logo样式
require('pages/common/side')//引进side样式
require('pages/common/nav')//引进nav样式
require('pages/common/search')//引进search样式
var _util = require('util')
var api = require('api')
require('./index.css')
var _side = require('pages/common/side')


var page ={
	init:function(){//初始化事件
		this.renderSide()
	},
	renderSide:function(){
		_side.render('.user-center')
	}
}


;(function($){
	page.init()
})(jQuery);