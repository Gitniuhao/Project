const {mysql} = require('../qcloud.js')

async function uploadImage(ctx){//上传封面图片
	try{					
		const filePath = 'http://127.0.0.1:5757/article-images/'+ ctx.req.file.filename;
		ctx.body = {
				"name": ctx.req.file.originalname,
				"status": "done",
				"url": filePath,
				"thumbUrl": filePath				  		
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"上传图片失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function uploadDetailImage(ctx){//上传内容图片
	try{					
		const filePath = 'http://127.0.0.1:5757/article-images/'+ ctx.req.file.filename;
		ctx.body = {
				"success": true,
		  		"msg": "上传成功",
		  		"file_path": filePath				  		
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"上传图片失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function addArticle(ctx){//新增文章
	const {values,mainImage,content} = ctx.request.body
	const title = values.title
	const author = values.author
	console.log(title,author,mainImage,content)
	try{
		const view = 0;					
		const isShow = 0;					
		const isCollection = 0;
		let article_image = mainImage
		await mysql('articles').insert({
			title,
			author,
			article_image,
			view,
			isShow,
			isCollection,
			content
		})					
		ctx.state = {
			 code:0,
			 data:{
			 	"msg": "新增文章成功~"
			 }			  	 				  		
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"新增文章失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function getArticleList(ctx){//获取文章列表
	const {page,keyword} = ctx.request.query
	// console.log(page,keyword)
	try{
		if(keyword){
			if(page <= 0){
				page = 1;
			}
			const limit = 4
			const title = {$regex:new RegExp(keyword,'i')};//将关键词转换成匹配规则
			const res = await mysql('articles').count('title')
			const count = res[0]['count(`title`)']//获取总数量
			const pages = Math.ceil(count / limit);//获取总页数
			if(page > pages){
				page = pages;
			}
			if(pages == 0){
				page = 1;
			}
			const list = await mysql('articles')
								.orderBy('title','desc')
								.limit(limit).offset(Number(page-1)*limit)//查询得出数据
		//一次限制5条，且offset是限制从第多少条开始查询，page=1,从第0条查询，page为2，从第5条开始
							
			ctx.body = {
				 list:list,
				 current:page*1,
				 pageSize:limit,
				 total:count,
				 keyword:keyword				  		
			  } 
		}else{
			if(page <= 0){
				page = 1;
			}
			const limit = 4
			const res =await mysql('articles').count('id')
			const count = res[0]['count(`id`)']//获取总数量
			const pages = Math.ceil(count / limit);//获取总页数
			if(page > pages){
				page = pages;
			}
			if(pages == 0){
				page = 1;
			}
			const list = await mysql('articles')
								.orderBy('id','desc')
								.limit(limit).offset(Number(page-1)*limit)//查询得出数据
		//一次限制5条，且offset是限制从第多少条开始查询，page=1,从第0条查询，page为2，从第5条开始
							
			ctx.body = {
				 list:list,
				 current:page*1,
				 pageSize:limit,
				 total:count,
				 keyword:keyword				  		
			  }
		}		
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"获取文章列表失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function updateArticleIsShow(ctx){//上传内容图片
	const {id,isShow,page} = ctx.request.body
	console.log(id,isShow,page)
	try{
		await mysql('articles').where('id',id).update('isShow',isShow)
		if(page <= 0){
			page = 1;
		}
		const limit = 4
		const res =await mysql('articles').count('id')
		const count = res[0]['count(`id`)']//获取总数量
		const pages = Math.ceil(count / limit);//获取总页数
		if(page > pages){
			page = pages;
		}
		if(pages == 0){
			page = 1;
		}
		const list = await mysql('articles')
							.orderBy('id','desc')
							.limit(limit).offset(Number(page-1)*limit)//查询得出数据
	//一次限制5条，且offset是限制从第多少条开始查询，page=1,从第0条查询，page为2，从第5条开始
						
		ctx.body = {
			 list:list,
			 current:page*1,
			 pageSize:limit,
			 total:count,				  		
		  }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"更新isShow失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function getArticleDetail(ctx){//获取文章详情
	const {id} = ctx.request.query
	try{					
		const res = await mysql('articles').where('id',id).select().first()
		const title =res.title;
		const author =res.author;
		const mainImage =res.article_image;
		const detail =res.content;
		ctx.body = {
			title,				  		
			author,				  		
			mainImage,				  		
			detail		  		
		 }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"获取文章详情失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

async function updateArticle(ctx){//更新文章详情
	const {values,mainImage,content} = ctx.request.body
	const title = values.title
	const author = values.author
	const id = values.id
	console.log(id,author,title,mainImage,content)
	try{
		await mysql('articles').where('id',id).update({
			'title':title,
			'author':author,
			'article_image':mainImage,
			'content':content
		})		
		ctx.state = {
			code:0,
			 data:{
			 	msg:'编辑文章成功~'
			 } 		
		 }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"编辑文章失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}


async function deleteArticle(ctx){//删除文章
	const {id} = ctx.request.body
	console.log(id)
	try{
		await mysql('articles').where('id',id).delete()		
		ctx.state = {
			code:0,
			 data:{
			 	msg:'删除文章成功~'
			 } 		
		 }
	}catch(e){
		ctx.state = {//向前端传递信息
			code:-1,
			data:{
				msg:"删除文章失败"+e.sqlMessage
			}			
		}
		console.log('执行错误')
	}
}

module.exports ={
	uploadImage,
	uploadDetailImage,
	addArticle,
	getArticleList,
	updateArticleIsShow,
	getArticleDetail,
	updateArticle,
	deleteArticle
}