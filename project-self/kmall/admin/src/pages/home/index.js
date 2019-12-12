import {  Breadcrumb } from 'antd';
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Row,Col,List,Card } from 'antd';
import AdminLayout from 'common/layout'

class Home extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handleCount()
	}
	render(){//render负责渲染页面
		 const { usernum,ordernum,productnum } = this.props
		return(
 			<div className = 'Home'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='conntent'>
 						<Row>
 							<Col span={8}>
		 						<Card title="用户统计" bordered={true} style={{ width: 300 }}>
							      <p>{usernum}</p>
							    </Card>
						    </Col>
						    <Col span={8}>
		 						<Card title="订单量" bordered={true} style={{ width: 300 }}>
							      <p>{ordernum}</p>
							    </Card>
						    </Col>
						    <Col span={8}>
		 						<Card title="产品数量" bordered={true} style={{ width: 300 }}>
							      <p>{productnum}</p>
							    </Card>
						    </Col>
					    </Row>
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
		usernum:state.get('home').get('usernum'),
		ordernum:state.get('home').get('ordernum'),
		productnum:state.get('home').get('productnum')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleCount:()=>{
			dispatch(actionCreator.getCountAction())
		} 
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);//app通过connnect方法与store进行关联，接收数据和方法
