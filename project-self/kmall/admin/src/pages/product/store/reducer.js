//此页面利用reducer进行数据的处理，使得数据处理更加高效

import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	list:[],
	current:0,
	pageSize:0,
	total:0	,
	categories:[],
	isFecthing:false,

	mainImage:'',
	images:'',
	detail:'',

	mainImageValidateStatus:'',
	mainImageHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',

	category:'',
	categoryName:'',
	name:'',
	description:'',
	price:'',
	stock:''
})

export default (state = defaultState,action)=>{
	if(action.type == types.SET_LEVEL_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}
	if(action.type == types.SET_PAGE){
		return state.merge({
			'list':fromJS(action.payload.list),//必须是immutable数据
			'current':action.payload.current,
			'pageSize':action.payload.pageSize,
			'total':action.payload.total
		})
	}
	if(action.type == types.PAGE_REQUEST_START){//开始时将spinning的值设置为true
		return state.set('isFecthing',true)
	}
	if(action.type == types.PAGE_REQUEST_DONE){//结束时将spinning的值设置为false
		return state.set('isFecthing',false)
	}

	//处理自定义组件存值
	//如果图片在这里进行上传存储，则代表已经进行上传了图片，此时报错信息应该清除
	if(action.type == types.SET_MAIN_IMAGE){
		return state.merge({
			mainImage:action.payload,
			mainImageValidateStatus:'',
			mainImageHelp:''
			})
	}
	if(action.type == types.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesHelp:''
			})
	}
	if(action.type == types.SET_DETAIL){
		return state.set('detail',action.payload)
	}
	//处理自定义组件校验
	if(action.type == types.SET_MAIN_IMAGE_ERR){
		return state.merge({
			mainImageValidateStatus:'error',
			mainImageHelp:'请上传封面图片~'
		})
	}
	if(action.type == types.SET_IMAGES_ERR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请上传商品图片~'
		})
	}

	//存储设置商品详情
	 if(action.type == types.SET_PRODUCT_DETAIL){
	 	return state.merge({
	 		category:action.payload.category._id,
	 		categoryName:action.payload.category.name,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stock,
			mainImage:action.payload.mainImage,
			images:action.payload.images,
			detail:action.payload.detail,
	 	})
	 }
	return state;
}
