var tpl = require('./index.tpl')
var _util = require('util')
;(function($){
	function Pagination($elem){
		this.$elem = $elem
		this.bindEvent()
	}
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){//绑定事件

		},
		render:function(options){
			// console.log(options)
			//1计算出总页数,向上取整
			var pages = Math.ceil(options.total / options.pageSize)
			// console.log(pages)
			//渲染分页器
			_util.render(tpl,{

			})
		}
	}
	Pagination.DEFAULT = {

	}
	 $.fn.extend({
		pagination:function(fn,options){
			// console.log(this) this是一个jQuery对象
			return this.each(function(){
				// console.log(this) 这里的this是一个dom节点
				var $this = $(this)
				var pagination = $this.data('pagination')
				//单列模式
				if(!pagination){//如果dom节点上没有data:pagination,则生成实例对象
					pagination = new Pagination($this)
					$this.data('pagination',pagination)
				}
				//如果传入组件内的参数fn的类型是函数的话，就执行
				if(typeof pagination[fn] == 'function'){
					pagination[fn]($.extend({},Pagination.DEFAULT,options))
				}
			})
		}
	})
})(jQuery);