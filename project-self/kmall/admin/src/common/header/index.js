import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import React,{Component} from 'react';
const { SubMenu } = Menu;
const { Header } = Layout;
import './index.css'
import { getUsername,removeUsername } from 'util'
import axios from 'axios'

class AdminHeader extends Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout(){//发送ajax清除后台session后然后清除前台locastroage退出登录
    axios({
      method:'delete',
      url:'http://127.0.0.1:3000/sessions/users'
    })
    .then(result=>{
      if(result.data.code == 0){
          //1、清除localstorage
          removeUsername()
          //2、跳转到登录页面
          window.location.href = '/login'
      } 
    })
    .catch(err =>{
      console.log(err)
    })
  }
  render(){
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={this.handleLogout}>
            <Icon type="logout" />退出
        </Menu.Item>
      </Menu>
    )
    return(
        <Layout>
          <Header className="header">
            <div className="logo">
              KMALL 后台管理系统
            </div>
            <Dropdown overlay={menu} trigger={['click']} className="drop-down">
              <a className="ant-dropdown-link" href="#">
                {getUsername()}<Icon type="down" />
              </a>
            </Dropdown>
          </Header>
        </Layout>
      )
  }
}

export default AdminHeader;