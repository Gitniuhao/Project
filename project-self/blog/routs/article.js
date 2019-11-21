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
		sort:{_id:1},//排序，
		populates:[{ path:'user',select:'username'},{path:'category',select:'name'}]
	}
	pagination(options)//调用分类函数
	.then(result =>{//获取到页面和返回所需数据到页面
	// console.log(result)	
		res.render('admin/article_list',{
		userInfo:req.userInfo,
		articles:result.docs,
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
		res.render('admin/article_edit_add',{
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
		uesr:req.userInfo._id
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

//获取编辑文章页面
router.get('/edit/:id',(req,res) =>{
	//获取参数id
	const id = req.params.id;
	//从数据库中查找id对应数据
	CategoryModel.find({})
	.then(categories =>{//查找到所有分类
		ArticleModel.findById(id)//根据id查找到对应的文章
		.then(article =>{
			res.render('admin/article_edit_add',{
				userInfo:req.userInfo,
				categories:categories,
				article:article
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
	.catch(err =>{//分类数据查询失败
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作过于频繁，请稍后重试！！'
		})
	})		
})

//处理编辑文章请求
router.post('/edit',(req,res) =>{
	//1.获取参数
	let { category,title,intro,content,id } = req.body;
	//2.进行验证是否可以更新
    ArticleModel.updateOne({_id:id},{category,title,intro,content,id})
	.then(data =>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'编辑文章成功！！',
			url:'/article'
		})
   	})
   	.catch(err =>{//进行更改失败
   		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败，请稍后重试！！',
			url:'/article'
		 })
   	})
})

//处理删除文章的请求
router.get('/delete/:id',(req,res) =>{
	//获取参数id
	const id = req.params.id;
	//从数据库中查找id对应数据进行删除
	ArticleModel.deleteOne({_id:id})
	.then(category =>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'删除文章成功！！',
			url:'/article'
		})
	})
	.catch(err =>{
   		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败，请稍后重试！！',
			url:'/article'
		 })
   	})	
})

//导出router实例
module.exports = router