import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  DiffOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import "video-react/dist/video-react.css";
import { Outlet, useNavigate } from "react-router-dom"
const { Content, Footer, Sider } = Layout;


const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '测试',
    key: '/test',
    icon: <DiffOutlined />,
  },
]

const App = () => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    console.log(e)
    navigate(e.key)
    setCurrentKey(e.key)
    // 从 items 数组中找到对应的菜单项
    const clickedItem = items.find(item => item.key === e.key)
    if (clickedItem) {
      setCurrentLabel(clickedItem.label)
    }
  }


  const [currentLabel, setCurrentLabel] = useState('首页')
  const [currentKey, setCurrentKey] = useState('/')


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleClick} selectedKeys={[currentKey]}/>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              {
                title: <a href="/">Home</a>,
              },
              {
                title: <a href="">{currentLabel}</a>,
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;