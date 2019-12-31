//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'
import { message } from 'antd';



//处理分类列表分页显示
const setPageAction = (payload)=>({
			type:types.SET_PAGE,
			payload
})
const getPageStartAction = () =>({
	type:types.PAGE_REQUEST_START
})
const getPageDoneAction = () =>({
	type:types.PAGE_REQUEST_DONE
})
//设置页面分页数据
export const getPageAction = (page,keyword)=>{
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
		api.getOrdersList(options)
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action传递设置页面分页数据
			dispatch(setPageAction(data.data))			
		})
		.catch(err =>{
			console.log(err)
		})
		.finally(()=>{//ajax发送完毕，取消loading
			dispatch(getPageDoneAction())
		})
	}
}

const setOrderDetailAction = (payload)=>({
			type:types.SET_ORDER_DETAIL,
			payload
})
//获取商品详情
export const getOrderDetailAction = (orderNo)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.getOrderDetail({//向后台获取商品详情
			orderNo:orderNo
		})
		.then(result=>{
			const data = result.data
			//派发action传递设置商品详情
			if(data.code == 0){
				console.log(data.data)
				dispatch(setOrderDetailAction(data.data))
			}else{
				message.error(data.message)
			}			
		})
	}
}

//更新订单状态码
export const getOrderDeliverAction = (orderNo)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.updateOrderDeliver({//向后台获取商品详情
			orderNo:orderNo,
			status:40
		})
		.then(result=>{
			const data = result.data
			//派发action传递设置商品详情
			if(data.code == 0){
				// console.log(data.data)
				dispatch(setOrderDetailAction(data.data))
			}else{
				message.error('网络错误，请稍后重试。。')
			}			
		})
	}
}
