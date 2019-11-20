const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js')
const multer = require('multer');
//dest表示后台要存放图片的对应文件夹的地址
const upload = multer({dest:'public/uploads/'})

//此页面处理根管理员的请求
//进行是否是管理员的验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){//isAdmin的值是布尔值
		next();
	}else{
		res.send('<h1>请用管理员账号进行登录！！</h1>')
	}
})

//获取文章管理页面
router.get('/',(req,res) =>{
	const options = {
		page:req.query.page*1,//当前页码
		model:ArticleModel,//所用模型(集合)
		query:{},//查询条件
		projection:'-__v',//所需显示隐藏字段
		sort:{_id:1}//排序
	}
	pagination(options)//调用分类函数
	.then(result =>{//获取到页面和返回所需数据到页面	
		res.render('admin/article_list',{
		userInfo:req.userInfo,
		categories:result.docs,
		page:result.page,
		pages:result.pages,
		list:result.list,
		url:'/article'
		})
	})
	.catch(err =>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作过于频繁，请稍后重试！！'
		})
	})
})


//获取新增文章页面
router.get('/add',(req,res) =>{
	CategoryModel.find({},'name')
	.then(categories =>{
		res.render('admin/article_add',{
			userInfo:req.userInfo,
			categories:categories
		})
	})
	.catch(err =>{//插入数据失败
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作过于频繁，请稍后重试！！'
		})
	})
})

//处理新增文章请求
router.post('/add',(req,res) =>{	
	//1.获取参数
	let { category,title,intro,content } = req.body;
	//2.插入文章到数据库中
	ArticleModel.insertMany({
		category,
		title,
		intro,
		content,
		author:req.userInfo._id
	})
	.then(result =>{//插入数据成功
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'新增文章成功！！',
			url:'/article'
		})
	})
	.catch(err =>{//插入数据失败
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作过于频繁，请稍后重试！！',
			url:'/article'
		})
  	})
})

//处理上传图片请求
//upload.single('upload')
//upload表示的是前台传递图片资源的字段名称,与前台控制台formData中的字段保持一致
//因为图片相当于就存在upload这个字段中，upload中存的就是图片的二进制
router.post('/uploadImg',upload.single('upload'),(req,res) =>{
	//表示图片在后台的路径
	// console.log(req.file)
	const filepath = '/uploads/'+req.file.filename;
	res.json({
		uploaded:true,
		url:filepath
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
						message:'数据库操作失败，请稍后重试！！'
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