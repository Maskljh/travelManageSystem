import React, { useState } from 'react';
import { Table, Card, Tag, Space, Button } from 'antd';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Test2 = () => {
  const [data] = useState([
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      tags: ['开发', '前端'],
    },
    {
      key: '2',
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
      tags: ['设计', 'UI'],
    },
    {
      key: '3',
      name: '王五',
      age: 28,
      address: '广州市天河区',
      tags: ['测试', '后端'],
    },
  ]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log(record)
  }

  return (
    <div>
      <Card title="表格示例">
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>


  );
};

export default Test2; 