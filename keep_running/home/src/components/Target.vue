<template>
	<div>
		<div class="instuction">
            <p>
              为了加大对用户们锻炼身体的监督程度，特推出设定目标功能，可通过自定义设定目标，在时间到达时，如未完成目标分数，则将进行提醒！
            </p>
          </div>
          <div class="target_content">
            <div class="target">
              <p>周分数目标</p>
              <div>
                <p class="inputText">目标分数：</p>
                <input type="text" v-model="target1">
              </div>
              <button class="target_button" @click='clickTarget1'>执行目标</button>
            </div>
            <div class="target">
              <p>月分数目标</p>
              <div>
                <p class="inputText">目标分数：</p>
                <input type="text" v-model="target2">
              </div>
              <button class="target_button" @click='clickTarget2'>执行目标</button>
            </div>
          </div>
	</div>
</template>

<script>
	import {showSuccess,showModal,post,get} from '@/util'
	export default{
		props:['userinfo'],
		data(){
			return{
				target1:'',
        		target2:''	
			}			
		},
		methods:{
			async getMark(){//从后台请求当前分数
		        try{
		          const res = await get('/weapp/getMark',{openid:this.userinfo.openId})
		          // console.log('getMark:',res.mark)
		         return res;//返回获得的数据
		        }catch(e){
		          showModal('请求失败','请稍后重试~')
		          console.log('从后端返回的执行错误的信息是：',e)
		        }       
		    },
		    async delay(time){//延迟执行
		    	return new Promise(function(resolve,reject){
		    		setTimeout(function(){
		    			resolve()
		    		},time);
		    	})
		    },
		    async compare(target){//比较现有分数和目标分数
		    	const res = await this.getMark()
		    	console.log('res:',res.mark)
		    	console.log('target:',this.target1)
		    	if(res.mark >= target){
		    		showSuccess('恭喜您完成目标，再接再厉吧~')
		    	}else{
		    		showModal('提醒','请您尽快完成所设定的目标~')
		    	}
		    },
		    async clickTarget1(){//设定周分数
		    	await this.delay(1000)//604800000
		    	await this.compare(this.target1)
		    },
		    async clickTarget2(){//设定月分数
		    	await this.delay(4233600000)
		    	await this.compare(this.target2)
		    }
		}
	}
</script>

<style lang="scss">
 .instuction{
    height:80px;
    background:#EA5149;

    p{
      font-size:16px;
      padding:10px 20px;
    }
  }
  .target_content{
    margin:20px 0;
    .target{
      background-color:#fff;
      border-radius:10px;
      margin:80px 0;
      p{
        font-size:20px;
        text-align:center;
      }
      .inputText{
        float:left;
        font-size:16px;
      }
      input{
        width:40%;
        border:1px solid #000;
        border-radius:5px;
        padding-left:90px;
        margin:5px 0;
      }
      .target_button{

        height:30px;
        line-height:30px;
        font-size:16px;
        margin-top:10px;
        margin-bottom:10px;
      }
    }
  }
</style>