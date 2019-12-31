import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import { Table,Pagination,Breadcrumb,Button,Input,InputNumber,Switch,Divider } from 'antd';
import AdminLayout from 'common/layout'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { Search } = Input

class OrderList extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){
		const columns = [
		  {
		    title: '订单号',
		    dataIndex: 'orderNo',
		    key: 'orderNo',
		    render:(orderNo)=>{
		    	if(keyword){
		    		///keyword/ig
		    		// console.log(keyword)
		    		let reg = new RegExp(keyword,'ig')
		    		let neworderNo = orderNo.replace(reg,'<b style="color:red;">'+keyword+'</b>')
		    		return <div dangerouslySetInnerHTML={{__html: neworderNo}}></div>
		    	}else{
		    		return orderNo
		    	}
		    }
		  },
		  {
		    title: '收件人',
		    key: 'name',
		    dataIndex: 'name'
		  },
		  {
		    title: '订单状态',
		    key: 'statusDesc',
		    dataIndex: 'statusDesc'
		  },
		  {
		    title: '订单金额',
		    key: 'payment',
		    dataIndex: 'payment'
		  },
		  {
		    title: '创建时间',
		    key: 'createdAt',
		    dataIndex: 'createdAt',
		  },
		  {
		  	title:'操作',
		  	render:(text,record)=>{//在编辑和查看路由后面加上准确的id，可以精准编辑和查看商品信息
		  		return(
		  			<span>
		  				<Link to={'/order/detail/' + record.orderNo}>查看</Link>
		  			</span>
		  		)
		  	}
		  }
		]	
		 const { list,current,pageSize,total,handlePage,isFecthing,keyword } = this.props	
		 const dataSource = list.map((order)=>{
		 	console.log(order.get(''))
		 	return{
		 		key:order.get('orderNo'),
		 		orderNo:order.get('orderNo'),
		 		name:order.get('shipping').get('name'),
				statusDesc:order.get('statusDesc'),
				payment:order.get('payment'),
				createdAt:moment(order.get('createdAt')).format('YYYY-MM-DD HH:MM:SS')
			}		 	
		 }).toJS()
		return(
 			<div className = 'OrderList'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>订单管理</Breadcrumb.Item>
	                  <Breadcrumb.Item>订单列表</Breadcrumb.Item>
	                </Breadcrumb>
	                <div className='btn'>
	                	<Search 
	                        placeholder="请输入商品名称关键字" 
	                        onSearch={
	                            value => handlePage(1,value)
	                        } 
	                        enterButton 
	                        style={{ width: 300 }}
	                    />	
			        </div>
 					<div className='conntent'>
 						<Table 
							columns={columns} 
							dataSource={dataSource}
							rowKey='key'
							pagination={{
								current:current,
								pageSize:pageSize,
								total:total
							}}
							onChange={(page)=>{//点击分页器根据当前页码进行改变页面
								// console.log(page)
								if(keyword){//如果存在关键词，则只根据关键词设置页面
									// console.log(keyword)
									handlePage(page.current,keyword)
								}else{
									handlePage(page.current)
								}								
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
	// console.log(state.get('category').get('list'))
	return{
		list:state.get('order').get('list'),
		current:state.get('order').get('current'),
		pageSize:state.get('order').get('pageSize'),
		total:state.get('order').get('total'),
		isFecthing:state.get('order').get('isFecthing'),
		keyword:state.get('order').get('keyword')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handlePage:(page,keyword)=>{//进行页码的获取
			dispatch(actionCreator.getPageAction(page,keyword))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderList);//app通过connnect方法与store进行关联，接收数据和方法
