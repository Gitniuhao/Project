const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const cors = require('koa2-cors')
const session = require('koa-session')


//导入模块解决跨域问题
app.use(cors({
	origin: '*',	
	credentials: true,
	allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous','Set-Cookie','x-requested-with','x-file-name']
}))
// {
//     origin: '*',	
//     credentials: true,
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
//      allowMethods: ['GET', 'POST', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous','Set-Cookie'],
//     maxAge: 1728000
// }

//配置session的中间件：
app.keys = ['some secret hurr'];//cookie的签名
const CONFIG = {
    key:'koa:sess',//cookie的键值对，默认
    maxAge:86400000,//cookie的过期时间，需要修改（这里为一个小时）
    httpOnly:true,//默认既可
    signed:true,//签名，默认
    rolling:false,//在每次请求时强行设置cookie，这将重置cookie的过期时间（默认false),也可以修改
    renew:false//在请求服务时cookie快过期自动设置session
}
app.use(session(CONFIG,app))

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

//配置静态资源
app.use(require('koa-static')(__dirname + '/public'))


// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
