const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {openid,add} = ctx.request.body
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
		mark = mark + add;//重新加上最新分数
		console.log('当前分数：',mark)

		await mysql('records').insert({//将最新数据插入数据库
			openid,
			add,
			mark
		})
		ctx.state.data = {
			code:0,
			message:"success"
		}
		console.log('执行成功！')
	}catch(e){
		ctx.state.data = {//向前端传递信息
			code:-1,
			data:{
				msg:"添加失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}