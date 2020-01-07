<!-- 模板 -->
<template>
	<div id="Home">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">Slide 1</div>
				<div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
	</div>    
</template>
<!-- 逻辑 -->
<script>
  import Swiper from 'swiper';
  import 'swiper/css/swiper.min.css';
  export default{
    name:'Home',
    mounted(){
    	new Swiper('.swiper-container',{
    		//循环模式选项
    		loop:true,
    		autoplay:true,
    		//分页器
    		pagiation:{
    			el:'.swiper-pagination',
    			clickable:true
    		}
    	})
    }
  }
</script>
<!-- 样式 -->
<style scoped>

</style>
