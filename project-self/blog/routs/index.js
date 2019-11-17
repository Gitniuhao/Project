const express = require('express');
const router = express.Router();
//此页面处理根目录下的直接请求
//获取首页
router.get('/',(req,res) =>{	
	res.render('main/index',{
		userInfo:req.userInfo
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