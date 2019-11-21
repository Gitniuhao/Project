const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js')
//此页面处理根管理员的请求
//进行是否是管理员的验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){//isAdmin的值是布尔值
		next();
	}else{
		res.send('<h1>请用管理员账号进行登录！！</h1>')
	}
})

//获取分类管理页面
router.get('/',(req,res) =>{
	const options = {
		page:req.query.page*1,//当前页码
		model:CategoryModel,//所用模型(集合)
		query:{},//查询条件
		projection:'-__v',//所需显示隐藏字段
		sort:{order:1}//排序
	}
	pagination(options)//调用分类函数
	.then(result =>{//获取到页面和返回所需数据到页面	
		res.render('admin/category_list',{
		userInfo:req.userInfo,
		categories:result.docs,
		page:result.page,
		pages:result.pages,
		list:result.list,
		url:'/category'
		})
	})
	.catch(err =>{
		console.log(err)
	})
})

//获取新增分类页面
router.get('/add',(req,res) =>{	
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
})

//处理新增分类请求
router.post('/add',(req,res) =>{	
	//1.获取参数
	let { name,order } = req.body;
	if(!order){
		order = 0;
	}
	// console.log(name,order)
	//2.进行验证数据库中是否以及存在
	CategoryModel.findOne({name:name})
	.then(category =>{//数据查询成功
		if(category){//数据已经存在，不能插入
			res.render('admin/err',{
					userInfo:req.userInfo,
					message:'分类已经存在，请重新进行添加！！'
				})
		}else{//3.插入数据,数据不存在，可以插入
			CategoryModel.insertMany({name:name,order:order})
			.then(result =>{//插入数据成功
				res.render('admin/ok',{
					userInfo:req.userInfo,
					message:'新增分类成功！！',
					url:'/catgory'
				})
			})
			.catch(err =>{//插入数据失败
				console.log(err)
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:'数据库操作过于频繁，请稍后重试！！',
					url:'/catgory'
				})
			})
		}
	})
	.catch(err =>{//数据查询失败
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作过于频繁，请稍后重试！！'
		})
	})	
})

//获取编辑分类页面
router.get('/edit/:id',(req,res) =>{
	//获取参数id
	const id = req.params.id;
	//从数据库中查找id对应数据
	CategoryModel.findById(id)
	.then(category =>{
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category:category
		})
	})
	.catch(err =>{//数据查询失败
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作过于频繁，请稍后重试！！'
		})
	})		
})

//处理编辑分类请求
router.post('/edit',(req,res) =>{
	//1.获取参数
	let { name,order,id } = req.body;
	//2.进行验证是否可以更新
	CategoryModel.findById(id)
	.then(category =>{//获取需要更改的数据
		if(category.name == name && category._id.toString() == id){//数据没有更改
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:'数据还未更改，请进行编辑之后再进行提交！！'
			})
		}else{//数据已经更改
			CategoryModel.findOne({name:name,_id:{$ne:id}})//3.进行验证是否有同名数据
			.then(category =>{
				if(category){//已存在同名数据，还是不可更改
					res.render('admin/err',{
					userInfo:req.userInfo,
					message:'数据库中已经由同名分类，请重新编辑分类！！'
				 })
			   }else{//不存在同名数据，可以更改
			    CategoryModel.updateOne({_id:id},{name,order})
				.then(data =>{
					res.render('admin/ok',{
						userInfo:req.userInfo,
						message:'编辑分类成功！！',
						url:'/catgory'
					})
			   	})
			   	.catch(err =>{//进行更改失败
			   		res.render('admin/err',{
						userInfo:req.userInfo,
						message:'数据库操作失败，请稍后重试！！',
						url:'/catgory'
					 })
			   	})
			  }				
		  })
		}
	})
	.catch(err =>{//获取相应数据失败
   		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败，请稍后重试！！'
		 })
   	})
})

//处理删除路由的请求
router.get('/delete/:id',(req,res) =>{
	//获取参数id
	const id = req.params.id;
	//从数据库中查找id对应数据进行删除
	CategoryModel.deleteOne({_id:id})
	.then(category =>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'删除分类成功！！',
			url:'/catgory'
		})
	})
	.catch(err =>{
   		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败，请稍后重试！！',
			url:'/catgory'
		 })
   	})	
})
//导出router实例
module.exports = router