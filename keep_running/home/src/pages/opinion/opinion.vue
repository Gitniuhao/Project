<template>
	<div>
	   <div class="contain">
	   	<div class="row">
	   		<label class="name">意见与反馈</label>
	   	</div>
	   	<!-- 提交意见 -->
	   	<div class="row text">
	   		<div>
	   			<textarea 
					v-model="opinion"
					maxlength="200"
					placeholder="点击这里输入您的建议~"
					class="input" 
	   			></textarea>
	   			<label class="word-count">{{word_count}}/200</label>
	   		</div>
	   	</div>
	   	<!-- 提交截图 -->
	   	<div class="row">
	   		<div>
	   			<label class="name">相关截图（选填）</label>
	   			<label class="img-count">{{img_count}}/1</label>
	   		</div>
	   		<label v-for="(item,index) in src" :key="index">
	   			<img class="img" :src="item" alt="">
	   		</label>
	   		<label v-if="img_count<1" @click="uploadPicture">
	   			<img class="add-img" src="../../../static/images/addimage.png" alt="">
	   		</label>
	   	</div>
	   	<!-- 微信 -->
	   	<div class="row">
	   		<div class="name">
	   			微信号（选填）
	   		</div>
	   		<input 
				v-model="wechat"
				maxlength="20"
				placeholder="如果想要详细交流，可以点击这里留下微信~" 
				class="wechat-input" 
	   		/>		
	   	</div>
	   </div>
	   <button @click="submmit">提交</button>
	</div>
</template>

<script>
	import {post,showModal} from '@/util.js'
	export default {
		data(){
			return{
				opinion:"",
				word_count:0,
				src:[],
				baseImg:[],
				img_count:0,
				wechat:""
			}
		},
		watch:{//监听到绑定的变量发生变化并且执行
			opinion(){//每次opinion的值发生变化，将执行opinion函数
				this.word_count = this.opinion.length//将opinion的长度即文本的字数赋值给word_count
				// console.log('opinion')
			},
			src(){
				this.img_count = this.src.length
			}			
		},
		methods:{
			uploadPicture(){//上传图片
				let _this = this//将this重新赋值，便于在小程序方法里使用
				wx.chooseImage({
				  count: 2,
				  sizeType: ['original', 'compressed'],
				  sourceType: ['album', 'camera'],
				  success (res) {
				    // tempFilePath可以作为img标签的src属性显示图片
				    const tempFilePaths = res.tempFilePaths[0]
				    _this.src.push(tempFilePaths);//将地址依次存进数组中
				    if(_this.src.length > 0){//当src里面有内容的时候再进行转码
				    	for(let i = 0;i<_this.src.length;i++){				    		
			    			//转base64
			    			_this.base64({
			    				url:_this.src[i],
			    				type:'jpg'
			    			})
			    			.then(res=>{
			    				_this.baseImg.push(res);
			    			})
				            				            
				        }
				    }				    				    
				  }
				})
			},
			base64({url,type}){//将临时路径转换成base64
			      return new Promise((resolve, reject) => {
			        wx.getFileSystemManager().readFile({
			          filePath: url, //选择图片返回的相对路径
			          encoding: 'base64', //编码格式
			          success: res => {
			            resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
			          },
			          fail: res => reject(res.errMsg)
			        })
			      })
			},
			async submmit(){//向后台提交意见反馈数据
				if(this.word_count > 0){//当意见反馈表有内容的时候才可以提交
					const data = {
						opinion:this.opinion,
						src:this.baseImg.join(','),
						wechat:this.wechat,
						openid:wx.getStorageSync('userinfo').openId
					}
					try{
						const res = await post('/weapp/createopinion',data)
						// console.log('返回的正确信息是：',res)
						if(res.code == 0){
							showModal('提交成功',"已经将您的意见反馈提交给了开发者~")
							//当提交成功后将输入框清空
							this.opinion="",
							this.src=[],
							this.wechat=''
						}					
					}catch(e){//抛出错误
						console.log('返回的错误信息是：',e)
						showModal('提交失败',"服务器出了一点问题，请稍后重试~")
					}
				}else{//当意见反馈表为空的时候不能进行提交
					showModal('提交失败','反馈信息不能为空~')
				}				
			}
		}
	}
</script>

<style lang="scss">
.contain{
  background:#FFFFFF;
  font-size:15px;
  .text {
    height: 110px;
  }
  .row{
    border-bottom: 1px #E8E8E8 solid;
    padding: 5px 15px;
    .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width:100%;
      height:85px;
      font-size:14px;
      padding-top:5px;
    }
    .word-count {
      float:right;
      color: #808080;
    }
    .img-count {
      float:right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width:80px;
      height:80px;
    }
    .img {
      width:66px;
      height:66px;
      margin-bottom:7px;
      margin-right: 10px;
    }
    .wechat-input{
      font-size:14px;
    }
  }
}  
button {
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}	
</style>