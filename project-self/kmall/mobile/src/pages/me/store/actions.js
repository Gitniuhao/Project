//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作
import { ADD_TODO,DEL_TODO,SELECT_ALL_TODO,DEL_ALL_DONE } from '../store/types.js'
export default{//第一参数是选择使用的方法，第二个参数是数据
	[ADD_TODO]({commit},todo){
		//commit第一个参数是类型，第二个数据
		commit(ADD_TODO,todo)
	},
	[DEL_TODO]({commit},index){
		commit(DEL_TODO,index)
	},
	[SELECT_ALL_TODO]({commit},value){
		commit(SELECT_ALL_TODO,value)
	},
	[DEL_ALL_DONE]({commit}){
		commit(DEL_ALL_DONE)
	}
}