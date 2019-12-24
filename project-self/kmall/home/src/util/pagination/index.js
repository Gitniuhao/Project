var tpl = require('./index.tpl')
var _util = require('util')
;(function($){
	function Pagination($elem){
		this.$elem = $elem
		this.bindEvent()
	}
	Pagination.prototype = {
		constructor:Pagination,//初始化组件
		bindEvent:function(){//绑定事件
			var _this = this
			this.$elem.on('click','.page-item',function(){
				// console.log(this)
				var $this = $(this)
				//如果所点击的按钮是禁止的或者是当前按钮，则直接停止下面的操作
				if($this.hasClass('disabled') || $this.hasClass('active')){
					return
				}
				var page = $this.data('value')
				_this.$elem.trigger('page-change',page)
			})
		},
		render:function(options){
			// console.log(options)
			//1计算出总页数,向上取整
			var pages = Math.ceil(options.total / options.pageSize)
			// console.log(pages)
			//2、得出分页器数据
			var pageArray = []
			var prev = options.current - 1;
			var next = options.current + 1;
			//添加上一页
			pageArray.push({//disable的判断添加了边界控制
				name:'上一页',
				value:prev,
				disabled:prev > 0 ? false : true
			})

			//计算出开始页和结束页
			//自定义规则，从中间页开始，只展示中间页前三页和后三页
			//1 2 3 *4* 5 6 7 
			//开始页的逻辑是：如果计算的开始页大于0，则按照当前页减去前三页得出开始页，否则开始页就是第一页
			var start = options.current - options.range > 0 ? options.current - options.range : 1
			//结束页的逻辑：如果计算的结束页小于总页数，则按照当前页加上前三页得出结束页，否则结束页就是总页数
			var end = options.current + options.range < pages ? options.current + options.range : pages
			// console.log(options)
			for(var i=start;i<= end;i++){
				pageArray.push({
					name:i,
					value:i,
					active:options.current == i ? true : false
				})
			}

			//添加下一页
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:next < pages ? false : true
			})
			// console.log(options)
			//构建分页器
			var html = _util.render(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages
			})
			this.$elem.html(html)
		}
	}
	Pagination.DEFAULT = {
		range:3
	}
	 $.fn.extend({//相当于一个对象
		pagination:function(fn,options){//相当于一个方法
			// console.log(this) this是一个jQuery对象
			return this.each(function(){//jQuery里要返回一些东西
				// console.log(this) 这里的this是一个dom节点
				var $this = $(this)
				var pagination = $this.data('pagination')
				//单列模式
				if(!pagination){//如果dom节点上没有data:pagination,则生成实例对象
					pagination = new Pagination($this)
					$this.data('pagination',pagination)
				}
				//如果传入组件内的参数fn的类型是函数的话，就可以执行
				if(typeof pagination[fn] == 'function'){
					pagination[fn]($.extend({},Pagination.DEFAULT,options))
				}
			})
		}
	})
})(jQuery);