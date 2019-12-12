import { Layout } from 'antd';
import React,{Component} from 'react';
const {  Content } = Layout;
import AdminHeader from 'common/header'
import AdminSider from 'common/sider'

class AdminLayout extends Component{
  render(){
    return(
        <Layout>
            <AdminHeader />
            <Layout>
              <AdminSider />
              <Layout style={{ padding: '0 24px 24px' }}>
                
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                 {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
      )
  }
}

export default AdminLayout;