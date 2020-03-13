//此页面利用reducer进行数据的处理，使得数据处理更加高效
import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	isFecthing:false		
})

//reducer是一个纯函数(有固定的输入就用固定的输出)
//reducer不能直接改变state,因为sate由store进行管理，而store中的数据由所有组件共享，
//可以用一个newState来改变自身state,而且getState获取的state数据还是是store里面的state
//将初始化默认数据赋给reducer函数里的state并返回出去
export default (state = defaultState,action)=>{
	if(action.type == types.LOGIN_REQUEST_START){//处理输入时数据变化
		 return state.set('isFecthing',true)
	}
	if(action.type == types.LOGIN_REQUEST_DONE){//处理输入时数据变化
		 return state.set('isFecthing',false)
	}
	return state;//如果上述都没有，返回state
}


