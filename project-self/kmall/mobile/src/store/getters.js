//store的计算属性
export default{//里面的计算属性的参数都是state
	total(state){
		return state.todos.length
	},
	totalDone(state){
	  return state.todos.reduce((total,item)=>{
        if(item.done){//当数组内的每一项里面的done是true，则total+1
            total = total + 1
        }
        	return total
	    },0)
	},
	allDone(state,getter){//getter可以到所有计算机属性
		return getter.total == getter.totalDone && getter.total != 0
	}
}