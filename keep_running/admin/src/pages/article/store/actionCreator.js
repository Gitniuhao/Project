//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'
import { message } from 'antd';
import {getName} from 'util'

export  const setPageAction = (payload)=>({
			type:types.SET_PAGE,
			payload
})
const getPageStartAction = () =>({
	type:types.PAGE_REQUEST_START
})
const getPageDoneAction = () =>({
	type:types.PAGE_REQUEST_DONE
})

//处理自定义组件存值到store
export const setMainImageAction = (payload)=>({//存储封面图片数据
	type:types.SET_MAIN_IMAGE,
	payload
})

export const setContentAction = (payload)=>({//存储文章内容数据
	type:types.SET_CONTENT,
	payload
})
//获取文章列表
export const getPageACtion = (page,keyword)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//派发action,发送ajax前进行loading加载
		dispatch(getPageStartAction())
		const options = {
			page:page
		}
		if(keyword){
			// console.log(keyword)
			options.keyword = keyword
		}
		api.getArticleList(options)//发送获取管理员列表的请求
		.then(result=>{
			console.log(result.data)			
			//派发action,将后台获取的数据进行传递设置
			dispatch(setPageAction(result.data))	
		})
		.catch(err =>{
			console.log(err)
		})
		.finally(()=>{//ajax发送完毕，取消loading
			dispatch(getPageDoneAction())
		})
	}
}

const setMainImageErrAction = ()=>({//当图片没有上传时的错误处理
	type:types.SET_MAIN_IMAGE_ERR
})
//新增文章
export const saveArticleAction = (err,values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数		
		const state = getState().get('article')
		const mainImage = state.get('mainImage')
		const content = state.get('content')
		console.log(values,mainImage,content)
		let hasErr = false;
		if(err){//如果存在err，则hasErr为true
			hasErr = true;
		}
		if(!mainImage){
			dispatch(setMainImageErrAction())
			hasErr = true;
		}
		//将新增商品设为默认api,如果存在id，则将方法设为更新商品
		var request = api.addArticle
		if(values.id){
			request = api.updateArticle
		}
		request({
			values,
			mainImage:mainImage,
			content:content
		})//发送新增文章的请求
		.then(result=>{
			// console.log(result.data.data.msg)
			message.success(result.data.data.msg)
			setTimeout(function(){
				window.location.href = '/article';
			},2000)//新增文章成功后返回文章列表页				
		})
		.catch(err =>{
			console.log(err)
		})
	}
}
//设置管理员名字
export  const setNameAction = (payload)=>({
			type:types.SET_NAME,
			payload
})
export const getNameAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const name = getName()//获取管理员名字
		// console.log(name)
		dispatch(setNameAction(name))//将管理员名字进行数据回填
	}
}

//更新显示隐藏
export const updateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('article').get('current')
		console.log(page)
		api.updateArticleIsShow({//更新分类名称
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			console.log(result.data)
			//派发action传递设置更新显示隐藏
		 	dispatch(setPageAction(result.data))
 	        message.success('更新显示隐藏成功~')				
		})
		.catch(err =>{
			console.log(err)
		})
	}
}
//设置文章详情
export  const setArticleDetailAction = (payload)=>({
			type:types.SET_ARTICLE_DETAIL,
			payload
})

//获取文章详情
export const getDetailAction = (id)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.getArticleDetail({//向后台获取商品详情
			id:id
		})
		.then(result=>{
			console.log(result.data)
			//派发action传递设置文章详情
			dispatch(setArticleDetailAction(result.data))			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//删除文章
export const deleteArticleAction = (id)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.deleteArticle({//删除文章
			id:id
		})
		.then(result=>{
			// console.log(result.data.data)
			message.success(result.data.data.msg)		
			setTimeout(function(){
				window.location.href = '/article';
			},2000)//删除文章成功后刷新文章列表页			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}


