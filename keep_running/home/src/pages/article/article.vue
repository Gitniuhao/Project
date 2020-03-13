<template>
	<div>
		<div class="articleContainer" @click="toDetail">
			<img src="/static/images/littleTip-huang.jpg" alt="">
			<p class="title">古方渐渐看空间SDKsjkbsdkjbskdvbskdvbdvvvfv</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			toDetail(){
				wx.navigateTo({
					url:"/pages/articleDetail/main"
				})
			}
		}
	}
</script>

<style lang="scss">
.articleContainer{
	margin:10px 20px;
	background-color: #fff;
	border-radius:10px;
	img{
		width: 336px;
		height: 150px;
		border-radius:10px 10px 0 0;
	}
	p{
		padding:10px 10px;
		font-size:18px;
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow:ellipsis;
	}
}
</style>