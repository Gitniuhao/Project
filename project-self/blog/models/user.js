const mongoose = require('mongoose');
//定义文档模型
const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:[true,'必须输入用户名'],
		minlength:[3,'最少不能低于三位'],
		maxlength:[8,'最多不能高于8位']
	},
	password:{
		type:String
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
})

//根据文档模型生成对应的模型(集合)
const userModel = mongoose.model('user',userSchema)
//导出模型(集合)
module.exports = userModel;