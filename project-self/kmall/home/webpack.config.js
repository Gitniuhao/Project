const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//固定写法
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getHtmlConfig = (name,title)=>({//将生成html的配置代码抽取出来
	template:'./src/views/'+name+'.html',//模板文件
	title:title,
	filename:name+'.html',//输出的文件名
	hash:true,//给生成的js/css文件添加一个唯一的hash
	chunks:[name,'common']//可以设置自动引进哪一个文件
})
module.exports = {
	//配置环境
	mode:"development",// "production" | "development" | "none"
	//应用程序在这个指定的文件中开始执行
	//多入口写法：
	entry:{
		//chunk名称：入口文件路径
		'index':'./src/pages/index',
		'list':'./src/pages/list',
		'common':'./src/pages/common',
		'user-login':'./src/pages/user-login',
		'user-register':'./src/pages/user-register',
		'user-center':'./src/pages/user-center',
		'user-update-password':'./src/pages/user-update-password',
		'result':'./src/pages/result',
		'detail':'./src/pages/detail',
		'cart':'./src/pages/cart',
		'order-confirm':'./src/pages/order-confirm'
	},
	//如何输出结果的相关选项
	output:{
		// 所有输出文件的目标路径
    	// 必须是绝对路径（使用 Node.js 的 path 模块
		path:path.resolve(__dirname,"dist"),
		filename:"js/[name]-[hash]-bundle.js",
		publicPath:'/' //让所有的静态资源都在根目录下
	},
	//配置别名
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			util:path.resolve(__dirname,'./src/util'),
			common:path.resolve(__dirname,'./src/common'),
			api:path.resolve(__dirname,'./src/api'),
			node_modules:path.resolve(__dirname,'./node_modules')
		}
	},
	module:{//webpack自身只支持javascript,而loader能够让webpack处理那些非javascript文件
		rules:[
		//处理css
			 {
	            test: /\.css$/,
	            use: [
	              {
	                loader: MiniCssExtractPlugin.loader,
	                options: {
	                }
	              },
	              "css-loader"
	            ]
	          },
			//处理图片
			{//处理各种图片和自定义图标格式，??.*表示引入后面的版本号等
				test:/\.(png|jpg|gif|eot|svg|ttf|woff|woff2)\??.*$/i,
				use:[
					{//url-loader默认使用file-loader处理图片文件，需要额外安装file-loader
						loader:'url-loader',
						options:{//当图片大小超过limit值时，会生成一个文件，
							limit:400,
							name:'resource/[name].[ext]'
						}
					}
				]
			},
			//处理代码兼容
			{//Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			           presets: ['env','es2015','stage-3'],
			        }
			    }               
			},
			//tpl
            {
                test:/\.tpl$/,
                use: {
                    loader: 'html-loader',
                }
            },            
		]
	},
	plugins:[
	//自动生成html代码配置
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('list','列表页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('result','结果页面')),
		new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
		new HtmlWebpackPlugin(getHtmlConfig('cart','购物车页面')),
		new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单管理')),
		//自动清理无用文件
		new CleanWebpackPlugin(),
		//单独打包css文件
		new MiniCssExtractPlugin({//在里面设置css文件的地址以及名称
			filename:"css/[name]-[hash]-bundle.css"
		})
	],
	devServer:{
		contentBase:'./dist',//内容的目录
		port:'3002',//服务运行的端口,可以手动更改端口，但是修改后要重新打包
		proxy: [{//服务器代理
	      context: [
	      '/sessions',
	      '/users',
	      '/categories',
	      '/ads',
	      '/floors',
	      '/products',
	      '/carts',
	      '/orders',
	      '/shippings'
	      ],//当context里的以xx开头的全都代理在target下面
	      target: 'http://localhost:3000',
	    }]
	}
}
