//此页面利用reducer进行数据的处理，使得数据处理更加高效

import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	userNum:0,
	adminNum:0,
	articleNum:0,
	opnionNum:0,
})
export default (state = defaultState,action)=>{
	if(action.type == types.SET_COUNT){//处理输入时数据变化
		 return state.merge({
		 	userNum:action.payload.userNum[0]['count(`open_id`)'],
		 	adminNum:action.payload.adminNum[0]['count(`id`)'],
		 	articleNum:action.payload.articleNum[0]['count(`id`)'],
		 	opnionNum:action.payload.opnionNum[0]['count(`id`)']
		 })
	}
	return state;//如果上述都没有，返回state
}


