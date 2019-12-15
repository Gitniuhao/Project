import React,{Component,Fragment} from 'react'
import AdminLayout from 'common/layout'
import { Breadcrumb } from 'antd';
class CategoryAdd extends Component{
	render(){
		return(
			<div className='CategoryAdd'>
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>首页</Breadcrumb.Item>
	                  <Breadcrumb.Item>分类管理</Breadcrumb.Item>
	                  <Breadcrumb.Item>新增分类</Breadcrumb.Item>
	                </Breadcrumb>
					xdbchdbchk
				</AdminLayout>				
			</div>			
		)
	}
}
export default CategoryAdd