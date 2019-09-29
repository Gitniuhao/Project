;(function($){
	function Carousel($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.showIndex;
		this.$carouselItem = $elem.find('.carousel-item');
		this.$btns = $elem.find('.btn-item');
		this.$control = $elem.find('.control');
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,	
		init:function(){
			if(this.options.slide){//划入划出

			}else{//淡入淡出
				//先让所有的图片默认隐藏
				this.$elem.addClass('fade');
				//默认显示第一张、
				this.$carouselItem.eq(this.now).show();
				//默认图标显示第一张
				this.$btns.eq(this.now).addClass('active')
				//将显示隐藏插件初始化
				this.$carouselItem.showHide({js:true,mode:'fade'})
				//将左右按钮显示出来
				this.$elem
				.hover(
					function(){
						this.$control.show();
					}.bind(this),function(){
						this.$control.hide();
					}.bind(this))
				.on('click','.control-left',function(){

				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(this.now+1)
				}.bind(this))
			}
		},
	  _fade(index){
	  	//让当前显示的隐藏
	  	this.$carouselItem.eq(this.now).showHide('hide');
	  	this.$btns.eq(this.now).removeClass('active');
	  	//让当前隐藏的显示
	  	this.$carouselItem.eq(index).showHide('show');
	  	this.$btns.eq(index).addClass('active');
	  	this.now = index;
	  },
	}
	Carousel.DEFAULTS = {
		slide:false,
		showIndex:0,
	}
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $elem = $(this);
				// console.log(this)
				var carousel = $elem.data('carousel');
				if(!carousel){
					options = $.extend({},Carousel.DEFAULTS,options)
					 carousel = new Carousel($elem,options);
					// console.log(options)
					$elem.data('carousel',carousel);
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]()
				}
			})
		}
	})
})(jQuery);