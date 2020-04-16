//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class NormalLoginForm extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleLogin(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isFecthing } = this.props
    return (
    <div className='container' style={{
      background:`url(${require("images/beijing.jpg")})`,
      backgroundRepeat:`no-repeat`,
      backgroundSize: `cover`
    }}>
      <div className='Login' >
      <Form  className="login-form">
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '账号不能为空' },{pattern:/^[a-z][0-9a-z_]{2,5}$/i,message:'用户名是以字母开头的3-6位字符'}],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="账号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' },{pattern:/^\w{3,6}$/i,message:'密码是任意的3-6位字符'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
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
            登录
          </Button>
        </Form.Item>
      </Form>
     </div>
    </div>   
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
//将store里的数据映射到props里
const mapStateToProps = (state) =>{
	return{
		isFecthing:state.get('login').get('isFecthing') 
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		 handleLogin:(values)=>{
		 	dispatch(actionCreator.getLoginAction(values))
		 }
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/