const mongoose = require('mongoose');
const moment = require('moment');
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
	createAt:{
		type:Date,
		default:Date.now
	},
	click:{
		type:Number,
		default:0
	},
	content:{
		type:String
	}		
})
//利用虚拟属性进行再次加工修改
ArticleSchema.virtual('createTime').get(function(){
	// return this.createAt.toLocaleString();
	return moment(this.createAt).format('YYYY - MM - DD HH:mm:ss')
})
//根据文档模型生成对应的模型(集合)
const ArticleModel = mongoose.model('article',ArticleSchema)
//导出模型(集合)
module.exports = ArticleModel;