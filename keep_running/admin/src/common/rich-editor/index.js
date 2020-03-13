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
			],
			isLoad:false//页面是否加载
		}
		//引进jquery携带cookie
		// $.ajaxSetup({
		// 	xhrFields: {
		//       	withCredentials: true
		//    	}
		// })
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
			this.setState({isLoad:true},()=>{//表示页面加载过，直接更新就好
				this.props.getValues(this.editor.getValue())
			})			
		})
	}
	componentDidUpdate(){//在更新完成后的周期
//isLoad默认为false,if条件语句中对isLoad取非，是代表如果没有加载则使其称为true，且存在values
// 两个条件同时成立,然后进入下面操作，然后进入之后isload是false(即没有加载)，
//然后进行数据回填，之后将isLoad赋值true，代表以及加载过，则此时isLoad为true,!isLoad为false,
//则不能继续if语句下面的操作
		if(this.props.value && !this.state.isLoad){
			this.editor.setValue(this.props.value)			
			this.setState({
				isLoad:true
			})
		}
	}
	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor"></textarea>
		)
	}
}
export default RichEditor