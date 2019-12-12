import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React,{Component} from 'react';
const {  Sider } = Layout;
import AdminHeader from 'common/header'
import  {Link,NavLink} from 'react-router-dom'

class AdminSider extends Component{
  render(){
    return(
        <Sider width={200} style={{ background: '#fff',minHeight:720 }}>
                <Menu
                  defaultSelectedKeys={['1']}
                  style={{ height: '100%', borderRight: 0 }}
                >                
                    <Menu.Item key="1">
                        <NavLink to='/'>首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                       <NavLink to='/user'>用户列表</NavLink>
                    </Menu.Item>             
                </Menu>
        </Sider>
      )
  }
}

export default AdminSider;