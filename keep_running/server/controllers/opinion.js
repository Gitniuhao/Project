const {mysql} = require('../qcloud.js')

async function getOpinionList(ctx){
	const {page} = ctx.request.query
	try{			
		if(page <= 0){
			page = 1;
		}
		const limit = 4
		const res =await mysql('opinions').count('id')
		const count = res[0]['count(`id`)']//获取总数量
		const pages = Math.ceil(count / limit);//获取总页数
		if(page > pages){
			page = pages;
		}
		if(pages == 0){
			page = 1;
		}
		const list = await mysql('opinions')
							.orderBy('id','desc')
							.limit(limit).offset(Number(page-1)*limit)//查询得出数据
		const userInfo = await mysql('cSessionInfo').innerJoin('opinions','cSessionInfo.open_id','opinions.openid')
		const UserInfo = JSON.parse(userInfo[0].user_info)
		const name = UserInfo.nickName//关联查询得出反馈用户
		const List = list.map(opinion=>{//将反馈用户加入返回前台的数据
			return{
				id:opinion.id,
				name:name,
				src:opinion.src,
				wechat:opinion.wechat,
				opinion:opinion.opinion,
				create_time:opinion.create_time
			}
		})
	//一次限制5条，且offset是限制从第多少条开始查询，page=1,从第0条查询，page为2，从第5条开始
		ctx.state.data = {
		  	list:List,
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

async function delteOpinion(ctx){
	const {id} = ctx.request.body
	try{			
		await mysql('opinions').where('id',id).del()
		ctx.state = {
		  	code:0,
		  	data:{
		  		msg:'删除意见反馈成功~'
		  	}
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"删除失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function getOpinionDetail(ctx){
	const {id} = ctx.request.query
	try{			
		const res = await mysql('opinions').where('id',id).select().first()
		const userInfo = await mysql('cSessionInfo').innerJoin('opinions','cSessionInfo.open_id','opinions.openid')
		const UserInfo = JSON.parse(userInfo[0].user_info)
		const name = UserInfo.nickName//关联查询得出反馈用户 
		ctx.state ={
		  	code:0,
		  	data:{
		  		name:name,
				wechat:res.wechat,
				opinionImages:res.src,
				opinion:res.opinion
		  	}
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"获取详情失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

module.exports = {
	getOpinionList,
	delteOpinion,
	getOpinionDetail
}