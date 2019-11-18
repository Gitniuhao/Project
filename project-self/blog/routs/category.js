const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js')
//此页面处理根管理员的请求
//进行是否是管理员的验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('<h1>请用管理员账号进行登录！！</h1>')
	}
})

//获取分类管理页面
router.get('/',(req,res) =>{
	const options = {
		page:req.query.page*1,
		model:CategoryModel,
		query:{},
		projection:'-password,-__v',
		sort:{_id:-1}
	}
	pagination(options)
	.then(result =>{	
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
	res.render('admin/category_add',{
		userInfo:req.userInfo
	})
})

//处理新增分类请求
router.post('/add',(req,res) =>{	
	//1.获取参数
	let { name,order } = req.body;
	if(oredr == ''){
		oredr = 1
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
					message:'数据库操作过于频繁，请稍后重试！！'
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

})

//导出router实例
module.exports = router