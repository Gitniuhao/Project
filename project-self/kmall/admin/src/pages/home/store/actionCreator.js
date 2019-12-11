//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'

export  const getChangeItemAction = (val)=>({
			type:types.CHANG_ITEM,
			payload:val	
})
export  const getAddItemAction = ()=>({
			type:types.ADD_ITEM,
})
export  const getDelItemAction = (index)=>({
			type:types.DEL_ITEM,
			payload:index
})
export  const getLoadInitDataAction = (payload)=>({
			type:types.DATA_LOAD,
			payload
})
export const getRequestInitDataAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		axios.get('http://127.0.0.1:3000')
		.then(result=>{
			// console.log(result.data)
			//派发action
			dispatch(getLoadInitDataAction(result.data))
		})
		.catch(err =>{
			console.log(err)
		})
	}
}