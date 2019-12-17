import React,{Component} from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import $ from 'jquery'

class RichEditor extends Component{
	constructor(props){
		super(props)
		this.state={
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
		//携带cookie
		$.ajaxSetup({
			xhrFields: {
		      	withCredentials: true
		   	}
		})
	}
	componentDidMount(){
		var editor = new Simditor({
		  textarea: this.textarea,
		  toolBar:this.toolBar,
		  upload:{
	  		url:this.props.url,
	  		fileKey:'upload'
	  	}
		});
	}
	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor"></textarea>
		)
	}
}
export default RichEditor