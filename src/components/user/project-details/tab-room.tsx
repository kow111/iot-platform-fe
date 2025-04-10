import { Button, Divider, Form, Input, Space, Table } from "antd";
import { useState } from "react";
import { IRoom } from "../../../api/room.api";

const mockData: IRoom[] = [
  {
    id: "1",
    name: "Project 1",
    position: 1
  },
  {
    id: "2",
    name: "Project 2",
    position: 2
  },
  {
    id: "3",
    name: "Project 3",
    position: 3
  },
];

const TabRoom = () => {
  const [dataSource, setDataSource] = useState<IRoom[]>(mockData);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Form
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Tên phòng" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nhập phòng" />
        </Form.Item>
        <Form.Item
          label="Vị trí"
          name="position"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Nhập vị trí" />
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
            title: "Tên phòng",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Vị trí",
            dataIndex: "position",
            key: "position",
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
}

export default TabRoom;