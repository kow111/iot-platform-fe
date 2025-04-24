import { useState } from "react";
import { IDevice } from "../../../api/device.api";
import { IRoom } from "../../../api/room.api";
import { Button, Divider, Form, Input, Space, Table } from "antd";

interface IProps {
  room: IRoom | null;
}

const TabDevice = ({ room }: IProps) => {
  const [dataSource, setDataSource] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={[
          {
            title: "Tên thiết bị",
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
            render: (_, record) => (
              <Space size="middle">
                <Button type="primary">Sửa</Button>
                <Button type="primary" danger>
                  Xóa
                </Button>
              </Space>
            ),
          },
        ]}
        rowKey={(record) => record.id}
      />
    </div>
  )
};

export default TabDevice;