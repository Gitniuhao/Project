const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
//此页面处理根目录下的直接请求
//获取共通数据
async function getCommonData(){
	const getCategoriesDataPromise =  CategoryModel.find({},'name').limit(5);
	const getTopArticlesDataPromise = ArticleModel.find({},'title click').sort({click:1}).limit(10)
	//获取顶部导航分类列表
	const categories = await getCategoriesDataPromise;
	//获取点击排行榜文章数据
	const topArticles = await getTopArticlesDataPromise;

	return {
		categories,
		topArticles
	}
}
//获取首页
router.get('/',(req,res) =>{
	ArticleModel.getArticle(req)
	.then(result =>{
		getCommonData()
		.then(data =>{
			res.render('main/index',{
				userInfo:req.userInfo,
				categories:data.categories,
				topArticles:data.topArticles,
				//分页所需要的数据
				articles:result.docs,
				page:result.page,
				pages:result.pages,
				list:result.list,
				url:''
			})
		})	
	})	
})

//获取列表页面
router.get('/list',(req,res) =>{
	res.render('main/list',{
		userInfo:req.userInfo
	})
})

//获取详情页
router.get('/detail',(req,res) =>{
	res.render('main/detail',{
		userInfo:req.userInfo
	})
})

//处理首页分页请求
router.get('/articles',(req,res) =>{
	ArticleModel.getArticle(req)
	.then(result =>{
		res.json({
			code:0,
			message:'获取数据成功',
			data:result
		})
	})
	.catch(err =>{
		res.json({
			code:10,
			message:'获取数据失败'
		})
	})
})
//导出router实例
module.exports = router;