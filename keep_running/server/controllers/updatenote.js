//kenx操作数据库
const {mysql} = require('../qcloud.js')

module.exports = async(ctx)=>{
	const {id,note} = ctx.request.body

	try{
		await mysql('records').where('id',id).update('note',note)
		ctx.state.data = {//向前端传递信息
			code:0,
			msg:"success"
		}
		console.log('执行成功')
	}catch(e){//修改失败
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"修改失败"+e.sqlMessage
			}			
		}
		console.log('修改失败')
	}	
}