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
	}
	componentDidMount(){
		this.props.handleLevelCategory()
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        // console.log('Received values of form: ', values);
	        this.props.handleAdd(values)
	      }
	    });
	  };
	render(){
		 const { getFieldDecorator } = this.props.form;
		 const { categories } = this.props  
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
					          {getFieldDecorator('pid', {
					            rules: [{ required: true, message: '请选择商品分类~' }],
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
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品描述">
					          {getFieldDecorator('description', {
					            rules: [{ required: true, message: '请输入你的商品描述~' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品价格">
					          {getFieldDecorator('price', {
					            rules: [{ required: true, message: '请输入你的商品价格~' }],
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="商品库存">
					          {getFieldDecorator('stock', {
					            rules: [{ required: true, message: '请输入你的商品库存~' }],
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="封面图片">
					         	<UploadImage 
					         	max={1} 
					         	action={UPLOAD_PRODUCT_IMAGE}
					         	getFileList = {(fileList)=>{//定义一个方法传递给子组件uploadImage,子组件调用方法，传递图片数据给父组件save
					         		console.log('father:',fileList)
					         	}}
					         	/>
					        </Form.Item>
					        <Form.Item label="商品图片">
					         	<UploadImage 
					         	max={5} 
					         	action={UPLOAD_PRODUCT_IMAGE}
					         	getFileList = {(fileList)=>{//定义一个方法传递给子组件uploadImage,子组件调用方法，传递图片数据给父组件save
					         		console.log('father:',fileList)
					         	}}
					         	/>
					        </Form.Item>
					        <Form.Item label="商品详情">
					         	<RichEditor
					         		url={UPLOAD_PRODUCT_DETAILS_IMAGE}
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
		categories:state.get('product').get('categories')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleAdd:(values)=>{
			dispatch(actionCreator.AddCategoryACtion(values))
		},
		handleLevelCategory:()=>{
			dispatch(actionCreator.getLevelCategoriesAction())
		}		
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave);//app通过connnect方法与store进行关联，接收数据和方法
