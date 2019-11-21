const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.js')
//此页面处理根目录下的直接请求

async function getCommonData(){
	const getCategoriesDataPromise = await CategoryModel.find({},'name').limit(5);
	const categories = await getCategoriesDataPromise;

	return {
		categories
	}
}
//获取首页
router.get('/',(req,res) =>{
	getCommonData()
	.then(data =>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories:data.categories
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
//导出router实例
module.exports = router;