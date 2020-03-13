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
export  const setNameAction = (payload)=>({
			type:types.SET_NAME,
			payload
})

export const getPageACtion = (page)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//派发action,发送ajax前进行loading加载
		dispatch(getPageStartAction())
		api.getAdminList({
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

export const addAdminAction = (values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//派发action,发送ajax前进行loading加载
		dispatch(getPageStartAction())
		values.isAdmin = 1;
		api.addAdmin(values)//发送新增管理员的请求
		.then(result=>{
			// console.log(result.data.data)			
			dispatch(getPageDoneAction())//ajax发送完毕，取消loading
			window.location.href ='/admin'//新增管理员成功后返回管理员列表页
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

export const getNameAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const name = getName()//获取管理员名字
		// console.log(name)
		dispatch(setNameAction(name))//将管理员名字进行数据回填
	}
}

export const resetPasswordAction = (values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		if(values.password != values.repassword){//当两次密码不一样时将进行提醒并阻止默认行为
			 message.error('两次密码不一致，请重写填写~');
			return
		}
		api.resetPassword(values)
		.then(result=>{
			// console.log(result.data)			
			message.success(result.data.data)
			window.location.href ='/'//修改密码成功后返回首页	
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

export const delAdminAction = (id)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.delteAdmin({
			id:id
		})//发送获取管理员列表的请求
		.then(result=>{
			// console.log(result.data.data)
			message.success(result.data.data.msg)//显示修改成功提示
			window.location.href = '/admin';//跳转到列表页				
		})
		.catch(err =>{
			console.log(err)
		})
	}
}