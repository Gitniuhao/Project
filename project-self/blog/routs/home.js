const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const CommentModel = require('../models/comment.js');
const pagination = require('../util/pagination.js')
const hmac = require('../util/hamc.js')
//此页面处理根管理员的请求
//进行是否是管理员的验证
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next();
	}else{
		res.send('<h1>请先登录账号！！</h1>')
	}
})

//获取管理中心首页
router.get('/',(req,res) =>{	
	res.render('home/index',{
		userInfo:req.userInfo
	})
})

//获取评论管理页面
router.get('/comment/list',(req,res) =>{
	CommentModel.getPaginationComment(req,{user:req.userInfo._id})
	.then(result =>{
		res.render('home/comment_list',{
			userInfo:req.userInfo,
			comments:result.docs,
			page:result.page,
			pages:result.pages,
			list:result.list,
			url:'/home/comment/list'
		})
	})
})

//处理删除评论请求
router.get('/comment/delete/:id',(req,res) =>{
	//获取参数id
	const id = req.params.id;
	//从数据库中查找id对应数据进行删除
	CommentModel.deleteOne({_id:id})
	.then(comment =>{
		res.render('home/ok',{
			userInfo:req.userInfo,
			message:'删除文章成功！！',
			url:'/home/comment/list'
		})
	})
	.catch(err =>{
   		res.render('home/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败，请稍后重试！！',
			url:'/home/comment/list'
		 })
   	})	
})

//获取修改密码页面
router.get('/password',(req,res) =>{
	res.render('home/password',{
		userInfo:req.userInfo
	})
})

//处理修改密码请求
router.post('/password',(req,res) =>{
	const { password } = req.body;
	userModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
	.then(data =>{
		//清楚cookies缓存
		req.session.destroy()
		res.render('home/ok',{
			userInfo:req.userInfo,
			message:'修改密码成功！！',
			url:'/'//返回首页
		})
	})
	.catch(err =>{
		res.render('home/err',{
			userInfo:req.userInfo,
			message:'修改密码失败，请稍后重试！！'
		})
	})
})
//导出router实例
module.exports = router;