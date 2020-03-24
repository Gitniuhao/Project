const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {id} = ctx.request.query
	console.log(id)
	try{
		const articleDetail = await mysql('articles')
									.where('id',id)
									.select()
									.first()
		ctx.state.data = {
		  	articleDetail
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