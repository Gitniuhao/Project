/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')
const multer=require('koa-multer')

//上传图片、文件
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/article-images/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user.setSession)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//创建意见反馈表
router.post('/createopinion',controllers.createopinion)
//创建分数记录表
router.post('/createrecord',controllers.createrecord)
//请求当前分数
router.get('/getMark',controllers.getMark)
//清零分数请求
router.post('/resetMark',controllers.resetMark)
//撤销上一步操作
router.post('/deleterecord',controllers.deleterecord)
//获取分数记录
router.get('/getrecords',controllers.getrecords)
//修改添加记录
router.post('/updatenote',controllers.updatenote)
//清空记录
router.post('/resetRecord',controllers.resetRecord)
//请求文章列表数据
router.get('/getArticlesList',controllers.getArticlesList)
//请求文章详情
router.get('/getArticlesDetail',controllers.getArticlesDetail)
//增加view数量
router.post('/updateView',controllers.updateView)
//更新isCollection
router.post('/updateIsCollection',controllers.updateIsCollection)
//获取收藏文章列表
router.get('/getCollectionList',controllers.getCollectionList)


// 后端管理系统部分
//管理员登录
router.post('/adminLogin',controllers.adminLogin)
//清除session
router.post('/resetSession',controllers.resetSession)
//查询数量
router.get('/getCount',controllers.getCount)

//查询管理员列表
router.get('/getAdminList',controllers.admin.getAdminList)
//新增管理员
router.post('/addAdmin',controllers.admin.addAdmin)
//修改管理员密码
router.post('/resetPassword',controllers.admin.resetPassword)
//删除管理员
router.post('/delteAdmin',controllers.admin.delteAdmin)

//获取用户列表
router.get('/getUserList',controllers.user.getUserList)
//删除用户
router.post('/delteUser',controllers.user.delteUser)

//上传文章封面图片
router.post('/uploadImage',upload.single('file'),controllers.article.uploadImage)
//上传文章详情图片
router.post('/uploadDetailImage',upload.single('upload'),controllers.article.uploadDetailImage)
//新增文章
router.post('/addArticle',controllers.article.addArticle)
//获取文章列表
router.get('/getArticleList',controllers.article.getArticleList)
//更新文章的isShow
router.post('/updateArticleIsShow',controllers.article.updateArticleIsShow)
//获取文章详情
router.get('/getArticleDetail',controllers.article.getArticleDetail)
//更新文章
router.post('/updateArticle',controllers.article.updateArticle)
//删除文章
router.post('/deleteArticle',controllers.article.deleteArticle)

//获取反馈意见列表
router.get('/getOpinionList',controllers.opinion.getOpinionList)
//删除反馈意见表
router.post('/delteOpinion',controllers.opinion.delteOpinion)
//获取反馈意见详情
router.get('/getOpinionDetail',controllers.opinion.getOpinionDetail)


module.exports = router
