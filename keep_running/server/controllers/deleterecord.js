const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {openid} = ctx.request.body
	try{
		const res = await mysql("records")
							.where("openid",openid)
							.orderBy('id','desc')
							.first()//查找到最新的一条记录

		if(res){//如果查找到最新的一条记录
			await mysql('records').where("id",res.id).del();//根据查找到的最新一条数据的id进行删除
			const res_res = await mysql('records')
									.where("openid",openid)
									.select('mark')
									.orderBy('id','desc')
									.first()//查找到最新一条数据的分数
			if(res_res){//如果查找到最新一条数据,将其赋值mark
				var mark = res_res.mark
			}else{//否则mark分数为0
				var mark = 0
			}
		}else{
			var mark = 0
		}

		ctx.state.data = {
			code:0,
			msg:"success",
			mark:mark
		}
	}catch(e){
		console.log("执行失败",e)
		ctx.state = {
			code:-1,
			data:{
			  msg:"撤销失败"+e.sqlMessage
			}
		}
	}
}
