const express = require('express');
const app = express();
//swig模板就是主要用来渲染html页面的
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

//处理静态资源
app.use(express.static('public'))

//中间件的配置代码
// 解析urlencode内容
app.use(bodyParser.urlencoded({ extended: false }))
// 解析json
app.use(bodyParser.json())

/*--------------------链接数据库开始----------------*/
mongoose.connect('mongodb://localhost/blog',{useUnifiedTopology: true,useNewUrlParser: true });
//生成db
mongoose.set('useFindAndModify', false)
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
/*--------------------链接数据库开始----------------*/

/*---------------渲染页面模板引擎的配置开始---------*/
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
/*---------------渲染页面模板引擎的配置结束---------*/

/*--------------------配置cookies保存用户状态信息开始---------*/
//相当于在用中间件，要放在处理路由前面
// app.use((req,res,next) =>{
// 	req.cookies = new Cookies(req,res)
// 	//将cookies从req取出来返回到模板
// 	req.cookies.get('userInfo')
// 	var userInfo = '';
// 	if(req.cookies.get('userInfo')){
// 		userInfo = JSON.parse(req.cookies.get('userInfo'));
// 	}
// 	req.userInfo = userInfo
// 	next();
// })
app.use(session({
    //设置cookie名称
    name:'blogid',
    //用它来对session cookie签名，防止篡改
    secret:'asdbhdb',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    // //设置session存储在数据库中,当重启服务器cookie也会存在
    store:new MongoStore({ mongooseConnection: mongoose.connection }) 	  
}))
app.use((req,res,next)=>{
	//获取并将session的信息存在req.userInfo上，
	//第一次登录时无法获取，后面可以通过路由处理时把session存在req上获取到
	req.userInfo = req.session.userInfo || {};
	next();
})
/*--------------------配置cookies保存用户状态信息开始---------*/

/*------------------------配置路由开始----------------------*/
//5.引进模板并使用进行渲染页面
app.use('/',require('./routs/index.js'))
app.use('/user',require('./routs/user.js'))
app.use('/admin',require('./routs/admin.js'))
app.use('/category',require('./routs/category.js'))
app.use('/article',require('./routs/article.js'))
app.use('/comment',require('./routs/comment.js'))
/*------------------------配置路由结束----------------------*/


app.listen(3000, ()=> console.log('Server is running in http://127.0.0.1:3000!'))