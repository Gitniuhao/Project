const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {name,password,isAdmin} = ctx.request.body
	try{
		const res = await mysql('admins').where('name',name).select()//查找出对应数据
		// console.log(name,password)
		// console.log(res[0].password==password)
		// console.log(res[0].isAdmin==isAdmin)
		if(res[0].password == password && res[0].isAdmin == isAdmin){//判断数据是否符合
			// 设置session:
			ctx.session.name = name
			ctx.session.password = password
			ctx.session.isAdmin = isAdmin
			ctx.state = {
		  	   code:0,
		  	   data:{
		  	   	msg:'success',
		  	   	name:name
		  	   }		  	   
		    }			
		}else{
			ctx.state = {
		  	   code:-1,
		  	   data:{
		  	     msg:"用户名和密码错误~"
		  	   }			   	
		    }			
		}		
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:'登录失败'+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}