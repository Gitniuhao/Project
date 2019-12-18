//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'

 const setCountAction = (payload)=>({
			type:types.SET_COUNT,
			payload
})
export const getCountAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.getCounts()
		.then(result=>{
			// console.log(result.data)
			const data = result.data
			//派发action，将获取到信息传到reducer进行存储和设置
			dispatch(setCountAction(data.data))			
		})
		.catch(err =>{
			console.log(err)
		})
		/*axios({
			method:"get",
			url:'http://127.0.0.1:3000/counts',
			withCredentials:true
		})
		.then(result=>{
			// console.log(result.data)
			const data = result.data
			//派发action
			dispatch(setCountAction(data.data))			
		})
		.catch(err =>{
			console.log(err)
		})
		*/
	}
}