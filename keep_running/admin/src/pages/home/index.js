//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Row,Col,List,Card } from 'antd';
import AdminLayout from 'common/layout'
import {  Breadcrumb } from 'antd';

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class Home extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handelCount()
	}
	render(){//render负责渲染页面
		 const { userNum,adminNum,articleNum,opnionNum } = this.props
		return(
 			<div className = 'Home'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='conntent'>
 						<Row>
 							<Col span={12}>
		 						<Card title="管理员统计" bordered={true} style={{ width: 300,marginBottom:50,marginLeft:170}} hoverable={true}>
							      <p>{adminNum}</p>
							    </Card>
						    </Col>
						    <Col span={12}>
		 						<Card title="用户统计" bordered={true} style={{ width: 300,marginBottom:50}} hoverable={true}>
							      <p>{userNum}</p>
							    </Card>
						    </Col>
						    <Col span={12}>
		 						<Card title="文章数量" bordered={true} style={{ width: 300,marginLeft:170 }} hoverable={true}>
							      <p>{articleNum}</p>
							    </Card>
						    </Col>
						    <Col span={12}>
		 						<Card title="反馈意见数量" bordered={true} style={{ width: 300}} hoverable={true}>
							      <p>{opnionNum}</p>
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
	return{
		userNum:state.get('home').get('userNum'),
		adminNum:state.get('home').get('adminNum'),
		articleNum:state.get('home').get('articleNum'),
		opnionNum:state.get('home').get('opnionNum'),
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handelCount:()=>{
			dispatch(actionCreator.getCountAction())
		} 
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/