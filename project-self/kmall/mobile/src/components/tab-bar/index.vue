<!-- 模板 -->
<template>
	<div id="TabBar">
		<van-tabbar 
		 v-model="active"
  		 active-color="#ff6700"
  		 inactive-color="#000">
		  <van-tabbar-item 
			    replace
	    		to="/home"
			 	icon="home-o">
				首页
			</van-tabbar-item>
			<van-tabbar-item
			   replace
	    	   to="/cart"
			   icon="search">
			   	购物车
			</van-tabbar-item>
			<van-tabbar-item
			   replace
	    	   to="/me"
			   icon="friends-o">
				个人中心
			</van-tabbar-item>
		</van-tabbar>
	</div>    
</template>
<!-- 逻辑 -->
<script>
  export default{
    name:'TabBar',
    data(){
	    return {
	      active: 0
	    }
	}
  }
</script>
<!-- 样式 -->
<style scoped>
	
</style>