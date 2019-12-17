import React,{Component,Fragment} from 'react'
import { Upload, Icon, Modal } from 'antd';

class UploadImage extends Component{
	constructor(props){
		super(props)
		this.state= {
			previewVisible: false,
		    previewImage: '',
		    fileList: []
		}
		this.handleCancel =this.handleCancel.bind(this)
		this.handlePreview =this.handlePreview.bind(this)
		this.handleChange =this.handleChange.bind(this)
	}
	 handleCancel(){
	 	this.setState({ previewVisible: false })
	 };
	 handlePreview(file){
	  	  this.setState({
	      previewImage: file.url || file.preview,
	      previewVisible: true,
	    });
	 }
	 handleChange({ fileList }){
	 	this.setState({ fileList },()=>{
	 		this.props.getFileList(fileList.map(file=>{//调用父组件save传递的方法，将图片的地址传递到父组件
	 			if(file.response){//当file.response存在的时候返回图片的地址
	 				return file.response.url 
	 			}
	 		}).join(','))//将数组的每一项通过，拼接成字符串返回
	 	})
	 };
	render(){
		const { previewVisible, previewImage, fileList } = this.state;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    );
	    const { max,action } = this.props
		return(
			 <div className="clearfix">
		        <Upload
		          action={action}
		          withCredentials={true}
		          listType="picture-card"
		          fileList={fileList}
		          onPreview={this.handlePreview}
		          onChange={this.handleChange}
		        >
		          {fileList.length >= max ? null : uploadButton}
		        </Upload>
		        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		          <img alt="example" style={{ width: '100%' }} src={previewImage} />
		        </Modal>
		     </div>
		)
	  }
	}
export default UploadImage