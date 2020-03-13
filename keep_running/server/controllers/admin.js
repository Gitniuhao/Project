const {mysql} = require('../qcloud.js')

async function getAdminList(ctx){
	const {page} = ctx.request.query
	try{			
		if(page <= 0){
			page = 1;
		}
		const limit = 4
		const res =await mysql('admins').count('id')
		const count = res[0]['count(`id`)']//获取总数量
		const pages = Math.ceil(count / limit);//获取总页数
		if(page > pages){
			page = pages;
		}
		if(pages == 0){
			page = 1;
		}
		const list = await mysql('admins')
							.orderBy('id','desc')
							.limit(limit).offset(Number(page-1)*limit)//查询得出数据
	//一次限制5条，且offset是限制从第多少条开始查询，page=1,从第0条查询，page为2，从第5条开始
		ctx.state.data = {
		  	list:list,
			current:page*1,
			pageSize:limit,
			total:count
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

async function addAdmin(ctx){
	const {name,password,phone,email,isAdmin} = ctx.request.body
	try{
	console.log(name,password,phone,email,isAdmin)			
		if(name&&password&&phone&&email&&isAdmin){
			await mysql('admins').insert({
				name,
				password,
				phone,
				email,
				isAdmin
			})
		}
		ctx.state = {
		  	code:0,
		  	data:{
		  		msg:'新增管理员成功~'
		  	}
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"新增失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function resetPassword(ctx){
	const {name,password} = ctx.request.body
	try{
		// console.log(name,password)			
		await mysql('admins').where('name',name).update('password',password)
		ctx.state = {
		  	code:0,
		  	data:{
		  		msg:'修改密码成功~'
		  	}
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"修改密码失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function delteAdmin(ctx){
	const {id} = ctx.request.body
	try{			
		await mysql('admins').where('id',id).del()
		ctx.state = {
		  	code:0,
		  	data:{
		  		msg:'删除管理员成功~'
		  	}
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"修改密码失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}
module.exports ={
	getAdminList,
	addAdmin,
	resetPassword,
	delteAdmin
}