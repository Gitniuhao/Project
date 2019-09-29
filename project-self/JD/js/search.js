;(function($){
	//模仿缓存
	var cache = {
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key] = val;
			this.count++;
		},
		getData:function(){
			return this.data[key]
		}
	}

	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchInput = $elem.find('.search-input');
		this.$searchBtn = $elem.find('.search-btn');
		this.$searchForm = $elem.find('.search-form');
		this.$searchLayer = $elem.find('.search-layer');
		this.isLoaded = false;
		this.timer = 0;
		this.jqXHR = null
		//2.初始化
		this.init();
		if(this.options.autocomplete){
			this.autocomplete();
		}
	}
	Search.prototype = {
		constructor:Search,	
		init:function(){
			this.$searchBtn.on('click',$.proxy(this.submit,this))	
		},
		submit:function(){
			var val = this.getValue();
			if(val == ''){
				return false;
			}
			//触发表单上面的'submit'事件
			this.$searchForm.trigger('submit');
		},
		getValue:function(){
			return $.trim(this.$searchInput.val());
		},
		autocomplete:function(){
			//1.将显示隐藏插件初始化
			this.$searchLayer.showHide(this.options);
			//2.监听输入框的oninput事件
			this.$searchInput.on('input',function(){
				//防止多次请求,解决快速输入问题
				if(this.options.getDataDelay){
					clearTimeout(this.timer)
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.getDataDelay)
				}else{
					this.getData();
				}
			}.bind(this));
			//3.点击页面其他地方让下拉层消失
			$(document).on('click',$.proxy(this.hideLayer,this));
			//4.阻止输入框冒泡
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//5.当输入框再次获得焦点时,让下拉层出现
			this.$searchInput.on('focus',$.proxy(this.showLayer,this));
			//6.利用事件委托给下拉层的子元素添加事件
			var _this = this;
			this.$searchLayer.on('click','.search-item',function(){
				//1.获取子元素的具体的值
				// console.log(this);
				$elem = $(this);
				var val = $elem.html(); 	
				//2.将子元素的值放入输入框
				_this.$searchInput.val(val);
				//3.触发提交事件
				_this.$searchForm.submit();
			})
		},
		getData:function(){
			//判断输入框的值不能是空
			var inputVal = this.getValue()
			if(inputVal == ''){
				//如果输入框的值为空,则下拉层不显示
				this.hideLayer();
				this.addHtml('');
				return;
			}
			//保证获取最新数据
			if(this.jqXHR){
				this.jqXHR.abort();
			}

			//判断缓存中有没有数据
			if(cache.data[inputVal]){
				this.$elem.trigger('getData',cache.data[inputVal]);
				return;
			}
			// console.log('发送请求')
			this.jqXHR = $.ajax({
				url:this.options.url + this.getValue(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				// //1.将获取的数据包装成html代码
				// var html = '';
				// for(var i=0;i<data.result.length;i++){
				// 	html += '<li class="search-item">'+data.result[i][0]+'</li>'
				// }
				// //2.将html代码放入下拉层中
				// this.addHtml(html);
				// //3.将下拉层显示出来
				// this.showLayer();
				this.$elem.trigger('getData',[data]);
				//将获取的数据存入缓存中
				var inputval =this.getValue();
				cache.addData(inputVal,data);
			}.bind(this))
			.fail(function(err){
				// this.hideLayer();
				// addHtml('');
				this.$elem.trigger('getNoData',[data])
			}.bind(this))
			.always(function(){
				//把之前请求为空,获取最近数据
				this.jqXHR = null;
			}.bind(this))
		},
		hideLayer:function(){
			
			this.$searchLayer.showHide('hide');
		},
		showLayer:function(){
			//判断是否有值,如果没有值停止执行下面的显示下拉层行为
			if(!this.isLoaded) return;
			this.$searchLayer.showHide('show');
		},
		addHtml:function(html){
			//两个非可以让任何值变为布尔值
			this.isLoaded = !!html;
			this.$searchLayer.html(html);
		}
	}
	//https://suggest.taobao.com/sug?code=utf-8&q=ad&_ksTS=1569494442948_1163&callback=jsonp1164&area=b2c&code=utf-8&k=1&bucketid=1&src=tmall_pc
	DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		js:true,
		mode:'slideDownUp',
		getDataDelay:200
	}
	$.fn.extend({
		search:function(options,val){
			return this.each(function(){
				var $elem = $(this);
				var search  = $elem.data('search');
				if(!search){
					options = $.extend({},DEFAULTS,options)
					var search = new Search($elem,options);
					// console.log(options)
					$elem.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options](val)
				}
			})
		}
	})
})(jQuery);