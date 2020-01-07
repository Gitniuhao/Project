//唯一更改state的方法
//mutation必须是同步函数
import { ADD_TODO,DEL_TODO,SELECT_ALL_TODO,DEL_ALL_DONE } from '../store/types.js'
export default{//第一个参数为state数据，第二个是新数据
	[ADD_TODO](state,todo){
		state.todos.unshift(todo)
	},
	[DEL_TODO](state,index){
		state.todos.splice(index,1)
	},
	[SELECT_ALL_TODO](state,value){
		state.todos.forEach((item)=>{
			item.done = value
		})
	},
	[DEL_ALL_DONE](state){
		state.todos = state.todos.filter(item=>!item.done)
	}		
}