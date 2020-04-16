//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'
import { message } from 'antd';

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

export const getPageAction = (page)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//派发action,发送ajax前进行loading加载
		dispatch(getPageStartAction())
		api.getUserList({
			page:page
		})//发送获取管理员列表的请求
		.then(result=>{
			// console.log(result.data.data)			
			//派发action,将后台获取的数据进行传递设置
			dispatch(setPageAction(result.data.data))	
		})
		.catch(err =>{
			console.log(err)
		})
		.finally(()=>{//ajax发送完毕，取消loading
			dispatch(getPageDoneAction())
		})
	}
}

export const delUserAction = (openId)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.delteUser({
			openId:openId
		})//发送获取管理员列表的请求
		.then(result=>{
			// console.log(result.data.data)
			message.success(result.data.data.msg)
			setTimeout(function(){
				window.location.href = '/user';
			},2000)					
		})
		.catch(err =>{
			console.log(err)
		})
	}
}