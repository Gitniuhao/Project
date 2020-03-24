<template>
	<div>
		<div v-if="show_articleDetail">
			<div class="prompt">还没有任何数据~</div>
		</div>
		<div v-else class="articleDetail">
			<div class="title">
				<p>{{articleDetail.title}}</p>
			</div>
			<div>
				<label class="author">{{articleDetail.author}}</label>				
				<label class="view">
					<img src="/static/images/view.png" alt="">
					<span>{{view}}次阅读</span>
				</label>
			</div>
			<div class="content">
				<wxParse :content="articleDetail.content"/>
			</div>
			<label class="date">发布于{{articleDetail.create_time}}</label>
			<div class="collection_share">
				<img class="share" src="/static/images/shared.png" @click="handleShare">	
				<img class="collection" :src="isCollection ? '/static/images/collection-none.png' : '/static/images/collection-done.png'" @click='handleCollection'>			
			</div>
		</div>
	</div>
</template>

<script>
	import {get,post} from "@/util" 
	import {formatTime} from "@/utils/index"
	import wxParse from 'mpvue-wxparse'
	export default{
		components:{
		   wxParse
		},
		data(){
			return{
				id:0,
				show_articleDetail:false,
				articleDetail:{},
				view:0,
				isCollection:false,
				userinfo:{}
			}			
		},
		onLoad(options){
			// console.log(options)
			if(options){//当页面加载有传值
				this.id = options.index
			}							
		},
		onShow(){//每次打开页面重新获取文章详情
			const userinfo = wx.getStorageSync('userinfo');
	      	if(userinfo.openId){//如果userinfo中有唯一标识openID,则在登录状态，将userinfo赋值
	      		this.userinfo = userinfo	
	        	this.getArticleDetail(this.id)
	      	}			
		},
		methods:{
			async getArticleDetail(id){//与后台交互获取文章详情
				try{
					wx.showToast({
						title:"加载中",
	          			icon:"loading"
					})
					const res = await get("/weapp/getArticlesDetail",{id:id})
					this.articleDetail = res.articleDetail
					//利用方法将时间格式化
					this.articleDetail.create_time = formatTime(new Date(this.articleDetail.create_time))
					// console.log(this.articleDetail.view)
					if(res.articleDetail){//从后台获取最新数据赋值
						this.view = res.articleDetail.view
					}
					this.addView()//每次进入页面改变阅读次数	
					//渲染转义赋值
					this.isCollection = res.articleDetail.isCollection == 0 ? true : false
					console.log('isCollection:',res.articleDetail.isCollection)
					if(!this.articleDetail.title){//如果页面文章标题不存在，则显示提示语句
						this.show_articleDetail = true
					}else{
						this.show_articleDetail = false
					}
					wx.hideToast()//将提示框隐藏起来
				}catch(e){
					console.log("后端传来的错误信息：",e)
          			wx.hideToast()//将提示框隐藏起来
				}
			},
			async addView(){//与后台交互增加阅读数量
				const data={
					view:this.view+1,
					id:this.id
				}
				try{
					const res = await post("/weapp/updateView",data)
					console.log("后端传来de信息：",res)
					this.view = res.view//每次加载页面更新view
				}catch(e){
					console.log("后端传来的错误信息：",e)
				}
			},
			async handleCollection(){//控制收藏与后台交互
				this.isCollection = !this.isCollection
				//利用三元运算符，根据布尔值不同赋予不同的值
		        let title = this.isCollection ? '取消收藏' : '收藏成功'
		        wx.showToast({
		            title,
		            icon:'success'
		        })
				try{
					const data={
						id:this.id,
						openId:this.userinfo.openId,
						isCollection:this.isCollection ? 0 : 1
					}
					const res = await post('/weapp/updateIsCollection',data)
					console.log("后端传来de信息：",res)
				}catch(e){
					console.log("后端传来的错误信息：",e)
				}
			},
			handleShare(){//分享文章详情
		        wx.showActionSheet({
		            itemList:[
		                '分享到朋友圈','分享到QQ空间','分享到微博'
		            ]
		        })
		    }
		}		
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
.articleDetail{
	display:flex;
	flex-direction:column;
	padding:10px 10px;
	.title{
		font-size:24px;
		font-weight:bold;
		white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        margin-top:10px;
        margin-bottom:5px; 
	}
	.author{
		font-size:16px;
		color:#EA5149;
		opcity:0.3;
		margin-left:10px;
	}
	.view{
		float:right;
		margin-right:10px;
		img{
			width: 20px;
			height: 20px;
			vertical-align:middle;
		}
		span{
			font-size:16px;
		}
	}
	
	.collection_share{
		position:relative;
		margin-top:20px;
		margin-bottom:20px;
		img{
			width: 40px;
			height: 40px;
			margin-right:100px;
			float:right;
		}			
	}
	.date{
		font-size:16px;
		color:gray;
		opcity:0.3;
		margin-bottom:20px;
		margin-left:150px;
	}
	.content{
		margin-top:10px;
	}
}
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
