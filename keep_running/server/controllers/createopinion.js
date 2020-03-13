//kenx操作数据库
const {mysql} = require('../qcloud.js')

module.exports = async(ctx)=>{
	const {opinion,src,wechat,openid} = ctx.request.body//接收传递来的信息
	// console.log('opinion:',opinion)

	try{
		await mysql('opinions').insert({
			opinion,
			src,
			wechat,
			openid
		})
		ctx.state.data = {//向前端传递信息
			code:0,
			msg:"success"
		}
		console.log('执行成功')
	}catch(e){//添加失败
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"添加失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}	
}