import { useCallback, useEffect, useState } from "react";
import { DeviceApi, IDevice } from "../../../api/device.api";
import { IRoom } from "../../../api/room.api";
import { Button, Divider, Form, Input, Space, Table } from "antd";
import Icon from "@ant-design/icons";
import CreateDeviceModal from "./create-device.modal";

interface IProps {
  room: IRoom | null;
}

const TabDevice = ({ room }: IProps) => {
  const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
  })

  const [dataSource, setDataSource] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(
    async () => {
      setLoading(true);
      try {
        // Simulate an API call to fetch devices for the room
        const response = await DeviceApi.getAllDevices({
            page: pagination.current - 1,
            limit: pagination.pageSize,
            roomId: room?.id,
        })
        setDataSource(response.data.data?.message.devices || []);
        setPagination((prev) => ({
          ...prev,
          total: response.data.data?.message.totalElements || 0,
        }));
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    }, [room, pagination.current, pagination.pageSize]
  );
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReload = async () => {
    // reset pagination to initial state
    setPagination({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    await fetchData();
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setShowModal(true)}
        className="mb-4"
      >
        Thêm thiết bị
      </Button>
      <CreateDeviceModal
        room={room}
        open={showModal}
        setOpen={setShowModal}
        onSuccess={handleReload}
      />
      <Divider />
      <Table
        dataSource={dataSource}
        pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
        }}
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
            title: "Loại thiết bị",
            dataIndex: "device_type_id",
            key: "device_type_id",
            render: (deviceType) => deviceType.name,
          },
          {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button type="link">Sửa</Button>
                <Button type="link" danger>
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