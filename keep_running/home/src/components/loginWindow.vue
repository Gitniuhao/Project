<template>
	<div>
	   <div class="modal-mask"></div>
	    <div class="modal-dialog">
	      <div class="modal-content">
	        <img class="img" src="../../static/images/littleTip-huang.jpg" alt="">
	        <div class="content-text">
	          <p class="key-bold">Keep Running是一款监督并激励运动的神器。</p>
	          <p class="key-bold">将是否运动作为标准，完成运动计划加分，未完成减分。</p>
	          <p class="little-tip">举个例子：</p>
	          <p class="little-content">今天完成了慢跑5公里的计划，加5分；</p>
	          <p class="little-content">而未完成慢跑5公里的计划，减10分。</p>
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button class="btn" open-type="getUserInfo" @getuserinfo="login">授权登录</button>
	      </div>
	    </div>
	</div>
</template>

<script>
	import config from '@/config.js'
	//引入sdk插件，获取openId
	import qcloud from 'wafer2-client-sdk'
	import {showSuccess} from '@/util.js'
	export default {
		methods:{
		  login(){
	        // 设置登录地址
	        qcloud.setLoginUrl(config.loginUrl);
	        qcloud.login({
	            success:(userInfo)=> {//登录成功后携带参数的回调函数
	                console.log('登录成功', userInfo);
	                //登录成功后调用方法缓存数据
	                this.loginSuccess(userInfo)
	                //通过this.$emmit设置方法向父组件传递数据
	                this.$emit('changeShow',false,userInfo)
	                //授权成功后显示tabBar
	                wx.showTabBar()
	                //登录成功后弹窗提示
	                showSuccess('登录成功')
	            },
	            fail:(err)=> {
	                console.log('登录失败', err);
	            }
	        });
	      },
	      loginSuccess(userInfo){
	        //设置本地storage数据
	        wx.setStorageSync('userinfo',userInfo)
	      }
		}
	}
</script>

<style lang="scss">
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height:130px;
  padding:10px 0px 50px 0px;
  font-size:14px;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
}
button {
  width: 100%;
  background:#feb600;
  color:#FFFFFF;
  font-weight:bold;
}
.img {
  width: 280px;
  height:90px;
}
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 14px;
  font-weight:bold;
}  
</style>