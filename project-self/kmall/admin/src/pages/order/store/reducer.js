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
	keyword:'',
	order:{}
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
			'total':action.payload.total,
			keyword:action.payload.keyword
		})
	}
	if(action.type == types.PAGE_REQUEST_START){//开始时将spinning的值设置为true
		return state.set('isFecthing',true)
	}
	if(action.type == types.PAGE_REQUEST_DONE){//结束时将spinning的值设置为false
		return state.set('isFecthing',false)
	}


	//存储设置订单详情
	 if(action.type == types.SET_ORDER_DETAIL){
	 	return state.set('order',action.payload)
	 }
	return state;
}