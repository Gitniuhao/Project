import React,{Component,Fragment} from 'react'
import AdminLayout from 'common/layout'
import { Breadcrumb,Form, Select, Input, Button,InputNumber  } from 'antd';
import { connect } from 'react-redux'
import * as actionCreator from'./store/actionCreator.js'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAILS_IMAGE } from 'api/config.js'
import './index.css'

class ProductDetail extends Component{
	constructor(props){
		super(props)
		this.state ={//获取url中的商品id
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		//如果页面存在id的情况下，就是编辑商品或查看，需要获取商品详情
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId)
		}
	}
	render(){
		 const { 
			categoryName,
			name,
			description,
			price,
			stock,
			mainImage,
			images,
			detail,
		 	 } = this.props  
		 //商品图片
		  var imageBox = [];
		  if(images){
		  	imageBox = images.split(',').map((url,index)=>{
				return <li key={index}><img src={url} /></li>
			})
		  }		 
		return(
			<div className='ProductDetail'>
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
	                  <Breadcrumb.Item>查看商品</Breadcrumb.Item>
	                </Breadcrumb>
					<div className='content'>
						 <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					        <Form.Item label="商品分类">
					          <Input value={categoryName}  disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品名称">
					          <Input value={name}  disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品描述">
					          <Input value={description}  disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品价格">
					          <InputNumber value={price}  disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品库存">
					          <InputNumber  value={stock}  disabled={true} />
					        </Form.Item>
					        <Form.Item 
					        	label="封面图片"			
					        >
					         {mainImage ? <ul className='imageBox'><li><img src={mainImage} /></li></ul> : null}	
					        </Form.Item>
					        <Form.Item
					         	label="商品图片"	
					        >
					         <ul className='imageBox'>{imageBox}</ul>
					        </Form.Item>
					        <Form.Item label="商品详情">
					         	<div dangerouslySetInnerHTML={{__html: detail}}></div>
					        </Form.Item>
					      </Form>
					</div>
				</AdminLayout>				
			</div>			
		)
	}
}
const WrappedProductDetail = Form.create({ name: 'coordinated' })(ProductDetail);

//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	// console.log(state)
	return{
		//获取商品详情信息
		category:state.get('product').get('category'),
		categoryName:state.get('product').get('categoryName'),
		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		mainImage:state.get('product').get('mainImage'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleProductDetail:(id)=>{
			dispatch(actionCreator.getProductDetailAction(id))
		}			
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductDetail);//app通过connnect方法与store进行关联，接收数据和方法
