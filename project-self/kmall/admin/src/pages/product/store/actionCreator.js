//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'
import api from 'api'
import { message } from 'antd';

const setLevelCategoriesAction = (payload)=>({
			type:types.SET_LEVEL_CATEGORIES,
			payload
})
const setMainImageErrAction = ()=>({
	type:types.SET_MAIN_IMAGE_ERR
})
const setImagesErrACtion = ()=>({
	type:types.SET_IMAGES_ERR
})
//处理新增商品action
export const saveProductACtion = (err,values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		// console.log(values,err)
		const state = getState().get('product')
		const mainImage = state.get('mainImage')
		const images = state.get('images')
		const detail = state.get('detail')
		let hasErr = false;
		if(err){//如果存在err，则hasErr为true
			hasErr = true;
		}
		if(!mainImage){
			dispatch(setMainImageErrAction())
			hasErr = true;
		}
		if(!images){
			dispatch(setImagesErrACtion())
			hasErr = true;
		}
		if(hasErr){//如果hasErr为true,则阻止接下来的操作
			return
		}
		//将新增商品设为默认api,如果存在id，则将方法设为更新商品
		var request = api.addProduct
		if(values.id){
			request = api.updateProduct
		}
		request({
			...values,
			mainImage:mainImage,
			images:images,
			detail:detail
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			if(data.code == 0){
				message.success(data.message,()=>{//新增商品成功后在回调函数中跳转到商品列表页面
					window.location.href = '/product'
				})
			}else{
				 message.error(data.message);
			}						
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//处理自定义组件存值到store
export const setMainImageAction = (payload)=>({
	type:types.SET_MAIN_IMAGE,
	payload
})
export const setImagesAction = (payload)=>({
	type:types.SET_IMAGES,
	payload
})
export const setDetailAction = (payload)=>({
	type:types.SET_DETAIL,
	payload
})





//处理获取最新父级分类
export const getLevelCategoriesAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.getLevelCategories({
			level:3
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
export const getPageAction = (page)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//派发action,发送ajax前进行loading加载
		dispatch(getPageStartAction())
		api.getProductsList({//获取分类列表
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


//处理更新排序
export const updateOrderAction = (id,newOrder)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('product').get('current')
		api.updateCategoryOrder({//更新分类名称
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action传递更新排序
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

//更新显示隐藏
export const updateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('product').get('current')
		api.updateProductIsShow({//更新分类名称
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action传递设置更新显示隐藏
			if(data.code == 0){
				dispatch(setPageAction(data.data))
				message.success('更新显示隐藏成功~')	
			}			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//更新上架/下架
export const updateStatusAction = (id,newStatus)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('product').get('current')
		api.updateProductStatus({//更新分类名称
			id:id,
			status:newStatus,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action'更新上架/下架
			if(data.code == 0){
				dispatch(setPageAction(data.data))
				message.success('更新上架/下架成功~')	
			}			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}

//更新是否热卖
export const updateIsHotAction = (id,newIsHot)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		const page = getState().get('product').get('current')
		api.updateProductIsHot({//更新分类名称
			id:id,
			isHot:newIsHot,
			page:page
		})
		.then(result=>{
			// console.log(result.data.data)
			const data = result.data
			//派发action更新是否热卖
			if(data.code == 0){
				dispatch(setPageAction(data.data))
				message.success('更新是否热卖成功~')	
			}			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}


const setProductDetailAction = (payload)=>({
			type:types.SET_PRODUCT_DETAIL,
			payload
})
//获取商品详情
export const getProductDetailAction = (id)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		api.getProductDetail({//向后台获取商品详情
			id:id
		})
		.then(result=>{
			console.log(result)
			const data = result.data
			//派发action传递设置商品详情
			if(data.code == 0){
				console.log(data.data)
				dispatch(setProductDetailAction(data.data))
			}			
		})
		.catch(err =>{
			console.log(err)
		})
	}
}
