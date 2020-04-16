//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import AdminLayout from 'common/layout'
import {  Breadcrumb,Table,pagination,Button } from 'antd';
import moment from 'moment'

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class User extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){//render负责渲染页面
		const columns = [
		  {
		    title: '用户名',
		    dataIndex: 'name',
		    key: 'name',
		    render: text => <a>{text}</a>,
		  },
		  {
		    title: '所在地',
		    dataIndex: 'location',
		    key: 'location',
		  },
		  {
		    title: '上次浏览时间',
		    key: 'last_visit_time',
		    dataIndex: 'last_visit_time',
		  },
		  {
		    title: '创建时间',
		    key: 'createdAt',
		    dataIndex: 'createdAt',
		  },
		  {
		  	title:'操作',
		  	render:(text,record)=>{//在编辑和查看路由后面加上准确的id，可以精准编辑和查看商品信息
		  		// console.log(record.key)
		  		return(
		  			<Button onClick={()=>this.props.handleDel(record.key)}>删除</Button>
		  		)
		  	}
		  }
		]
		 const { list,current,pageSize,total,isFecthing,handlePage } = this.props
		 const dataSource = list.map((user)=>{
		 	const userInfo = JSON.parse(user.get('user_info'))//将json转换为对象
		 	// const nickName = user_info.get('nickName')
		 	// console.log(userInfo.province+''+userInfo.city)
		 		return{
			 		key:user.get('open_id'),
			 		name:userInfo.nickName,
			 		location:userInfo.province+userInfo.city,
			 		last_visit_time:moment(user.get('last_visit_time')).format('YYYY-MM-DD HH:MM:SS'),
			 		createdAt:moment(user.get('create_time')).format('YYYY-MM-DD HH:MM:SS')
			 	}
		 }).toJS()
		return(
 			<div className = 'User'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	 				 <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>用户列表</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='content'>
 						<Table 
							columns={columns} 
							dataSource={dataSource}
							pagination={{
								current:current,
								pageSize:pageSize,
								total:total
							}}
							onChange={(page)=>{//点击分页器根据当前页码进行改变页面
								// console.log(page)
								handlePage(page.current)
							}}
							loading={{//仿加载
								spinning:isFecthing,
								tip:'数据玩命加载中，请稍等片刻~'
							}}
						/>
 					</div>
 				</AdminLayout>
 			</div>		
		)
	}
}
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	return{
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		isFecthing:state.get('user').get('isFecthing')	
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		},
		handleDel:(openId)=>{
			dispatch(actionCreator.delUserAction(openId))
		}	
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(User);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/