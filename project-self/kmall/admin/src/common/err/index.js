import React,{Component} from 'react';
import { Alert,Button } from 'antd';
import './index.css'
import {Link} from 'react-router-dom'
class Err extends Component{
	render(){
		return(	
			<div className='Err'>
				<Alert
			      message="Not Found"
			      description="您输入的网址走丢了！请重新输入正确的地址！"
			      type="error"
			      showIcon
			    />
			    <Link to='/'>
			    	<Button type="link" block>
				      返回首页
				    </Button>
			    </Link>
			</div>
		)
	}
}
export default Err;