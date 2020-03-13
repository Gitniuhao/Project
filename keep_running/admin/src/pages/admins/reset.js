//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import AdminLayout from 'common/layout'
import { Form, Icon, Input, Button, Checkbox,Breadcrumb,Select } from 'antd';
const { Option } = Select;

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class AdminReset extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		this.props.handleName()
	}
	handleSubmit(e){
	  e.preventDefault();
	  this.props.form.validateFields((err, values) => {
	    if (!err) {
	      console.log('Received values of form: ', values);
	        this.props.handleReset(values)
	    }
	  })
	}
	render(){//render负责渲染页面
		const { getFieldDecorator } = this.props.form;
		 const { name,isFecthing } = this.props
		return(
 			<div className = 'AdminReset'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>修改管理员密码</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='content'>
 						<Form  className="login-form">
					        <Form.Item>
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入用户名~' },{pattern:/^[a-z][0-9a-z_]{2,5}$/i,message:'用户名是以字母开头的3-6位字符~'}],
					            initialValue:name
					          })(
					            <Input		 
					              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              disabled={true}
					            />
					          )}
					        </Form.Item>
					        <Form.Item>
					          {getFieldDecorator('password', {
					            rules: [{ required: true, message: '请输入密码~' },{pattern:/^\w{3,6}$/i,message:'密码是任意的3-6位字符~'}],
					          })(
					            <Input
					 			  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              type="password"
					              placeholder="请输入密码~"
					            />,
					          )}
					        </Form.Item>
					        <Form.Item>
					          {getFieldDecorator('repassword', {
					            rules: [{ required: true, message: '请再次输入密码~' },{pattern:/^\w{3,6}$/i,message:'密码是任意的3-6位字符~'}],
					          })(
					            <Input
					              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              type="password"
					              placeholder="请再次输入密码~"
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
const WrappedAdminApp = Form.create({ name: 'coordinated' })(AdminReset);
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	return{
		name:state.get('admin').get('name'),
		isFecthing:state.get('admin').get('isFecthing')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleName:()=>{//获取登录的管理员名字
			dispatch(actionCreator.getNameAction())
		},
		handleReset:(values)=>{//修改管理员姓名 
			dispatch(actionCreator.resetPasswordAction(values))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedAdminApp);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/