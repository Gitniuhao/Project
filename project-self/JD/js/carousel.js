;(function($){
	function Carousel($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.showIndex;
		this.$carouselItem = $elem.find('.carousel-item');
		this.itemNum = this.$carouselItem.length;
		this.$btns = $elem.find('.btn-item');
		this.$control = $elem.find('.control');
		this.timer = 0;
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,	
		init:function(){
			if(this.options.slide){//划入划出
				//先让所有的图片默认隐藏
				this.$elem.addClass('slide');
				//默认显示第一张、
				this.$carouselItem.eq(this.now).css({left:0})
				//默认图标显示第一张
				// this.$btns.eq(this.now).addClass('active')
				//将移动插件初始化
				this.$carouselItem.move(this.options);
				//将左右按钮显示出来
				/*
				this.$elem
				.hover(function(){
						this.$control.show();
					}.bind(this),function(){
						this.$control.hide();
					}.bind(this))
				.on('click','.control-left',function(){
					this._slide(this.getIndex(this.now - 1));
				}.bind(this))
				.on('click','.control-right',function(){
					this._slide(this.getIndex(this.now + 1));
				}.bind(this))
			
				//处理自动轮播事件
				if(this.options.interval){
				this.autoplay();
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
				}
				//处理底部按钮点击事件
				var _this = this;
				this.$btns.on('click',function(){
					//获取底部按钮对应的下标
					_this._slide(_this.$btns.index($(this)))
				})
			  */
			  this.tab = this._slide;
			}else{//淡入淡出
				//先让所有的图片默认隐藏
				this.$elem.addClass('fade');
				//默认显示第一张、
				this.$carouselItem.eq(this.now).show();
				//默认图标显示第一张
				// this.$btns.eq(this.now).addClass('active')
				//将显示隐藏插件初始化
				this.$carouselItem.showHide(this.options);
				//将左右按钮显示出来
				/*
				this.$elem
				.hover(function(){
						this.$control.show();
					}.bind(this),function(){
						this.$control.hide();
					}.bind(this))
				.on('click','.control-left',function(){
					this._fade(this.getIndex(this.now - 1));
				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(this.getIndex(this.now + 1));
				}.bind(this))
			
			//处理自动轮播事件
			if(this.options.interval){
				this.autoplay();
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}
			//处理底部按钮点击事件
			var _this = this;
			this.$btns.on('click',function(){
				//获取底部按钮对应的下标
				_this._fade(_this.$btns.index($(this)))
			})
			*/
			this.tab = this._fade;
		  }
		  //默认图标显示第一张
		  this.$btns.eq(this.now).addClass('active')
		  //将左右按钮显示出来
			this.$elem
			.hover(function(){
					this.$control.show();
				}.bind(this),function(){
					this.$control.hide();
				}.bind(this))
			.on('click','.control-left',function(){
				this.tab(this.getIndex(this.now - 1));
			}.bind(this))
			.on('click','.control-right',function(){
				this.tab(this.getIndex(this.now + 1));
			}.bind(this))
		
			//处理自动轮播事件
			if(this.options.interval){
			this.autoplay();
			this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}
			//处理底部按钮点击事件
			var _this = this;
			this.$btns.on('click',function(){
				//获取底部按钮对应的下标
				_this.tab(_this.$btns.index($(this)))
			})
		},
	  _slide:function(index){
		//如果当前值和即将显示的值想等的话,不执行
	  	if(this.now == index) return;
	  	//让即将显示的放在左边或右边
	  	//让当前显示的移出
	  	//让即将显示的移入
	},
	  _fade(index){
	  	//如果当前值和即将显示的值想等的话,不执行
	  	if(this.now == index) return;
	  	//让当前显示的隐藏
	  	this.$carouselItem.eq(this.now).showHide('hide');

	  	this.$btns.eq(this.now).removeClass('active');
	  	//让当前隐藏的显示
	  	this.$carouselItem.eq(index).showHide('show');
	  	this.$btns.eq(index).addClass('active');
	  	//将inde赋给this.now
	  	this.now = index;
	  },
	  getIndex(index){
	  	if(index < 0) return this.itemNum -1;
	  	if(index >= this.itemNum) return 0;
	  	return index;
	  },
	  autoplay:function(){
	  	this.timer = setInterval(function(){
			this.$control.eq(1).trigger('click');
		}.bind(this),this.options.interval)
	  },
	  paused:function(){
	  		clearInterval(this.timer);
	  }
	}

	Carousel.DEFAULTS = {
		slide:true,
		showIndex:0,
		interval:2500,
		js:true,
		mode:'fade'
	}

	//注册插件
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