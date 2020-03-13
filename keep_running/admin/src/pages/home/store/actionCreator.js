//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'

export  const setCountAction = (payload)=>({
			type:types.SET_COUNT,
			payload
})
export const getCountAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		// axios({
		// 	method:'get',
		// 	url:'http://127.0.0.1:5757/weapp/getCount'
		// })
		api.getCounts()//获取后台各个数据的数量
		.then(result=>{
			// console.log(result.data.data.userNum[0]['count(`open_id`)'])
			//派发action,将后台获取的数据进行传递设置
			dispatch(setCountAction(result.data.data))	
		})
		.catch(err =>{
			console.log(err)
		})
	}
}