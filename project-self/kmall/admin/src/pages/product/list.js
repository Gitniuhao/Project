import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Table,Pagination,Breadcrumb,Button,Input,InputNumber,Switch,Divider } from 'antd';
import AdminLayout from 'common/layout'
import moment from 'moment'
import { Link } from 'react-router-dom'

class ProductList extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){
		const columns = [
		  {
		    title: '商品名称',
		    dataIndex: 'name',
		    key: 'name'
		  },
		  {
		    title: '是否首页显示',
		    key: 'isShow',
		    dataIndex: 'isShow',
		    render:(isShow,record)=>{
		    	return(<Switch 
		    		checkedChildren="显示" 
		    		unCheckedChildren="隐藏"
		    		checked={isShow=='0' ? false : true}
		    		onChange={(checked)=>{
		    			const isShow = checked ? '1' : '0'
		    			this.props.handleUpdateIsShow(record._id,isShow)
		    		}}
		    	/>
		    )}
		  },
		  {
		    title: '上架/下架',
		    key: 'status',
		    dataIndex: 'status',
		    render:(status,record)=>{
		    	return(<Switch 
		    		checkedChildren="上架" 
		    		unCheckedChildren="下架"
		    		checked={status=='0' ? false : true}
		    		onChange={(checked)=>{
		    			const status = checked ? '1' : '0'
		    			this.props.handleUpdateStatus(record._id,status)
		    		}}
		    	/>
		    )}
		  },
		  {
		    title: '是否热卖',
		    key: 'isHot',
		    dataIndex: 'isHot',
		    render:(isHot,record)=>{
		    	return(<Switch 
		    		checkedChildren="热卖" 
		    		unCheckedChildren="冷门"
		    		checked={isHot=='0' ? false : true}
		    		onChange={(checked)=>{
		    			const isHot = checked ? '1' : '0'
		    			this.props.handleUpdateIsHot(record._id,isHot)
		    		}}
		    	/>
		    )}
		  },
		  {
		    title: '排序',
		    key: 'order',
		    dataIndex: 'order',
		    width:'20%',
		    render: (order,record)=>{
		    	return(
		    		<InputNumber 
		    			style={{width:'40%'}}
		    			defaultValue={order}
		    			onBlur={(ev)=>{
		    				// console.log(ev.target.value)
		    				// console.log(record)
		    				if(ev.target.value != order){
		    					this.props.handleUpdateOrder(record._id,ev.target.value)
		    				}		    				
		    			}}
		    		/>
		    	)
		    }
		  },
		  {
		  	title:'操作',
		  	render:(text,record)=>{//在编辑和查看路由后面加上准确的id，可以精准编辑和查看商品信息
		  		return(
		  			<span>
		  				<Link to={'/product/save/' + record._id}>编辑</Link>
		  				<Divider type="vertical" />
		  				<Link to={'/product/detail/' + record._id}>查看</Link>
		  			</span>
		  		)
		  	}
		  }
		]
		 const { list,current,pageSize,total,handlePage,isFecthing } = this.props
		 const dataSource = list.toJS()
		return(
 			<div className = 'ProductList'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
	                  <Breadcrumb.Item>商品列表</Breadcrumb.Item>
	                </Breadcrumb>
	                <div className='btn'>
			        	<Link to='/product/save'><Button type="primary" className='add-btn'>新增商品</Button></Link>
			        </div>
 					<div className='conntent'>
 						<Table 
							columns={columns} 
							dataSource={dataSource}
							rowKey='_id'
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
	// console.log(state.get('category').get('list'))
	return{
		list:state.get('category').get('list'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		isFecthing:state.get('category').get('isFecthing')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handlePage:(page)=>{//进行页码的获取
			dispatch(actionCreator.getPageAction(page))
		},
		handleUpdateOrder:(id,newOrder)=>{//更新排序
			dispatch(actionCreator.updateOrderAction(id,newOrder))
		},
		handleUpdateIsShow:(id,newIsShow)=>{//更新显示隐藏
			dispatch(actionCreator.updateIsShowAction(id,newIsShow))
		},
		handleUpdateStatus:(id,newStatus)=>{//更新上下架状态
			dispatch(actionCreator.updateStatusAction(id,newStatus))
		},
		handleUpdateIsHot:(id,newIsHot)=>{//更新是否热卖
			dispatch(actionCreator.updateIsHotAction(id,newIsHot))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);//app通过connnect方法与store进行关联，接收数据和方法
