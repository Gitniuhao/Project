const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js')
const hmac = require('../util/hamc.js')
//此页面处理user路由下的各种请求

//处理注册请求
router.post('/register',(req,res)=>{
	//1.获取参数，通过调用中间件：body-paser,req.body将获取的参数自动转换为对象
	const { username,password } = req.body;
	//2.检测数据库是否可以插入
	userModel.findOne({username:username})
	.then(user =>{//数据库获取参数成功
		if(user){//表示数据库已有同名，不可插入
			res.json({
				code:10,
				message:'该用户名已存在，请重新更换用户名进行注册！'
			})
		}else{//3.插入数据 ：表示数据库没有同名，可以插入
			userModel.insertMany({
				username:username,
				password:hmac(password),
				// isAdmin:true
			})
			.then(user =>{//插入数据成功
				res.json({
					code:0,
					message:'注册成功！',
					user:user
				})
			})
			.catch(err =>{//插入数据失败
				res.json({
					code:10,
					message:'注册失败，数据库操作错误！'
				})
			})
		}
	})
	.catch(err =>{//数据库获取参数失败
		res.json({
			code:10,
			message:'注册失败，数据库操作错误！'
		})
	})
})

//处理登录请求
router.post('/login',(req,res)=>{
	//1.获取参数，通过调用中间件：body-paser,req.body将获取的参数自动转换为对象
	const { username,password } = req.body;
	//2.检测数据库是否可以登录
	userModel.findOne({username:username,password:hmac(password)},'-password')
	.then(user =>{//数据库获取参数成功
		if(user){//表示数据库有相同账号密码，可以登录
			//设置cookies,设置到期时间为一天，cookie只能设置字符串
			// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24})
			//设置session,session可以直接设置对象
			req.session.userInfo = user;
			// console.log(user)
			res.json({
				code:0,
				message:'登录成功！',
				user:user
			})
		}else{//表示数据库没有账号密码，不可以登录
			res.json({
				code:10,
				message:'该用户不存在，请重新输入账户密码！'
			})
		}
	})
	.catch(err =>{//数据库获取参数失败
		res.json({
			code:10,
			message:'注册失败，数据库操作错误！'
		})
	})
})

//处理退出登录
router.get('/logout',(req,res)=>{
	//清楚cookies缓存
	// req.cookies.set('userInfo',null)
	req.session.destroy()
	res.json({
		code:0,
		message:'退出登录成功！'
	})
})
module.exports = router;