
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Input,Button,Row,Col,List } from 'antd';
import AdminLayout from 'common/layout'

class Home extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	render(){//render负责渲染页面
		 const { handleChange,task,handleAdd,handleDelete,list } = this.props
		return(
 			<div className = 'Home'>
 				<AdminLayout>
 					
 				</AdminLayout>
 			</div>		
		)
	}
}
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	console.log(state)
	return{
		
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		 
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);//app通过connnect方法与store进行关联，接收数据和方法
