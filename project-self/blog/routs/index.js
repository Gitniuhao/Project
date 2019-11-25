const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const CommentModel = require('../models/comment.js')
//此页面处理根目录下的直接请求

//获取共通数据
async function getCommonData(){
	const getCategoriesDataPromise =  CategoryModel.find({},'name').limit(5);
	const getTopArticlesDataPromise = ArticleModel.find({},'title click').sort({click:-1}).limit(10)
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
	ArticleModel.getPaginationArticle(req)
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
router.get('/list/:id',(req,res) =>{
	let id = req.params.id;
	ArticleModel.getPaginationArticle(req,{category:id})
	.then(result =>{
		getCommonData()
		.then(data =>{
			res.render('main/list',{
				userInfo:req.userInfo,
				categories:data.categories,
				topArticles:data.topArticles,
				//分页所需要的数据
				articles:result.docs,
				page:result.page,
				pages:result.pages,
				list:result.list,
				url:'/list',
				//回传的分类id
				currentCategoryId:id
			})
		})	
	})	
})

//获取详情页数据
async function getArticleData(req){
	//获取共通数据
	const getCommonDataPromise = getCommonData()

	//获取文章数据
	const id = req.params.id;
	const getArticleDataPromise = ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
										      .populate({path:'user',select:'username'})
										      .populate({path:'category',select:'name'})

	const getCommentDataPromise = CommentModel.getPaginationComment(req,{article:id})
	//为了保证点击排行和文章内点击率相同，必须先获取更新后的文章内容
	const ArticleData = await getArticleDataPromise;

	const commonData = await getCommonDataPromise;

	const commentsData = await getCommentDataPromise;
										      
	const { categories,topArticles } = commonData;

	return{
		categories,
		topArticles,
		ArticleData,
		commentsData 
	}
}

//获取详情页
router.get('/detail/:id',(req,res) =>{
	getArticleData(req)
	.then(data =>{
		const { categories,topArticles,ArticleData,commentsData  } = data;
		res.render('main/detail',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			ArticleData,
			//回传的分类id
			currentCategoryId:ArticleData.category._id.toString(),
			//分页所需要的数据
			comments:commentsData.docs,
			page:commentsData.page,
			pages:commentsData.pages,
			list:commentsData.list
		})
	})	
})

//处理分页请求，只请求文章部分数据进行局部渲染页面
router.get('/articles',(req,res) =>{
	const id = req.query.id
	let query = {}
	if(id){
		query.category = id
	}
	ArticleModel.getPaginationArticle(req,query)
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