import React, { useState, useEffect } from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Space, Table, Tag, Button, Modal, message, Popconfirm, Form, Image, Avatar, Carousel, Input, theme, FloatButton, Radio } from 'antd';
import axios from 'axios';
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import { NavLink, Outlet } from "react-router-dom"

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginForm] = Form.useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredTravelList, setFilteredTravelList] = useState([]);

  // Check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/status', {
        withCredentials: true
      });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsLoginModalOpen(true);
      }
    } catch (error) {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', values, {
        withCredentials: true
      });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        setIsLoginModalOpen(false);
        message.success('登录成功');
      }
    } catch (error) {
      message.error('用户名或密码错误');
    }
  };

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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Update filtered list when travelList or statusFilter changes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredTravelList(travelList);
    } else {
      const filtered = travelList.filter(item => item.status === parseInt(statusFilter));
      setFilteredTravelList(filtered);
    }
  }, [travelList, statusFilter]);

  return (
    <>
      {!isAuthenticated && (
        <Modal
          title="管理员登录"
          open={isLoginModalOpen}
          footer={null}
          closable={false}
          maskClosable={false}
        >
          <Form
            form={loginForm}
            onFinish={handleLogin}
            layout="vertical"
          >
            <Form.Item
              name="adminname"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {isAuthenticated && (
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <Radio.Group 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="0">待审核</Radio.Button>
              <Radio.Button value="1">审核通过</Radio.Button>
              <Radio.Button value="2">审核失败</Radio.Button>
            </Radio.Group>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredTravelList} 
            rowKey="id" 
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`
            }}
          />
          <FloatButton.BackTop />
        </div>
      )}

      <Modal
        title="审核游记"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="access" type="primary"  onClick={handleAccess}>
            通过
          </Button>,
          <Button key="reject" type="primary" danger onClick={handleReject}>
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
    </>
  );
};
export default App;