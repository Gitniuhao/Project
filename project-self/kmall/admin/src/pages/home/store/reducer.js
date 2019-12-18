//此页面利用reducer进行数据的处理，使得数据处理更加高效

import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	usernum:0,
    ordernum:0,
    productnum:0
})

export default (state = defaultState,action)=>{
	if(action.type == types.SET_COUNT){
		// console.log('aa')
		return state.merge({
			usernum:action.payload.usernum,
    		ordernum:action.payload.ordernum,
   		 	productnum:action.payload.productnum
		})
	}
	return state;
}
