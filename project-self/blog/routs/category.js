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
	res.render('admin/category_list',{
		userInfo:req.userInfo
	})
})


//导出router实例
module.exports = router;