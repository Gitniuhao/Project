const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {openid,page} = ctx.request.query
	try{
		const records = await mysql('records')
							.where('openid',openid)
							.orderBy('id','desc')
							.limit(15).offset(Number(page)*15)
	//一次限制15条，且offset是限制从第多少条开始查询，page=1,从第15条查询，page为2，从第30条开始
		ctx.state.data = {
		  	records
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"获取失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}