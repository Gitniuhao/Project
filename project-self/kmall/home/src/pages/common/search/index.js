require('./index.css')
var api = require('api')
var _util = require('util')

const page ={
	init:function(){
		this.bindEvent()
		return this
	},
	bindEvent:function(){//绑定事件
		var _this = this
        $('#btn-search').on('click', function() {
            _this.submit()
        })
        $('#search-input').on('keyup', function(ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })
	},
	submit:function(){
		//获取数据
		var keyword = $.trim($('#search-input').val())
		window.location.href = '/list.html?keyword='+keyword
	}
}
module.exports = page.init();