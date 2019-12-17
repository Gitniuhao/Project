import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Table,Pagination,Breadcrumb,Button,Input,InputNumber,Switch } from 'antd';
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
		    title: '分类名称',
		    dataIndex: 'name',
		    key: 'name',
		    render: (name,record)=>{
		    	return(
		    		<Input 
		    			style={{width:'60%'}}
		    			defaultValue={name}
		    			onBlur={(ev)=>{
		    				// console.log(ev.target.value)
		    				// console.log(record)
		    				if(ev.target.value != name){
		    					this.props.handleUpdateName(record._id,ev.target.value)
		    				}		    				
		    			}}
		    		/>
		    	)
		    }
		  },
		  {
		    title: '手机分类名称',
		    dataIndex: 'mobileName',
		    key: 'mobileName',
		    render: (mobileName,record)=>{
		    	return(
		    		<Input 
		    			style={{width:'60%'}}
		    			defaultValue={mobileName}
		    			onBlur={(ev)=>{
		    				// console.log(ev.target.value)
		    				// console.log(record)
		    				if(ev.target.value != mobileName){
		    					this.props.handleUpdateMobileName(record._id,ev.target.value)
		    				}		    				
		    			}}
		    		/>
		    	)
		    }
		  },
		  {
		    title: '是否显示',
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
		    title: '排序',
		    key: 'order',
		    dataIndex: 'order',
		    render: (order,record)=>{
		    	return(
		    		<InputNumber 
		    			style={{width:'60%'}}
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
		handleUpdateName:(id,newName)=>{//更新分类名称
			dispatch(actionCreator.updateNameAction(id,newName))
		},
		handleUpdateMobileName:(id,newMobileName)=>{//更新手机分类名称
			dispatch(actionCreator.updateMobileNameAction(id,newMobileName))
		},
		handleUpdateOrder:(id,newOrder)=>{//更新排序
			dispatch(actionCreator.updateOrderAction(id,newOrder))
		},
		handleUpdateIsShow:(id,newIsShow)=>{//更新排序
			dispatch(actionCreator.updateIsShowAction(id,newIsShow))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);//app通过connnect方法与store进行关联，接收数据和方法
