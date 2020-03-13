//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import AdminLayout from 'common/layout'
import { Form, Icon, Input, Button, Checkbox,Breadcrumb } from 'antd';

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class AdminAdd extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		}
	  handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        this.props.handleAdd(values)
	      }
	    });
	  };

	render(){//render负责渲染页面
		const { getFieldDecorator } = this.props.form;
		 const { isFecthing } = this.props
		return(
 			<div className = 'AdminAdd'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>新增管理员</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='content'>
 						<Form  className="login-form">
					        <Form.Item>
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入用户名~' },{pattern:/^[a-z][0-9a-z_]{2,5}$/i,message:'用户名是以字母开头的3-6位字符~'}],
					          })(
					            <Input
					              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              placeholder="用户名"
					            />,
					          )}
					        </Form.Item>
					        <Form.Item>
					          {getFieldDecorator('password', {
					            rules: [{ required: true, message: '请输入密码~' },{pattern:/^\w{3,6}$/i,message:'密码是任意的3-6位字符~'}],
					          })(
					            <Input
					              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              type="password"
					              placeholder="密码"
					            />,
					          )}
					        </Form.Item>
					        <Form.Item>
					          {getFieldDecorator('phone', {
					            rules: [{ required: true, message: '请输入手机号码~' },{pattern:/^1[3578]\d{9}$/,message:'手机号码是任意的9-11位数字~'}],
					          })(
					            <Input
					              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              placeholder="手机号码"
					            />,
					          )}
					        </Form.Item>
					        <Form.Item>
					          {getFieldDecorator('email', {
					            rules: [{ required: true, message: '请输入邮箱~' },{pattern:/^\w+@\w{2,5}\.[a-z]{2,3}$/i,message:'邮箱是任意的带@的多个字符~'}],
					          })(
					            <Input
					              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              placeholder="邮箱"
					            />,
					          )}
					        </Form.Item>
					        <Form.Item>
					          <Button 
					            type="primary"  
					            className="login-form-button btn-submit"
					            onClick ={this.handleSubmit}
					            loading={isFecthing}
					          >
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
const WrappedAdminApp = Form.create({ name: 'coordinated' })(AdminAdd);
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	return{
		isFecthing:state.get('admin').get('isFecthing')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleAdd:(values)=>{
			dispatch(actionCreator.addAdminAction(values))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedAdminApp);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/