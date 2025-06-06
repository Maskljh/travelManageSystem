import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Space, Table, Tag, Button, Modal, message, Popconfirm, Form, Image, Avatar, Carousel, Input } from 'antd';
import axios from 'axios';
import './App.css'
import "../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];


const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => {

  const handleAccess = async () => {
    console.log(currentTravel)
    const res = await axios.put(`http://localhost:5000/api/travelogues/${currentTravel.id}/status`, {
      status: 1,
      reason: ''
    })
    setIsModalOpen(false)
    getTravelList()
  }

  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleReject = () => {
    setRejectModalVisible(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      message.error('请填写拒绝理由');
      return;
    }
    const res = await axios.put(`http://localhost:5000/api/travelogues/${currentTravel.id}/status`, {
      status: 2,
      reason: rejectReason
    });
    setRejectModalVisible(false);
    setRejectReason('');
    setIsModalOpen(false);
    getTravelList();
  };

  const handleRejectCancel = () => {
    setRejectModalVisible(false);
    setRejectReason('');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '照片',
      dataIndex: 'imglist',
      key: 'imglist',
      render: (_, { imglist }) => (
        <>
          <Image
            width={200}
            src={imglist[0]}
          />
        </>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'tile',
    },
    {
      title: '发表时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          {status === 0 && <Tag color="processing" icon={<SyncOutlined spin />}>待审核</Tag>}
          {status === 1 && <Tag color="success" icon={<CheckCircleOutlined />}>审核通过</Tag>}
          {status === 2 && <Tag color="error" icon={<CloseCircleOutlined />}>审核失败</Tag>}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetail(record)} >查看</Button>
          <Popconfirm
            title="删除这个游记"
            description="你确定删除这个游记吗?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  function showDetail(record) {
    console.log(record)
    setCurrentTravel(record)
    showModal()
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };


  async function getTravelList() {
    const res = await axios.get('http://localhost:5000/api/travelogues')
    console.log(res)
    setTravelList(res.data)
  }

  const confirm = async (record) => {
    console.log('要删除的游记:', record);
    const res = await axios.put(`http://localhost:5000/api/travelogues/${record.id}/delete`)
    console.log(res)
    getTravelList()
    message.success('删除成功');
  };
  const cancel = e => {
    console.log(e);
    message.error('已取消删除');
  };

  const [travelList, setTravelList] = useState([])

  const [currentTravel, setCurrentTravel] = useState([])

  useEffect(() => {
    getTravelList()
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Table columns={columns} dataSource={travelList} rowKey="id" />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <Modal
        title="审核游记"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="access" onClick={handleAccess}>
            通过
          </Button>,
          <Button key="reject" onClick={handleReject}>
            拒绝
          </Button>
        ]}
      >
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <Avatar src={currentTravel.avatar} size={64} />
          </Form.Item>
          <Form.Item
            label="用户昵称"
            name="author"
          >
            <p>{currentTravel.author}</p>
          </Form.Item>
          <Form.Item
            label="游记标题"
            name="title"
          >
            <p>{currentTravel.title}</p>
          </Form.Item>
          <Form.Item
            label="游记描述"
            name="desc"
          >
            <p>{currentTravel.desc}</p>
          </Form.Item>
          <Form.Item
            label="上传图片"
            name="imglist"
          >
            <Carousel autoplay arrows >
              {currentTravel?.imglist?.map((item) => (
                <Image
                  width="100%"
                  height={200}
                  style={{ objectFit: 'contain' }}
                  src={item}
                />
              ))}
            </Carousel>
          </Form.Item>
          <Form.Item
            label="上传视频"
            name="video"
          >
            <Player
              playsInline
              src={currentTravel.video}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="填写拒绝理由"
        open={rejectModalVisible}
        onOk={handleRejectConfirm}
        onCancel={handleRejectCancel}
      >
        <Form.Item
          label="拒绝理由"
          required
        >
          <Input.TextArea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="请输入拒绝理由"
            rows={4}
          />
        </Form.Item>
      </Modal>
    </Layout>

  );
};
export default App;