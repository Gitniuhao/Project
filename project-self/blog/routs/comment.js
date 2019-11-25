const express = require('express');
const router = express.Router();
const CommentModel = require('../models/comment.js')
//此页面处理comment路由下的各种请求

//权限验证
router.use((req,res,next) =>{
	if(req.userInfo._id){
		next();
	}else{
		res.send('<h1>请登录后再进行评论！！</h1>')
	}
})

//处理添加评论请求
router.post('/add',(req,res)=>{
	const { content,article } = req.body;
	CommentModel.insertMany({
		content,
		article,
		user:req.userInfo._id
	})
	.then(comments =>{
		console.log(article)
		CommentModel.getPaginationComment(req,{article:article})
		.then(data =>{
			res.json({
				status:0,
				message:'添加评论信息成功！',
				data:data
			})
		})
		.catch(err =>{
			res.json({
				status:10,
				message:'添加评论信息失败！'
			})
		})
	})
	.catch(err =>{
		res.json({
			status:10,
			message:'添加评论信息失败！'
		})
	})
})

//处理评论的ajax,请求评论数据局部渲染页面
router.get('/list',(req,res) =>{
	const id = req.query.id;
	let query = {};
	if(id){
		query.article = id;
	}
	CommentModel.getPaginationComment(req,query)
	.then(data =>{
		res.json({
			status:0,
			message:'获取评论数据成功！',
			data:data
		})
	})
	.catch(err =>{
		res.json({
			status:10,
			message:'获取评论数据失败！'
		})
	})
})
module.exports = router;