import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  DiffOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import "video-react/dist/video-react.css";
import { Outlet, useNavigate } from "react-router-dom"
const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('首页', '/', <HomeOutlined />),
  getItem('测试', '/test', <DiffOutlined />),
  getItem('demo', '', <UserOutlined />, [
    getItem('demo1', '/demo1'),
    getItem('demo2', '/demo2'),
    getItem('demo3', '/demo3'),
  ])
];


const App = () => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    console.log(e)
    navigate(e.key)
    setCurrentKey(e.key)
    
    // 递归查找菜单项
    const findMenuItem = (items, key) => {
      for (const item of items) {
        if (item.key === key) {
          return item;
        }
        if (item.children) {
          const found = findMenuItem(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    const clickedItem = findMenuItem(items, e.key);
    if (clickedItem) {
      setCurrentLabel(clickedItem.label);
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