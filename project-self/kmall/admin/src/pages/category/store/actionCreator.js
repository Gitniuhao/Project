//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'
import { message } from 'antd';

export  const setLevelCategoriesAction = (payload)=>({
			type:types.SET_LEVEL_CATEGORIES,
			payload
})

//处理新增分类action
export const AddCategoryACtion = (values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.addCategories(values)
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//提交成功之后直接派发action经reducer设置最新父级分类
			if(data.code == 0){
				dispatch(setLevelCategoriesAction(data.data))
				message.success('新增分类成功~')
			}else{
				 message.error(data.message);
			}						
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//处理获取最新父级分类
export const getLevelCategoriesAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.getLevelCategories({
			level:2
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action经reducer设置最新父级分类
			if(data.code == 0){
				dispatch(setLevelCategoriesAction(data.data))
			}else{
				 message.error(data.message);
			}				
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//处理分类列表分页显示
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
		api.getCategoryList({//获取分类列表
			page:page
		})
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

//处理更新分类名称
export const updateNameAction = (id,newName)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('category').get('current')
		api.updateCategoryName({//更新分类名称
			id:id,
			name:newName,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action传递设置页面分页数据
			if(data.code == 0){
				dispatch(setPageAction(data.data))
				message.success('更新分类成功~')	
			}					
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//处理更新手机分类名称
export const updateMobileNameAction = (id,newMobileName)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('category').get('current')
		api.updateCategoryMobileName({//更新分类名称
			id:id,
			mobileName:newMobileName,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action传递设置页面分页数据
			if(data.code == 0){
				dispatch(setPageAction(data.data))
				message.success('更新手机分类成功~')	
			}			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//处理更新排序
export const updateOrderAction = (id,newOrder)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('category').get('current')
		api.updateCategoryOrder({//更新分类名称
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action传递设置页面分页数据
			if(data.code == 0){
				dispatch(setPageAction(data.data))
				message.success('更新排序成功~')	
			}			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}