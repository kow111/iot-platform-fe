import { Button, Divider, Form, Input, Space, Table, Typography } from "antd";
import { IProject } from "../../api/project.api";
import { useState } from "react";

const mockData: IProject[] = [
  {
    id: "1",
    name: "Project 1",
    description: "Description for Project 1",
  },
  {
    id: "2",
    name: "Project 2",
    description: "Description for Project 2",
  },
  {
    id: "3",
    name: "Project 3",
    description: "Description for Project 3",
  },
];

const ManageProject = () => {
  const [dataSource, setDataSource] = useState<IProject[]>(mockData);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Quản lý dự án
      </Typography.Title>
      <Divider />
      <Form
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Tên dự án" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên dự án" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm dự án
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={[
          {
            title: "Tên dự án",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button 
                  type="link"
                  onClick={() => {
                    // Handle edit project
                  }}
                >
                  Chi tiết
                </Button>
                <Button type="link" danger>
                  Xóa
                </Button>
              </Space>
            ),
          },
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 15, 20],
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
      ></Table>
    </div>
  );
};

export default ManageProject;
