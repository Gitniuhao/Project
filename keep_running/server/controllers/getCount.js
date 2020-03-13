const {mysql} = require('../qcloud.js')

module.exports = async (ctx,next)=>{
	//权限控制
	if(ctx.session.isAdmin == 1){
		next()
	}else{
		ctx.state = {
		  	code:10,
		  	data:{
		  		msg:'没有管理员权限'
		  	}
		 }
	}
	try{
		
		const userNum = await mysql('csessioninfo').count('open_id');
		const adminNum = await mysql('admins').count('id');
		const articleNum = await mysql('articles').count('id');
		const opnionNum = await mysql('opinions').count('id');
		ctx.state = {
		  	code:0,
		  	data:{
		  		msg:'success',
		  		userNum:userNum,
		  		adminNum:adminNum,
		  		articleNum:articleNum,
		  		opnionNum:opnionNum
		  	}
		  }
		console.log('查询成功！')
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"查询失败"+e.sqlMessage
			}			
		}
		console.log('查询错误')
	}
}