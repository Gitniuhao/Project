<template>
	<div>
		<div v-if="show_article">
			<div class="prompt">还没有任何文章~</div>
		</div>
		<div v-else>
			<ArticleList v-for="(article,index) in collectionArticles" :key="index" :article="article" :index="article.id"></ArticleList>
			<p class="text-footer" v-if="!more">没有更多文章了~</p>
	     	<p class="text-footer" v-else>加载中...</p>			
		</div>		
	</div>
</template>

<script>
	import {get} from "@/util"
	import ArticleList from "@/components/ArticleList"
	export default{
		components:{
	      ArticleList
	    },
		data(){
			return{
				userinfo:{},
				show_article:false,
				collectionArticles:[],
		        page:0,
		        more:true
			}
		},
		methods:{
			async getArticles(init){
				wx.showToast({
					title:"加载中",
          			icon:"loading"
				})
				 if(init){//当init为true，将一切变为初始状态
		          this.page = 0
		          this.more = true
		        }
		        if(this.page === 0){//如果回到初始状态，将之前获取的数据置空
		          this.collectionArticles = []
		        }
				try{
					const data = {
						page:this.page,
						openId:this.userinfo.openId
					}
					const res = await get("/weapp/getCollectionList",data)
					console.log("后端传来的数据：",res)
					this.collectionArticles = this.collectionArticles.concat(res.collectionArticles)
					if(res.collectionArticles.length <3){
			            this.more = false//如果获取的数据不足3条，其页面大于0，则没有更多数据了，停止操作
			          }
					if(this.collectionArticles.length == 0){//如果页面文章个数为零，则显示提示语句
						this.show_article = true
					}else{
						this.show_article = false
					}
					wx.hideToast()//将提示框隐藏起来
				}catch(e){
					console.log("后端传来的错误信息：",e)
          			wx.hideToast()//将提示框隐藏起来
				}
			}
		},
		onPullDownRefresh(){
	      this.getArticles(true)
	      wx.stopPullDownRefresh()
	    },
	    onReachBottom(){//每次到底页面底部触发的函数
	      if(!this.more){//如果没有更多数据，就停止下面的操作
	        return
	      }
	      this.page = this.page + 1;
	      console.log("现在是第几页：",this.page)
	      this.getArticles()
	    },  
		onShow:function(){
	       const userinfo = wx.getStorageSync('userinfo');
	      if(userinfo.openId){//如果userinfo中有唯一标识openID,则在登录状态，将userinfo赋值
	        this.userinfo = userinfo
	        this.getArticles(true)
	        console.log('getArticles')
	      }
	    },	    
	}
</script>

<style lang="scss">
.prompt{
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
  padding-top: 5px;
}	
</style>