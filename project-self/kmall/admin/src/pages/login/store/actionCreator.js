//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import axios from 'axios'

export  const getLoadInitDataAction = (payload)=>({
			type:types.DATA_LOAD,
			payload
})
export const getLoginAction = ()=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		values.role = true;
		axios({
			method:'post',
			url:'http://127.0.0.1:3000/sessions/users',
			data:values
		})
		.then(result=>{
			console.log(result.data)
			// dispatch(getLoadInitDataAction(result.data))
		})
		.catch(err =>{
			console.log(err)
		})
	}
}