const {mysql} = require('../qcloud.js')

async function getUserList(ctx){
	const {page} = ctx.request.query
	try{			
		if(page <= 0){
			page = 1;
		}
		const limit = 5
		const res =await mysql('csessioninfo').count('open_id')
		const count = res[0]['count(`open_id`)']//获取总数量
		const pages = Math.ceil(count / limit);//获取总页数
		if(page > pages){
			page = pages;
		}
		if(pages == 0){
			page = 1;
		}
		const list = await mysql('csessioninfo')
							.orderBy('open_id')
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

async function delteUser(ctx){
	const {openId} = ctx.request.body
	try{			
		await mysql('cSessionInfo').where('open_id',openId).del()
		ctx.state = {
		  	code:0,
		  	data:{
		  		msg:'删除成功！'
		  	}
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

async function setSession(ctx, next){
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        ctx.state.data = ctx.state.$wxInfo.userinfo
    } else {
        ctx.state.code = -1
    }
}

module.exports = {
	setSession,
	getUserList,
	delteUser
}