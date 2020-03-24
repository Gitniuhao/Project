//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { connect } from 'react-redux'
import './index.css';
import AdminLayout from 'common/layout'
import { Form, Icon, Input, Button, Checkbox,Breadcrumb } from 'antd';
import UploadImage from 'common/upload_image'
import RichEditor from 'common/rich-editor'
import {UPLOAD_ARTICLE_IMAGE,UPLOAD_ARTICLE_DETAILS_IMAGE} from 'api/config.js'


//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
class OpinionDetail extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
  constructor(props){
	super(props)
	// console.log(this.props.match.params)
	this.state ={//获取url中的商品id
		opinionId:this.props.match.params.opinionId
	}
  }
  componentDidMount(){
  	if(this.state.opinionId){
		this.props.handleOpinionDetail(this.state.opinionId)
  	}
  }
	render(){//render负责渲染页面
		 const { name,wechat,opinionImages,opinion} = this.props
		return(
 			<div className = 'OpinionDetail'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>文章详情</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='content'>
 						<Form  className="article-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        <Form.Item label="反馈用户">
					            <Input value={name}  disabled={true}/>
					        </Form.Item>
					        <Form.Item label="反馈者微信">
					            <Input value={wechat} disabled={true} />
					        </Form.Item>
					        <Form.Item label="反馈图片">
					        	{opinionImages ? <ul className='imageBox'><li><img src={opinionImages}/></li></ul> : null}			       
					        </Form.Item>
					        <Form.Item label="反馈意见">
					         	 <div dangerouslySetInnerHTML={{__html: opinion}}></div>
					        </Form.Item>
					      </Form>
 					</div>
 				</AdminLayout>
 			</div>		
		)
	}
}
const WrappedOpinionApp = Form.create({ name: 'coordinate' })(OpinionDetail);
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	return{
		name:state.get('opinion').get('name'),
		wechat:state.get('opinion').get('wechat'),
		opinionImages:state.get('opinion').get('opinionImages'),
		opinion:state.get('opinion').get('opinion')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleOpinionDetail:(id)=>{
			dispatch(actionCreator.getDetailAction(id))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedOpinionApp);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/