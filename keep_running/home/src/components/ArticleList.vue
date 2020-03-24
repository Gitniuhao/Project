<template>
	<div class="articleContainer" @click="toDetail" >
		<img :src="article.article_image" alt="">
		<p class="title">{{article.title}}</p>
	</div>
</template>

<script>
	export default{
		props:['article','index'],
		data(){
			return{

			}
		},
		methods:{
			toDetail(){
				wx.navigateTo({
					url:"/pages/articleDetail/main?index="+ this.index
				})
			}
		}
	}
</script>
<style lang="scss">
.articleContainer{
	margin:20px 20px;
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