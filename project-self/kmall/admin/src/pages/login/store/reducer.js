//此页面利用reducer进行数据的处理，使得数据处理更加高效

import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	isFecthing:false
})

export default (state=defaultState,action)=>{	
	if(action.type == types.LOGIN_REQUEST_START){
		return state.set('isFecthing',true)
	}
	if(action.type == types.LOGIN_REQUEST_DONE){
		return state.set('isFecthing',false)
	}
	return state;//如果上述都没有，返回state
}


