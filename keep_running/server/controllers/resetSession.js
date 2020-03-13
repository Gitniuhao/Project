const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	try{
		const session = {
			name:ctx.session.name,
			password:ctx.session.password,
			isAdmin:ctx.session.isAdmin
		}
		if(session){//如果session存在则清空session
			// 设置session为空:
			ctx.session.name = ''
			ctx.session.password = ''
			ctx.session.isAdmin = ''
			ctx.state = {
		  	   code:0,
		  	   data:{
		  	   	msg:'success'
		  	   }		  	   
		    }					
		}
		console.log('清除session成功~')		
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:'清除session失败~'
			}			
		}
		console.log('执行错误')
	}
}