<template>
	<div class="book-card">
		<div class="table" width="98%"> 
			<div class="tr">
				<div class="date">
					{{createTime}}
				</div>
				<div class="busi">
					<label v-if="record.add>0">+{{record.add}}</label>
					<label v-if="record.add==0">&nbsp;0</label>
					<label v-if="record.add<0">{{record.add}}</label>
				</div>
				<div class="mark">
					<label v-if="record.mark>=0">&nbsp;{{record.mark}}</label>
					<label v-else>{{record.mark}}</label>
				</div>
				<div class="net" @click="changeShow">
					<label v-if="note">{{note}}</label>
					<label v-else class="no-note">点击添加</label>
				</div>
				<!-- show_input为true时，显示取消按钮，为false时，有备注显示编辑按钮，没有则为空 -->
				<label v-if="show_input">
					<div class="image" @click="cancel">
						<img class="img" src="/static/images/quxiao.png">
					</div>
				</label>
				<label v-else>
					<div class="image" @click="changeShow">
						<img class="img" :src="note?src : ''">
					</div>
				</label>
			</div>
		</div>
		<div class="hide" v-if="show_input">
			<button class="btn" @click="updateNote">
				<label v-if="note">修改</label>
				<label v-else>添加</label>
			</button>
			<input v-model="note"
					class="input"
					maxlength="10"
					placeholder="最多输入10个字" 
			>
		</div>
	</div>
</template>

<script>
	import {formatTime} from "@/utils/index"
	import {showModal,post} from "@/util"
	export default{
		props:["record"],
		data(){
			return{
				createTime:formatTime(new Date(this.record.create_time)),//利用方法将时间格式化
				show_input:false,
				note:this.record.note,
				src:"/static/images/bianji.png"
			}
		},
		methods:{
			changeShow(){//修改编辑按钮和修改按钮的状态
				this.show_input = !this.show_input
			},
			async updateNote(){//添加修改
				try{
					const data = {
						id:this.record.id,
						note:this.note
					}
					const res = await post("/weapp/updatenote",data)
					console.log("打印出前端传来的信息：",res)
					this.show_input = false//修改成功之后直接隐藏修改栏
					this.record.note = this.note//前后端保持一致
				}catch(e){
					showModal("操作失败","请稍后重试~")
					console.log("打印从后端传来的错误的信息：",e)
				}
			},
			cancel(){//取消按钮
				this.show_input = !this.show_input//赋予反向状态
				this.note = this.record.note//将note还原为原来的数据
			}
		}
	}
</script>

<style lang="scss">
.book-card{
  background: #FFFFFF;
  margin-bottom:6px;
  .table {
    border: 0px solid darkgray;
    font-size: 15px;
    height: 42px;
    line-height:42px;
    .tr {
      display: flex;
      width: 100%;
    }
    .date{
      width: 40%;
      margin-left: 10px;
    }
    .busi{
      width: 10%;
      font-weight:bold;
    }
    .mark{
      width: 15%;
      margin-left: 20px;
      font-weight:bold;
    }
    .net{
      width: 16%;
      text-align:center;
      width:60px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 14px;
      margin-left: 5px;
      line-height:42px;
      .no-note{
        text-decoration:underline;
        color:#C0C0C0;
        font-size: 13px;
      }
    }
    .image{
      padding-top:1px;
      float: right;
      margin-left: 5px;
    }
  }
  .hide{
    background: #F0F0F0;
    font-size: 15px;
    padding: 10px 10px 3px 30px;
    .input{
      width:60%;
      height:30px;
      background:#FFFFFF;
      border:1px solid black;
      border-radius: 5px;
      text-align:center;
    }
    .btn{
      color:white;
      background:#EA5A49;
      padding-left: 15px;
      margin-right:20px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      width: 18%;
      float:right;
    }
  }
  .img{
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>