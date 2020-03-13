const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {openid} = ctx.request.query
	try{
		const res = await mysql('records')
		.where('openid',openid)
		.select('mark')
		.orderBy('id','desc')
		.first()//将查询出来的信息倒着排序取第一个就是最新数据

		if(res){//将查询出的信息拿出
			var mark = res.mark
		}else{
			var mark = 0;	
		}

		ctx.state.data = {
		  	code:0,
		  	msg:'success',
		  	mark:mark
		  }
		console.log('执行成功！',res.mark)
	}catch(e){
		ctx.state.data = {//向前端传递信息
			code:-1,
			data:{
				msg:"获取失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}