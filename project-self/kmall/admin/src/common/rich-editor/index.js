import React,{Component} from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import $ from 'jquery'

class RichEditor extends Component{
	constructor(props){
		super(props)
		this.state={//初始化
			toolBar:[
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol',
			  'ul',
			  'blockquote',
			  'code',
			  'table',
			  'link',
			  'image',
			  'hr',
			  'indent',
			  'outdent',
			  'alignment',
			]
		}
		//引进jquery携带cookie
		$.ajaxSetup({
			xhrFields: {
		      	withCredentials: true
		   	}
		})
	}
	componentDidMount(){//组件挂载完毕后进行生成一个simditor
		this.editor = new Simditor({
		  textarea: this.textarea,//simditor本体
		  toolBar:this.toolBar,//添加simditor的一些工具和功能
		  upload:{//图片上传数据的地址和关键字
	  		url:this.props.url,
	  		fileKey:'upload'
	  	}
		});
		this.editor.on('valuechanged',()=>{
			this.props.getValues(this.editor.getValue())
		})
	}
	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor"></textarea>
		)
	}
}
export default RichEditor