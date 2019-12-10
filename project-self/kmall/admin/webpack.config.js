const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//固定写法
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	//配置环境
	mode:"development",// "production" | "development" | "none"
	// mode:"production",// "production" | "development" | "none"

	//应用程序在这个指定的文件中开始执行
	//webpack开始打包
	//单入口写法：
	//第一种：
	// entry:{
	// 	index:'./src/index.js'
	// },

	//第二种
	// entry:'./src/index.js',

	//多入口写法：
	entry:{
		//chunk名称：入口文件路径
		index:'./src/index.js'
	},
	//如何输出结果的相关选项
	output:{
		// 所有输出文件的目标路径
    	// 必须是绝对路径（使用 Node.js 的 path 模块
		path:path.resolve(__dirname,"dist"),

		// 输出的文件的文件名:[name]:chunk名称，[hash]:模块标识符，每次打包hash都不同
		// filename:"[name]-bundle.js"
		// filename:"[name]-[chunkhash]-bundle.js"
		filename:"[name]-[hash]-bundle.js",
		publicPath:'/' //让所有的静态资源都在根目录下
	},
	module:{//webpack自身只支持javascript,而loader能够让webpack处理那些非javascript文件
		rules:[
		//处理css
			/*
			{//处理css文件需要安装 css-loader和style-loader
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			*/
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
			{
				test:/\.(png|jpg|gif)$/i,
				use:[
					{//url-loader默认使用file-loader处理图片文件，需要额外安装file-loader
						loader:'url-loader',
						options:{//当图片大小超过limit值时，会生成一个文件，
							limit:10
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
			           presets: ['env','es2015','react','stage-3'],
			            plugins: [//处理antd按需加载
				            ["import", {
				             "libraryName": "antd",
				              "libraryDirectory": "es", 
				              "style": true // `style: true` 会加载 less 文件
					        }]
					    ]
			        }
			    }               
			},
			{
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            'primary-color': '#ff8800',
                            'link-color': '#ff8800',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                }],
            }
		]
	},
	plugins:[
	//自动生成html代码配置
		new HtmlWebpackPlugin({
			template:'./src/index.html',//模板文件
			filename:'index.html',//输出的文件名
			// inject:'head',//脚本卸载哪个标签里,默认是true,在body后引进
			hash:true,//给生成的js/css文件添加一个唯一的hash
			chunks:['index']//可以设置自动引进哪一个文件
		}),
		//自动清理无用文件
		new CleanWebpackPlugin(),
		//单独打包css文件
		new MiniCssExtractPlugin({})
	],
	devServer:{
		contentBase:'./dist',//内容的目录
		port:'3001',//服务运行的端口,可以手动更改端口，但是修改后要重新打包
		historyApiFallback:true//让h5路由刷新页面时不会向后台发送数据
	}
}
