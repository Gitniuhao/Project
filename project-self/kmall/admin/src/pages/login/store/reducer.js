//此页面利用reducer进行数据的处理，使得数据处理更加高效

import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	isFecthing:false
})

export default (state = defaultState,action)=>{	
	if(action.type == types.LOGIN_REQUEST_START){//处理输入时数据变化		
		 return state.set('isFecthing',true)
	}
	if(action.type == types.LOGIN_REQUEST_DONE){//处理输入时数据变化		
		 return state.set('isFecthing',false)
	}
	return state;//如果上述都没有，返回state
}


