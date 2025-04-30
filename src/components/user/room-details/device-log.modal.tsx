import { useEffect, useState } from "react";
import { GetDeviceLogAPI, ILog } from "../../../api/log.api";
import { Button, Divider, Space, TableProps, Typography, Modal } from "antd";
import LogTable from "../../../components/admin/log/log.table";
import { IDevice } from "../../../api/device.api";
import { IDeviceAttribute } from "../../../api/device-attribute.api";
import LogDetail from "../../../components/admin/log/log.detail";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  device?: IDevice | null;
}


const DeviceLogModal = (
  { open, setOpen, device }: IProps
) => {
  const [dataSource, setDataSource] = useState<ILog[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [log, setLog] = useState<ILog | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchDataDeviceLog = async () => {
    setLoading(true);
    try {
      const response = await GetDeviceLogAPI({
        deviceId: device?.id,
        page: pagination.current - 1,
        size: pagination.pageSize,
      });
      if (response.status === 200) {
        setDataSource(response.data.data?.message.logs || []);
        setPagination({
          ...pagination,
          total: response.data.data?.message.totalElements || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchDataDeviceLog();
    }
  }, [open]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    });
  };

  const handleShowDetailClick = (record: ILog) => {
    setShowDetail(true);
    setLog(record);
  };

  const columns: TableProps<ILog>["columns"] = [
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => {
        return <>{new Date(createdAt).toLocaleString()}</>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "actionType",
      key: "actionType",
    },
    {
      title: "Tên Thiết bị",
      dataIndex: "deviceId",
      key: "deviceId",
      render: (deviceId: IDevice) => {
        return <>{deviceId.name}</>;
      },
    },
    {
      title: "Thuộc tính",
      dataIndex: "changedAttribute",
      key: "changedAttribute",
      render: (deviceId: IDeviceAttribute) => {
        return <>{deviceId.name}</>;
      },
    },
    {
      title: "Giá trị cũ",
      dataIndex: "oldValue",
      key: "oldValue",
    },
    {
      title: "Giá trị mới",
      dataIndex: "newValue",
      key: "newValue",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleShowDetailClick(record)}>Chi tiết</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchDataDeviceLog();
  }, [pagination.current, pagination.pageSize]);

  return (
    <Modal
      title="Log Detail"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width="80%"
    >
      <Button type="primary" onClick={fetchDataDeviceLog} loading={loading}>
        Tải lại
      </Button>
      <Divider />
      <LogTable
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
      <LogDetail
        open={showDetail}
        setOpen={setShowDetail}
        log={log}
        setLog={setLog}
      />
    </Modal>
  );
};

export default DeviceLogModal;
