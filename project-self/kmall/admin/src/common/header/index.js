import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React,{Component} from 'react';
const { SubMenu } = Menu;
const { Header } = Layout;
import './index.css'
class AdminHeader extends Component{
  render(){
    return(
        <Layout>
          <Header className="header">
            <div className="logo">
              KMALL 后台管理系统
            </div>
          </Header>
        </Layout>
      )
  }
}

export default AdminHeader;