//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import AdminLayout from 'common/layout'
import {  Breadcrumb,Table,pagination,Button,Divider,Switch,Input } from 'antd';
import moment from 'moment'
import { Link } from 'react-router-dom'
const { Search } = Input

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class ArticleList extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){//render负责渲染页面
		const columns = [
		  {
		    title: '文章标题',
		    dataIndex: 'title',
		    key: 'title',
		    render:(title)=>{
		    	if(keyword){
		    		///keyword/ig
		    		// console.log(keyword)
		    		let reg = new RegExp(keyword,'ig')
		    		let newTitle = title.replace(reg,'<b style="color:red;">'+keyword+'</b>')
		    		return <div dangerouslySetInnerHTML={{__html: newTitle}}></div>
		    	}else{
		    		return title
		    	}
		    }
		  },
		  {
		    title: '作者',
		    dataIndex: 'author',
		    key: 'author',
		  },
		  {
		    title: '阅读次数',
		    key: 'view',
		    dataIndex: 'view',
		  },
		  {
		    title: '是否被收藏',
		    key: 'isCollection',
		    dataIndex: 'isCollection',
		    render:(isCollection,record)=>{
		    	return(
		    		<span>{isCollection== 0 ? '否' : '是'}</span>
		    )}
		  },
		  {
		    title: '是否显示',
		    key: 'isShow',
		    dataIndex: 'isShow',
		    render:(isShow,record)=>{
		    	return(<Switch 
		    		checkedChildren="显示" 
		    		unCheckedChildren="隐藏"
		    		checked={isShow== '0' ? false : true}
		    		onChange={(checked)=>{
		    			const isShow = checked ? '1' : '0'
		    			this.props.handleUpdateIsShow(record.id,isShow)
		    		}}
		    	/>
		    )}
		  },
		  {
		  	title:'操作',
		  	render:(text,record)=>{//在编辑和查看路由后面加上准确的id，可以精准编辑和查看商品信息
		  		// console.log(record.key)
		  		return(
		  			<span>
		  				<Link to={'/article/save/' + record.id}>编辑</Link>
		  				<Divider type="vertical" />
		  				<Link to={'/article/detail/' + record.id}>查看</Link>
		  				<Divider type="vertical" />	
		  				<Button onClick={()=>this.props.handleDeleteArticle(record.id)}>删除</Button>
		  			</span>
		  			
		  		)
		  	}
		  }
		]
		 const { list,current,pageSize,total,isFecthing,keyword,handlePage } = this.props
		 const dataSource = list.map(article=>{
		 	return{
		 		id:article.get('id'),
		 		title:article.get('title'),
		 		author:article.get('author'),
		 		view:article.get('view'),
		 		isCollection:article.get('isCollection'),
		 		isShow:article.get('isShow'),
		 	}
		 }).toJS()
		return(
 			<div className = 'ArticleList'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>文章列表</Breadcrumb.Item>
	                </Breadcrumb>
	                <div className='btn'>
	                	<Search 
	                        placeholder="请输入文章标题关键字" 
	                        onSearch={
	                            value => handlePage(1,value)
	                        } 
	                        enterButton 
	                        style={{ width: 300 }}
	                    />
			        	<Link to='/article/save'><Button type="primary" className='add-btn'>新增文章</Button></Link>
			        </div>
 					<div className='content'>
 						<Table 
							columns={columns} 
							dataSource={dataSource}
							rowKey='id'
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
	return{
		list:state.get('article').get('list'),
		current:state.get('article').get('current'),
		pageSize:state.get('article').get('pageSize'),
		total:state.get('article').get('total'),
		isFecthing:state.get('article').get('isFecthing'),
		keyword:state.get('article').get('keyword'),
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handlePage:(page,keyword)=>{
			dispatch(actionCreator.getPageACtion(page,keyword))
		},
		handleUpdateIsShow:(id,newIshow)=>{
			dispatch(actionCreator.updateIsShowAction(id,newIshow))
		},
		handleDeleteArticle:(id)=>{
			dispatch(actionCreator.deleteArticleAction(id))
		}	
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/