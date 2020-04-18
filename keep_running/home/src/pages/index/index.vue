<template>
  <div>
    <!--调用组件 -->
    <div v-if="showLogin">
      <loginWindow @changeShow="getModal(arguments)"></loginWindow>
    </div>
    <div>
      <div class="nav">
        <div :class="{'selected':tab === 1,'title':true}"
           @click="changTab(1)">
          <p>分数操作</p>
        </div>
        <div :class="{'selected':tab === 2,'title':true}"
           @click="changTab(2)">
          <p>目标设定</p>
        </div>
        <div :class="{'selected':tab === 3,'title':true}"
           @click="changTab(3)">
          <p>微信步数</p>
        </div>
      </div>
      <div class="content">
        <div class="show_mark" v-if="tab===1">   
          <div class="show">
            <div class="button">
              <div class="btn1 right" @click="recall">撤销</div>
              <div class="btn0" @click="reset">清零</div>
            </div>
            <div class="mark-text">当前分数</div>
            <div class="mark">{{mark}}</div>
          </div>
          <div class="row">
            <div class="button right" @click="addMark(1)">+1</div>
            <div class="button left" @click="addMark(-1)">-1</div>
          </div>
          <div class="row">
            <div class="button right" @click="addMark(5)">+5</div>
            <div class="button left" @click="addMark(-5)">-5</div>
          </div>
        </div>
        <div class="show_target" v-else-if="tab===2">
          <Target :userinfo='userinfo'></Target>
        </div>
        <div class="show_RunData" v-else>
          <RunData></RunData>
        </div>
      </div> 
    </div>      
  </div>
</template>

<script>
  // 引入组件
  import loginWindow from '@/components/loginWindow'
  import RunData from '@/components/RunData'
  import Target from '@/components/Target'
  import {showSuccess,showModal,post,get} from '@/util'
  export default {
    components:{//声明组件
      loginWindow,
      RunData,
      Target
    },
    data(){
      return{
        mark:0,
        showLogin:false,
        userinfo:{},
        tab:1
      }
    },
    methods:{
      changTab(index){
          this.tab = index
      },
      async addMark(add){//控制加减分的方法，并向后台发送请求
        try{
          const data={
            openid:this.userinfo.openId,
            add:add
          }
          const res = await post('/weapp/createrecord',data)//发送请求 
          this.mark = this.mark + add;
          // console.log("add:",add)
        }catch(e){
          showModal('请求失败','请稍后重试~')
          console.log('从后端返回的执行错误的信息是：',e)
        }
      },
      getModal(val){//接收子组件的数据
        //授权成功后将弹窗隐藏
        this.showLogin = val[0]
        // console.log(val[0])
        //将usinfo传递给父组件，确保父组件继续运行
        this.userinfo = val[1]
        //每次弹窗隐藏后重新获取最新分数
        this.getCurrentMark()
      },
      async getCurrentMark(){//从后台请求当前分数
        try{
          const res = await get('/weapp/getMark',{openid:this.userinfo.openId})
          console.log(res.mark)
          //将返回的数据重新赋值
          if(res.mark){
            this.mark = res.mark
          }else{//清空记录状态下mark默认为0
            this.mark = 0;
          }
        }catch(e){
          showModal('请求失败','请稍后重试~')
          console.log('从后端返回的执行错误的信息是：',e)
        }       
      },
      async resetMark(){//向后台请求清零功能
        if(this.mark!=0){//当前端mark不为0的时候才可以进行操作
          try{
            const res = await post('/weapp/resetMark',{openid:this.userinfo.openId})
            console.log("从后端传来的信息：",res)
            this.mark = 0;//后端已经将mark设为0，同时将前端也设为0
          }catch(e){
            showModal('操作失败',"请稍后重试~")
            console.log("后端传来的错误信息：",e)
          }        
        }
      },
      reset(){//清零提示框
        var that = this
        wx.showModal({
          content: '确定要清零吗？',
          success (res) {
            if (res.confirm) {
              that.resetMark()
            }
          }
        })
      },
      async recall(){//撤销功能
        try{
          const res = await post("/weapp/deleterecord",{openid:this.userinfo.openId})
          console.log("从后端传递的信息：",res)
          this.mark = res.mark
          showSuccess("撤销成功~")
        }catch(e){
          showModal("撤销失败","请稍后重试~")
          console.log("后端传来的错误信息：",e)
        }
      }
    },
    created(){
      //获取storage
      const userinfo = wx.getStorageSync('userinfo');
      if(userinfo.openId){//如果userinfo中有唯一标识openID,则登录成功，将userinfo赋值
        this.userinfo = userinfo
        // console.log(userinfo)
      }else{//如果userinfo中没有openID,则登录失败
        wx.hideTabBar()//隐藏tabBar
        this.showLogin = true;//将登录弹窗显示出来
      }
    },
    onShow(){
      if(this.userinfo){
        this.getCurrentMark()//每次到本页面就请求最新分数
        console.log("getMark")   
      }                  
    },
    onPullDownRefresh(){//监听用户下拉刷新
      // console.log('我在下拉刷新')
      this.getCurrentMark()//每次刷新就请求最新数据
      wx.stopPullDownRefresh()//停止下拉刷新
    },
    onShareAppMessage(){//允许用户分享
      return{
        title:"Keep Running",
        path:'/pages/index/main'
      }
    }
  }
</script>

<style lang="scss">
.nav{
  display:flex;
  height:30px;
  line-height:30px;
  color:#353535;
  background-color:#EA5149;
  border-bottom:5px solid #EA5149;
  .title{
    text-align:center;
  }
  .selected{
    color:#fff;
  }
  p{
    width:70%;
    margin:0 22px;
    height:20px;
    line-height:20px;
    padding:5px 0;
  }  
}
.content{
  .show{
    text-align:center;
    height:250px;
    background-color: #EA5149;
    margin-bottom:5px;
    color:#fff;
    font-weight:bold;
    .mark-text{
      font-size:20px;
      padding:28px;
    }
    .mark{
      font-size:88px;
    }
    .button{
      margin:0 10px;
      height: 30px;
      line-height:30px;
      text-align:center;
      font-size: 15px;
      font-weight:bold;
      background:#EA5149;
      .btn0{
        width: 60px;
        border-radius: 15px;
        border:1px dashed #feb600;
      }
      .btn1{
        width: 60px;
        border-radius: 15px;
        border:1px dashed #feb600;
      }
    }
  }
  .row{  
      margin:40px 56px;
      .button{    
          width: 70px;    
          height: 70px;    
          line-height:70px;    
          border-radius: 20%;    
          border: none;    
          text-align:center;    
          font-size: 25px;    
          color:#FFFFFF;    
          font-weight:bold;  
      }    
  }
  .right{  
    background:#EA5149; 
    float: right; 
  }
  .left{  
    background:#feb600;  
    margin-right:80px; 
  }
}
</style>
