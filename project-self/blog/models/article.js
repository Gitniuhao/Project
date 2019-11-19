const mongoose = require('mongoose');
//定义文档模型
const ArticleSchema = new mongoose.Schema({
	title:{
		type:String
	},
	intro:{
		type:String
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'category'
	},
	cteateAt:{
		type:Date,
		default:Date.now
	},
	click:{
		type:Number
	},
	content:{
		type:String
	}		
})
//根据文档模型生成对应的模型(集合)
const ArticleModel = mongoose.model('article',ArticleSchema)
//导出模型(集合)
module.exports = ArticleModel;