const express = require('express');
const app = express();
//swig模板就是主要用来渲染html页面的
const swig = require('swig');
const mongoose = require('mongoose');

//处理静态资源
app.use(express.static('public'))

//中间件的配置代码
// 解析urlencode内容
app.use(bodyParser.urlencoded({ extended: false }))
// 解析json
app.use(bodyParser.json())

//链接数据库
mongoose.connect('mongodb://localhost/blog',{useUnifiedTopology: true,useNewUrlParser: true });
//生成db
const db = mongoose.connection;
//链接数据库失败
db.on('err',function(err){
	console.log(err);
	throw err;
})
//链接数据库成功
db.once('open',function(){
	console.log('connect success..');
})



//渲染页面模板引擎的使用：
//1.设置缓存,开发阶段设置不走缓存
swig.setDefaults({
	cache:false
})
//2.配置应用模板
app.engine('html',swig.renderFile);

//3.配置模板的存放目录
app.set('views','./views')

//4.注册模板引擎
app.set('view engine','html')

//配置路由
//5.引进模板并使用进行渲染页面
app.use('/',require('./routs/index.js'))
app.use('/user',require('./routs/user.js'))



app.listen(3000, ()=> console.log('Server is running in http://127.0.0.1:3000!'))