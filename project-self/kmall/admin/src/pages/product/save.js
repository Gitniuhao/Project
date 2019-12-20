import React,{Component,Fragment} from 'react'
import AdminLayout from 'common/layout'
import { Breadcrumb,Form, Select, Input, Button,InputNumber  } from 'antd';
const { Option } = Select;
import { connect } from 'react-redux'
import * as actionCreator from'./store/actionCreator.js'
import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAILS_IMAGE } from 'api/config.js'
import './index.css'

class ProductSave extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		// console.log(this.props.match)
		this.state ={
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		this.props.handleLevelCategory()
		//如果页面存在id的情况下，就是编辑商品或查看，需要获取商品详情
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId)
		}
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	/*
	      if (!err) {
	        // console.log('Received values of form: ', values);
	        this.props.handleSaveProduct(values)
	      }*/
	      this.props.handleSaveProduct(err,values)
	    });
	  };
	render(){
		 const { getFieldDecorator } = this.props.form;
		 const { 
		 	categories,
		 	handleMainImage,
		 	handleImages,
		 	handleDetail,

		 	mainImageValidateStatus,
			mainImageHelp,
			imagesValidateStatus,
			imagesHelp,

			category,
			name,
			description,
			price,
			stock,
			mainImage,
			images,
			detail,
		 	 } = this.props  
		 //封面图片数据回传
		 let mainImageList = [];
		 if(mainImage){//将数据插入到mainImageList数组中
		 	mainImageList.push({
		 		uid: '0',
		        name: 'image.png',
		        status: 'done',
		        url:mainImage,
		 	})
		 }
		 //商品图片数据回传
		 let imagesList = [];
		 if(images){//先将images转换成数组然后再用map进行遍历然后返回
		 	imagesList = images.split(',').map((index,url)=>{
		 		return{
		 			uid: index,
			        name: 'image.png',
			        status: 'done',
			        url:url,
		 		}
		 	})
		 }
		return(
			<div className='ProductSave'>
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
	                  <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
	                </Breadcrumb>
					<div className='content'>
						 <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					        <Form.Item label="商品分类">
					          {getFieldDecorator('category', {
					            rules: [{ required: true, message: '请选择商品分类~' }],
					            initialValue:category
					          })(
					            <Select
					              placeholder="请选择商品分类~"
					            >
					              {
					              	categories.map((category)=>{
					              		// console.log(category.get('name'))
					              		return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
					              	})
					              }
					            </Select>,
					          )}
					        </Form.Item>
					        <Form.Item label="商品名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入你的商品名称~' }],
					             initialValue:name
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品描述">
					          {getFieldDecorator('description', {
					            rules: [{ required: true, message: '请输入你的商品描述~' }],
					             initialValue:description
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品价格">
					          {getFieldDecorator('price', {
					            rules: [{ required: true, message: '请输入你的商品价格~' }],
					            initialValue:price
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="商品库存">
					          {getFieldDecorator('stock', {
					            rules: [{ required: true, message: '请输入你的商品库存~' }],
					            initialValue:stock
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item 
					        	label="封面图片"
					        	required={true}
					        	validateStatus={mainImageValidateStatus}
					        	help={mainImageHelp}
					        >
					         	<UploadImage 
						         	max={1} 
						         	action={UPLOAD_PRODUCT_IMAGE}
						         	getFileList = {(fileList)=>{//定义一个方法传递给子组件uploadImage,子组件调用方法，传递图片数据给父组件save
						         		handleMainImage(fileList)
						         	}}
						         	fileList={mainImageList}//将图片数据传给子组件
					         	/>
					        </Form.Item>
					        <Form.Item 
					        	label="商品图片"
					        	required={true}
					        	validateStatus={imagesValidateStatus}
					        	help={imagesHelp}
					        >
					         	<UploadImage 
						         	max={5} 
						         	action={UPLOAD_PRODUCT_IMAGE}
						         	getFileList = {(fileList)=>{//定义一个方法传递给子组件uploadImage,子组件调用方法，传递图片数据给父组件save
						         		handleImages(fileList)
						         	}}
						         	fileList={imagesList}
					         	/>
					        </Form.Item>
					        <Form.Item label="商品详情">
					         	<RichEditor
					         		url={UPLOAD_PRODUCT_DETAILS_IMAGE}
					         		getValues={(values)=>{
					         			handleDetail(values)
					         		}}
					         		value={detail}//将详情数据回传给子组件
					         	 />
					        </Form.Item>
					        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
					          <Button type="primary" onClick={this.handleSubmit}>
					            提交
					          </Button>
					        </Form.Item>
					      </Form>
					</div>
				</AdminLayout>				
			</div>			
		)
	}
}
const WrappedProductSave = Form.create({ name: 'coordinated' })(ProductSave);

//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	// console.log(state)
	return{
		categories:state.get('product').get('categories'),
		mainImageValidateStatus:state.get('product').get('mainImageValidateStatus'),
		mainImageHelp:state.get('product').get('mainImageHelp'),
		imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
		imagesHelp:state.get('product').get('imagesHelp'),
		//获取商品详情信息
		category:state.get('product').get('category'),
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
		handleSaveProduct:(err,values)=>{
			dispatch(actionCreator.saveProductACtion(err,values))
		},
		handleLevelCategory:()=>{
			dispatch(actionCreator.getLevelCategoriesAction())
		},
		handleMainImage:(fileList)=>{//上传封面图片
			dispatch(actionCreator.setMainImageAction(fileList))
		},
		handleImages:(fileList)=>{//上传商品图片
			dispatch(actionCreator.setImagesAction(fileList))
		},
		handleDetail:(values)=>{//上传详情
			dispatch(actionCreator.setDetailAction(values))
		},
		handleProductDetail:(id)=>{
			dispatch(actionCreator.getProductDetailAction(id))
		}			
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave);//app通过connnect方法与store进行关联，接收数据和方法
