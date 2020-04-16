<template>
	<div>
		<div class="instruction">
			近三十天微信运动步数
		</div>
		<div v-if="show_data">
			<div class="prompt">还没有任何微信运动数据~</div>
		</div>
		<div v-else>
			<div class="table th">
				<div class="date">时间</div>
				<div class="bushu">步数</div>
			</div>
			<div v-for="(data,index) in runDatas" :key="index">
				<div class="stepContainer">
					<span class="timestamp">{{data.timestamp}}</span>
					<span class="step">{{data.step}}</span>
				</div>				
			</div>
			<p class="text-footer" v-if="more">没有更多数据了~</p>
		</div>
	</div>
</template>

<script>
	import WXBizDataCrypt from '@/utils/RdWXBizDataCrypt.js'
	import {formatTime,tsFormatTime} from "@/utils/index"
	export default{
		data(){
			return{
				runDatas:'',
				show_data:false,
				more:false
			} 
		},
		onLoad(options){
		   var that = this;
		   wx.showToast({
	          title:"加载中",
	          icon:"loading"
	        })
		   wx.login({
		     success(res){
		       var appid = "wx605a1a15663d72b3";
		       var secret = "c3c66cb35994fd87f2b9138bbcdeb07f";
		       if(res.code){
		         wx.request({
		           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
		           header: {
		             'content-type': 'json'
		           },
		           success(res){
		             var session_key = res.data.session_key;
		             // console.log(session_key);
		             that.getData(appid,session_key);
		           }
		         })
		       }
		     }
		   })
		   },
		   methods:{
		   	  //获取encryptedData（没有解密的步数）和iv（加密算法的初始向量）
			 getData: function (appid,session_key) {
			 	var _that = this;
			   wx.getSetting({
			     success: function (res) {
			       // console.log(res);
			       if (!res.authSetting['scope.werun']) {
			         wx.showModal({
			           title: '提示',
			           content: '获取微信运动步数，需要开启计步权限',
			           success: function (res) {
			             if (res.confirm) {
			               //跳转去设置
			               wx.openSetting({
			                 success: function (res) {
			 					console.log('设置成功')
			                 }
			               })
			             } else {
			               //不设置
			             }
			           }
			         })
			       } else {
			         wx.getWeRunData({
			           success: function (res) {
			             // console.log(res);
			             // console.log("appid:" + appid + "session_key:" + session_key + "encryptedData:" + res.encryptedData + "iv:" + res.iv);
			             var encryptedData = res.encryptedData;
			             var iv = res.iv;
			             var pc = new WXBizDataCrypt(appid, session_key);//进行解密
			             // console.log(pc);
			             var data = pc.decryptData(encryptedData, iv)
			             // console.log(data.stepInfoList)
			             var stepDatas = data.stepInfoList
			             if(!stepDatas){//当页面没有数据时的处理
			             	_that.show_data = true
			             }
			             if(stepDatas.length >= 31){//当数据展示完毕的时候的处理
			             	_that.more = true
			             }
			             stepDatas =stepDatas.map((data)=>{//转换时间戳为时间格式
			             	return{
			             		timestamp:tsFormatTime(data.timestamp,'Y年M月D日'),//利用方法将时间格式化
			             		step:data.step
			             	}
			             })
			             stepDatas = stepDatas.reverse()//实现数组翻转
			             _that.runDatas = stepDatas//
			             console.log('stepDatas:',stepDatas)
			           },
			           fail: function (res) {
			             wx.showModal({
			               title: '提示',
			               content: '开发者未开通微信运动，请关注“微信运动”公众号后重试',
			               showCancel: false,
			               confirmText: '知道了'
			             })
			           }
			         })
			       }
			     }
			   })
			 },
		  }		 		  
     }
</script>

<style lang="scss" scoped>
.instruction{
	text-align:center;
	font-size:16px;
	height: 30px;
	line-height:30px;
	background-color: #EA5149;
	margin-top:10px;
}
.prompt{
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}
.th {
  width: 100%;
  height: 30px;
  line-height:30px;
  background: #EA5149;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  .date{
	  width: 50%;
	  padding-left:60px;
	}
	.bushu{
	  width: 50%;
	  margin-left:100px;
	}
}
.stepContainer{
	height:30px;
	line-height:30px;
	margin:5px 0;
	background-color:#fff;
	font-size:16px;
	.step{
		float:right;
		margin-right:70px;
	}
	.timestamp{
		margin-left:20px;
	}
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
  padding-top: 5px;
}	
</style>