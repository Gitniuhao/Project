;(function($){
	function DropDown($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$layer = this.$elem.find('.dropdown-layer');
		this.activeClass = this.$elem.data('active') + '-active';
		this.init();
	}
	DropDown.prototype = {
		constructor:DropDown,	
		init:function(){
			//1.初始化显示隐藏插件
			this.$layer.showHide(this.options);
			//2.监听自定义显示隐藏事件
			this.$elem.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropDown-' + ev.type);//触发事件
			}.bind(this));
			//3.绑定事件
			if(this.options.eventName == 'click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				}.bind(this));
				$(document).on('click',$.proxy(this.hide,this))
			}else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			}			
		},
		show:function(){
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$elem.addClass(this.activeClass);
					this.$layer.showHide('show');
				}.bind(this),this.options.delay)
			}else{
				this.$elem.addClass(this.activeClass);
				this.$layer.showHide('show');
			}			
		},
		hide:function(){
			clearTimeout(this.timer);
			this.$elem.removeClass(this.activeClass);
			this.$layer.showHide('hide');
		}	
	}
	DropDown.DEFAULTS = {
		js:true,
		mode:'slideDownUp',
		delay:''
	}
	$.fn.extend({
		dropDown:function(options){
			return this.each(function(){
				var $elem = $(this);
				// console.log(this)
				var dropdown = $elem.data('dropdown');
				if(!dropdown){
					options = $.extend({},DropDown.DEFAULTS,options)
					var dropdown = new DropDown($elem,options);
					// console.log(options)
					$elem.data('dropdown',dropdown);
				}
				if(typeof dropdown[options] == 'function'){
					dropdown[options]($elem)
				}
			})
		}
	})
})(jQuery);