//此页面利用reducer进行数据的处理，使得数据处理更加高效

import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	list:[],
	current:0,
	pageSize:0,
	total:0,
	isFecthing:false,
	mainImage:'',
	content:'',
	mainImageValidateStatus:'',
	mainImageHelp:'',
	name:'',
	keyword:'',

	title:'',
	author:'',
	mainImage:'',
	detail:''
})
export default (state = defaultState,action)=>{
	if(action.type == types.SET_PAGE){//处理输入时数据变化
		 return state.merge({
		 	'list':fromJS(action.payload.list),
		 	'current':fromJS(action.payload.current),
		 	'pageSize':fromJS(action.payload.pageSize),
		 	'total':fromJS(action.payload.total),
		 	'keyword':fromJS(action.payload.keyword)
		 })
	}
	if(action.type == types.PAGE_REQUEST_START){//处理输入时数据变化
		 return state.set('isFecthing',true)
	}
	if(action.type == types.PAGE_REQUEST_DONE){//处理输入时数据变化
		 return state.set('isFecthing',false)
	}

	//处理自定义组件存值
	//如果图片在这里进行上传存储，则代表已经进行上传了图片，此时报错信息应该清除
	if(action.type == types.SET_MAIN_IMAGE){//处理输入时数据变化
		 return state.merge({
			mainImage:action.payload,
			mainImageValidateStatus:'',
			mainImageHelp:''
			})
	}
	if(action.type == types.SET_CONTENT){//处理输入时数据变化
		 return state.set('content',action.payload)
	}

	//处理自定义组件校验
	if(action.type == types.SET_MAIN_IMAGE_ERR){
		return state.merge({
			mainImageValidateStatus:'error',
			mainImageHelp:'请上传文章封面图片~'
		})
	}
	if(action.type == types.SET_NAME){//设置名子
		 return state.set('name',action.payload)
	}
	//设置文章详情
	 if(action.type == types.SET_ARTICLE_DETAIL){
	 	return state.merge({
			title:action.payload.title,
			mainImage:action.payload.mainImage,
			author:action.payload.author,
			detail:action.payload.detail
	 	})
	 }
	return state;//如果上述都没有，返回state
}


