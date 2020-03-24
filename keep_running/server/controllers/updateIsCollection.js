//kenx操作数据库
const {mysql} = require('../qcloud.js')

module.exports = async(ctx)=>{
	const {id,openId,isCollection} = ctx.request.body
	console.log(id,openId,isCollection)
	try{
		await mysql('articles').where('id',id).update('isCollection',isCollection)
		// await mysql('articles').where('id',id).insert('openid',openId)
		ctx.state.data = {//向前端传递信息
			code:0,
			'msg':'success'			
		}
		console.log('更新成功')
	}catch(e){//修改失败
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"更新失败"+e.sqlMessage
			}			
		}
		console.log('修改失败')
	}	
}