<template>
	<div>
		<div v-if="show_record">
			<div class="prompt">还没有任何记录~</div>
		</div>
    <!-- 有记录值的时候 -->
		<div v-else>
			<div class="table th">
				<div class="date">时间</div>
				<div class="busi">分数</div>
				<div class="mark">最后得分</div>
				<div class="net">备注</div>
			</div>
      <RecordList v-for="(record,index) in records" :key="index" :record='record'></RecordList>
      <p class="text-footer" v-if="!more">没有更多数据了~</p>
      <p class="text-footer" v-else>加载中...</p>
		</div>
	</div>
</template>

<script>
	import {get} from "@/util"
  import RecordList from "@/components/recordList"
	export default{
    components:{
      RecordList
    },
		data(){
			return{
				userinfo:{},
				show_record:false,
        records:[],
        page:0,
        more:true
			}
		},
    methods:{
      async getRecords(init){
        wx.showToast({
          title:"加载中",
          icon:"loading"
        })
        if(init){//当init为true，将一切变为初始状态
          this.page = 0
          this.more = true
        }
        if(this.page === 0){
          this.records = []
        }
        try{
          const data ={
            openid:this.userinfo.openId,
            page:this.page
          }
          const res = await get("/weapp/getrecords",data)
          console.log("后端传来的信息：",res)
          this.records = this.records.concat(res.records)//将后台获取的数据进行拼接赋值
          if(res.records.length <15){
            this.more = false//如果获取的数据不足15条，其页面大于0，则没有更多数据了，停止操作
          }
          if(this.records.length == 0){//如果页面记录个数为零，则显示提示语句
            this.show_record = true
          }else{
            this.show_record = false
          }
          wx.hideToast()//将提示框隐藏起来
        }catch(e){
          console.log("后端传来的错误信息：",e)
          wx.hideToast()//将提示框隐藏起来
        }
      }
    },
    onPullDownRefresh(){
      this.getRecords(true)
      wx.stopPullDownRefresh()
    },
    onReachBottom(){//每次到底页面底部触发的函数
      if(!this.more){//如果没有更多数据，就停止下面的操作
        return
      }
      this.page = this.page + 1;
      console.log("现在是第几页：",this.page)
      this.getRecords()
    },  
    onShow:function(){
       const userinfo = wx.getStorageSync('userinfo');
      if(userinfo.openId){//如果userinfo中有唯一标识openID,则登录成功，将userinfo赋值
        this.userinfo = userinfo
        this.getRecords(true)
        console.log("getRecords")
      }
    },
    onShareAppMessage(){//允许用户分享
      return{
        title:"Keep Running",
        path:'/pages/index/main'
      }
    }
	}
</script>

<style lang="scss" scoped>
.add{
    margin-top: 20px;
    margin-bottom: 10px;
    text-align:center;
  p{
      font-size: 15px;
  }
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
}
.prompt{
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}
.date{
  width: 23%;
  padding-left: 60px;
}
.busi{
  width: 10%;
  margin-left: 5px;
}
.mark{
    width: 20%;
  margin-left: 10px;
}
.net{
  width: 20%;
  margin-left: 20px;
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
  padding-top: 5px;
}	
</style>