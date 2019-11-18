const mongoose = require('mongoose');
//定义文档模型
const CategorySchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'必须输入分类名称']
	},
	order:{
		type:String,
		default:0
	}	
})
//根据文档模型生成对应的模型(集合)
const CategoryModel = mongoose.model('category',CategorySchema)
//导出模型(集合)
module.exports = CategoryModel;