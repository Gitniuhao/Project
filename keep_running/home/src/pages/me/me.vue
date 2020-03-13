<template>
	<div>
		<div class="top">
			<div class="userinfo">
				<img :src="userinfo.avatarUrl" alt="">
			</div>
			<div class="name">
				<label>{{userinfo.nickName}}</label>
				<p class="notice">{{quote}}</p>
			</div>
		</div>
		<div class="contain">
			<div class="row" @click="showInstruction">
				<label class="left">
					<img class="img" src="/static/images/homework.png" alt="">
				</label>
				<label class="name">&nbsp;&nbsp;操作指引</label>
				<label class="right">
					>		
				</label>
			</div>

			<div class="row" @click="reset">
				<label class="left">
					<img class="img" src="/static/images/delete.png" alt="">
				</label>
				<label class="name">&nbsp;&nbsp;清空记录</label>
				<label class="right">
					>		
				</label>
			</div>

			<div class="row" @click="showOpinion">
				<label class="left">
					<img class="img" src="/static/images/approval.png" alt="">
				</label>
				<label class="name">&nbsp;&nbsp;意见反馈</label>
				<label class="right">
					>		
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	import {post} from '@/util'
	export default{
		data(){
			return{
				userinfo:{},
				quote:""
			}
		},
		methods:{
			rankArray(){
				var a = Math.random() + "";//随机生成小数并且用间接方法使其变成字符串
				var rank1 = a.charAt(5);//返回第六位随机生成的数字
				var quotes = ["既然没有俊美的外表，那就努力去拥有禽兽般的身体吧！","撑过是天堂，放弃是地狱！",
					"健全的精神寓于健全的身体。","脸蛋是天生的 ，身材可不是。",
					"良好的心态和持之以恒的锻炼，造就健康的身体。","你要眉毛上的汗水，还是眉毛下的泪水.这是你的选择！",
					"不管进行什么样的运动，坚持才可以见成效！","运动的要义不在趣味而在继续持久，养成习惯",
					"跑步教会你的是自律，是克制，是不放弃是死磕到底！","只有运动才可以除去各种各样的疑虑。"]
				this.quote = quotes[rank1]//根据下标随机抽取一句赋予quote显示
			},
			showOpinion(){
				wx.navigateTo({
					url:"/pages/opinion/main"
				})
			},
			showInstruction(){
				wx.navigateTo({
					url:"/pages/instruction/main"
				})
			},
			async resetRecord(){
				if(this.userinfo){
				 try{
		           const res = await post('/weapp/resetRecord',{openid:this.userinfo.openId})
		           console.log("resetRecord")
		            console.log("从后端传来的信息：",res)
		          }catch(e){
		            showModal('操作失败',"请稍后重试~")
		            console.log("后端传来的错误信息：",e)
		          }   
				}     
		    },
		    reset(){//清空记录提示框
		        var _this = this
		        wx.showModal({
		        	content:'确定要清空所有记录吗？',
		        	success(res){
		        		if(res.confirm){
		        			_this.resetRecord()
		        		}
		        	}
		        })
		    }
		},
		onShow(){
			//每次切换到个人中心页面就执行一次此方法
			this.rankArray()
		},
		mounted(){
			//将userinfo在页面加载完成后赋予这个页面
			const userinfo = wx.getStorageSync('userinfo');
			if(userinfo.openId){
				this.userinfo = userinfo
				// console.log(userinfo)
			}
		}
	}
</script>

<style lang="scss">
.contain{
  margin-top: 10px;
  background:#FFFFFF;
  font-size:15px;
  .row{
    padding: 0px 18px;
    border-bottom: 1px #E8E8E8 solid;
    height: 55px;
    line-height: 55px;
    .img {
      float:left;
      width: 20px;
      height: 20px;
      padding-top:16px;
    }
    .name {
      float:left;
    }
  }
  .right {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .left {
    width:80%;
  }
}  

.top{
  height: 80px;
  width: 100%;
  background:#EA5149;
  padding-top: 30px;
  display: block;
  .userinfo{
    padding-bottom: 5px;
    float: left;
    img{
      width: 120rpx;
      height:120rpx;
      margin: 10rpx;
      border-radius: 1px;
      border: 1px #D0D0D0 solid;
    }
  }
  .name{
    padding-top: 30px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    .underline{
      border: 1px solid #ffffff;
      border-radius:5px;
      text-align:center;
    }
    .notice{
      color: #D8D8D8;
      font-size: 12px;
    }
    .a-line{
      background:#EA5149;
      border: none;
      display: inline;
      font-size: 16px;
      color: #FFFFFF;
      text-decoration:underline;
    }
  }
}
</style>