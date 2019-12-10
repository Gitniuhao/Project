//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Input,Button,Row,Col,List } from 'antd';

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class TodoList extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	componentDidMount(){
		this.props.handleInit()	
	}
	render(){//render负责渲染页面
		 const { handleChange,task,handleAdd,handleDelete,list } = this.props
		return(
 			<div className = 'TodoList'>
 				<Row>
 					<Col span={18}>
	 					<Input  
	 					onChange={handleChange} 
		 					value={task}/>
	 				</Col>
	 				<Col span={6}>
		 				<Button type="primary"  
		 				className= 'btn' onClick={handleAdd}>
		 					提交
		 				</Button>	
	 				</Col>
 				</Row>
 				<List
 				 style={{marginTop:10}}
			      bordered
			      dataSource={list}
			      renderItem={(item,index) => (
			        <List.Item  onClick={()=>{handleDelete(index)}}>
			          	 {item}
				    </List.Item>
				   )}
    			/>
 			</div>		
		)
	}
}
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	console.log(state)
	return{
		list:state.get('todolist').get('list'),
		task:state.get('todolist').get('task')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		 handleChange:(ev) =>{//因为运用了箭头函数，函数内的this由定义时决定，故调用时不用再bind
			const val = ev.target.value
			dispatch(actionCreator.getChangeItemAction(val))
		},
		 handleAdd:() =>{
			dispatch(actionCreator.getAddItemAction())
		},
		handleDelete:(index)=>{
			dispatch(actionCreator.getDelItemAction(index))
		},
		handleInit:()=>{
			dispatch(actionCreator.getRequestInitDataAction())
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/