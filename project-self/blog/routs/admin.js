const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
//此页面处理根管理员的请求
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('<h1>请用管理员账号进行登录！！</h1>')
	}
})
//获取管理中心首页
router.get('/',(req,res) =>{	
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

//获取管理中心列表页
router.get('/users',(req,res) =>{
	//获取用户信息显然到模板
	const limit = 4;
	let page = req.query.page*1;//乘1是隐式转换
	//当page不是数字时的处理
	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}
	userModel.countDocuments((err,count) =>{
		//获取页数
		let pages = Math.ceil((count/limit));
		//下一页边界控制
		if(page > pages){
			page = pages;
		}
		//因为swig无法对数字进行遍历循环，因此需要在后台生成页码
		let list = [];
		for(let i=1;i<=pages;i++){
			list.push(i)
		}
		let skip = (page-1)*limit;
		//查找数据
		userModel.find({})
		.skip(skip)
		.limit(limit)
		.then(users =>{
			res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:users,
			page:page,
			pages:pages,
			list:list
		  })
		})
		.catch(err =>{
			res.json({
				code:0,
				message:'请求失败'
			})
		})	
	})
	
})

//导出router实例
module.exports = router;