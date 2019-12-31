import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React,{Component} from 'react';
const {  Sider } = Layout;
import  {Link,NavLink} from 'react-router-dom'
import './index.css'

class AdminSider extends Component{
  render(){
    return(
        <Sider width={200} style={{ background: '#fff',minHeight:720 }} className='AdminSider'>
                <Menu
                  style={{ height: '100%', borderRight: 0 }}
                >                
                    <Menu.Item key="1">
                        <NavLink exact to='/'><Icon type="home" />首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                       <NavLink to='/user'><Icon type="user" />用户管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                       <NavLink to='/category'><Icon type="menu" />分类管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                       <NavLink to='/product'><Icon type="shopping" />商品管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="5">
                       <NavLink to='/order'><Icon type="shopping" />订单管理</NavLink>
                    </Menu.Item>
                     <Menu.Item key="6">
                       <NavLink to='/ad'><Icon type="fund" />广告管理</NavLink>
                    </Menu.Item>                          
                </Menu>
        </Sider>
      )
  }
}

export default AdminSider;