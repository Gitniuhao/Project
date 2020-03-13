//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import { message } from 'antd';
import {saveName} from 'util'
import api from 'api'

const getLoginStartAction = () =>({
	type:types.LOGIN_REQUEST_START
})
const getLoginDoneAction = () =>({
	type:types.LOGIN_REQUEST_DONE
})

export const getLoginAction = (values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//发送请求之前显示loading
		dispatch(getLoginStartAction())
		values.isAdmin = 1;
		// axios({
		// 	method:'post',
		// 	url:'http://127.0.0.1:5757/weapp/adminLogin',
		// 	data:values
		// })
		api.login(values)
		.then(result=>{			
			const data = result.data
			console.log(data)
			if(data.code == 0){//登录成功
				//1、先将用户信息保存在前台
				saveName(data.data.name)
				//2、然后跳转用后台首页
				window.location.href = '/'				
			}else{//登录失败
				message.error(data.data.msg);
			}
		})
		.catch(err =>{
			 message.error('请求失败，请稍后重试~');
		})
		.finally(()=>{
			//请求完毕后loading取消
			dispatch(getLoginDoneAction())
		})
	}
}