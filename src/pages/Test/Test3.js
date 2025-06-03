import React from 'react';
import { Row, Col, Card, Statistic, Progress, List, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';

const Test3 = () => {
  const recentActivities = [
    {
      title: '张三完成了任务',
      description: '完成了首页设计',
      time: '10分钟前',
    },
    {
      title: '李四提交了代码',
      description: '更新了用户管理模块',
      time: '30分钟前',
    },
    {
      title: '王五创建了新项目',
      description: '创建了测试项目',
      time: '1小时前',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={93}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文档数量"
              value={56}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="团队人数"
              value={12}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="项目进度">
            <Progress percent={30} status="active" />
            <Progress percent={50} status="active" style={{ marginTop: 16 }} />
            <Progress percent={70} status="active" style={{ marginTop: 16 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最近活动">
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.title}
                    description={
                      <>
                        <div>{item.description}</div>
                        <div style={{ color: '#999', fontSize: '12px' }}>{item.time}</div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Test3; 