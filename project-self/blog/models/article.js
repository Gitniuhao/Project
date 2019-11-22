const mongoose = require('mongoose');
const moment = require('moment');
const pagination = require('../util/pagination.js')
//定义文档模型
const ArticleSchema = new mongoose.Schema({
	title:{
		type:String
	},
	intro:{
		type:String
	},
	user:{
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
//在模型上定义分页静态方法，可以让所有的articleModel直接调用
ArticleSchema.statics.getArticle = function(req,query={}){
	const options = {
		page:req.query.page*1,//当前页码
		model:ArticleModel,//所用模型(集合)
		query:query,//查询条件
		projection:'-__v',//所需显示隐藏字段
		sort:{_id:1},//排序，
		populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
	}
	 return pagination(options)//调用分类函数
}
//根据文档模型生成对应的模型(集合)
const ArticleModel = mongoose.model('article',ArticleSchema)
//导出模型(集合)
module.exports = ArticleModel;