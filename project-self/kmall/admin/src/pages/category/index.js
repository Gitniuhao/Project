import {  Breadcrumb } from 'antd';
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Row,Col,List,Card } from 'antd';
import AdminLayout from 'common/layout'

class Category extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		
	}
	render(){//render负责渲染页面
		 const { usernum,ordernum,productnum } = this.props
		return(
 			<div className = 'Category'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>分类管理</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='conntent'>
 						
 					</div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Category);//app通过connnect方法与store进行关联，接收数据和方法
