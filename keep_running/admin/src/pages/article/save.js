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
class ArticleSave extends Component{//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
  constructor(props){
	super(props)
	this.handleSubmit = this.handleSubmit.bind(this)
	this.state={//获取url中的商品id
		articleId:this.props.match.params.articleId
	}
  }
  componentDidMount(){
	this.props.handleName()
	if(this.state.articleId){//如果能够获取到articleId则获取文章详情
		this.props.handleArticleDetail(this.state.articleId)

	}
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        //将商品id存在values中
	      values.id = this.state.articleId
        this.props.handleSaveArticle(err,values)
      }
    });
  };
  
	render(){//render负责渲染页面
		const { getFieldDecorator } = this.props.form;
		 const { 
		 	isFecthing,
		 	handleMainImage,
		 	handleContent,
		 	mainImageValidateStatus,
			mainImageHelp,
			name,

			title,
			author,
			mainImage,
			detail
		  } = this.props
		  //封面图片数据回传
		 let mainImageList = [];
		 if(mainImage){//将数据插入到mainImageList数组中
		 	mainImageList.push({
		 		uid: '0',
		        name: 'image.png',
		        status: 'done',
		        url:mainImage,
		        response:{
	              url:mainImage
	            }
		 	})
		 }
		return(
 			<div className = 'ArticleSave'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>新增文章</Breadcrumb.Item>
	                </Breadcrumb>
 					<div className='content'>
 						<Form  className="article-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        <Form.Item label="文章标题">
					          {getFieldDecorator('title', {
					            rules: [{ required: true, message: '请输入文章标题~' }],
					            initialValue:title
					          })(
					            <Input/>
					          )}
					        </Form.Item>
					        <Form.Item label="作者">
					          {getFieldDecorator('author', {
					            rules: [{ required: true, message: '请输入作者~' }],
					            initialValue:name
					          })(
					            <Input disabled={true} />
					          )}
					        </Form.Item>
					        <Form.Item 
					        	label="封面图片"
					        	required={true}
					        	validateStatus={mainImageValidateStatus}
					        	help={mainImageHelp}
					        >
					          <UploadImage
					          	 max={1}
					          	 action={UPLOAD_ARTICLE_IMAGE}
					          	 getFileList = {(fileList)=>{//定义一个方法传递给子组件uploadImage,子组件调用方法，传递图片数据给父组件save
					         		handleMainImage(fileList)
					         	}}
					         	fileList={mainImageList}//数据传递给子组件
					    	  />	
					        </Form.Item>
					        <Form.Item label="文章内容" required={true}>
					         	<RichEditor
					         		url={UPLOAD_ARTICLE_DETAILS_IMAGE}
					         		getValues={(values)=>{
					         			handleContent(values)
					         			// console.log(values)
					         		}}
					         		value={detail}
					         	/>
					        </Form.Item>
					        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
					          <Button 
					            type="primary"  
					            onClick ={this.handleSubmit}
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
const WrappedArticleApp = Form.create({ name: 'coordinate' })(ArticleSave);
//将store里的数据映射到props里
const mapStateToProps = (state) =>{	
	return{
		mainImageValidateStatus:state.get('article').get('mainImageValidateStatus'),
		mainImageHelp:state.get('article').get('mainImageHelp'),
		name:state.get('article').get('name'),
		title:state.get('article').get('title'),
		author:state.get('article').get('author'),
		mainImage:state.get('article').get('mainImage'),
		detail:state.get('article').get('detail')
	}
}
//将方法映射到组件中，从而返回到this.props里
const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
	return{//将方法都需要返回一个对象，
		handleMainImage:(fileList)=>{
			dispatch(actionCreator.setMainImageAction(fileList))
		},
		handleContent:(values)=>{
			dispatch(actionCreator.setContentAction(values))
		},
		handleSaveArticle:(err,values)=>{
			dispatch(actionCreator.saveArticleAction(err,values))
		},
		handleName:()=>{//获取登录的管理员名字
			dispatch(actionCreator.getNameAction())
		},
		handleArticleDetail:(id)=>{
			dispatch(actionCreator.getDetailAction(id))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedArticleApp);//app通过connnect方法与store进行关联，接收数据和方法

/*react-redux的好处：不用进行constructor从而进行数据的初始化，也不用将更新后的数据再次进行
设置，这些react-dedux都自己做了*/