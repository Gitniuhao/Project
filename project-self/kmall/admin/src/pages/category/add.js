import React,{Component,Fragment} from 'react'
import AdminLayout from 'common/layout'
import { Breadcrumb,Form, Select, Input, Button  } from 'antd';
const { Option } = Select;
import { connect } from 'react-redux'
import * as actionCreator from'./store/actionCreator.js'

class CategoryAdd extends Component{
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
			<div className='CategoryAdd'>
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>分类管理</Breadcrumb.Item>
	                  <Breadcrumb.Item>新增分类</Breadcrumb.Item>
	                </Breadcrumb>
					<div className='content'>
						 <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					        <Form.Item label="父级分类">
					          {getFieldDecorator('pid', {
					            rules: [{ required: true, message: '请选择父级分类~' }],
					          })(
					            <Select
					              placeholder="请选择父级分类~"
					            >
					              <Option value='0'>根分类</Option>
					              {
					              	categories.map((category)=>{
					              		// console.log(category.get('name'))
					              		return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
					              	})
					              }
					            </Select>,
					          )}
					        </Form.Item>
					        <Form.Item label="分类名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入你的分类名称！' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="手机分类名称">
					          {getFieldDecorator('mobileName', {
					            rules: [{ required: true, message: '请输入你的手机分类名称！' }],
					          })(<Input />)}
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
const WrappedCategoryApp = Form.create({ name: 'coordinated' })(CategoryAdd);

//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	// console.log(state)
	return{
		categories:state.get('category').get('categories')
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
export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryApp);//app通过connnect方法与store进行关联，接收数据和方法
