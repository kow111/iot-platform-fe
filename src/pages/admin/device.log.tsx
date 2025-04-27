import { useEffect, useState } from "react";
import { GetDeviceLogAPI, ILog } from "../../api/log.api";
import { Button, Divider, Space, TableProps, Typography } from "antd";
import LogTable from "../../components/admin/log/log.table";
import { IDevice } from "../../api/device.api";
import { IDeviceAttribute } from "../../api/device-attribute.api";
import LogDetail from "../../components/admin/log/log.detail";

const DeviceLog = () => {
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => {
        return <>{new Date(createdAt).toLocaleString()}</>;
      },
    },
    {
      title: "Action type",
      dataIndex: "actionType",
      key: "actionType",
    },
    {
      title: "Device",
      dataIndex: "deviceId",
      key: "deviceId",
      render: (deviceId: IDevice) => {
        return <>{deviceId.name}</>;
      },
    },
    {
      title: "Changed attribute",
      dataIndex: "changedAttribute",
      key: "changedAttribute",
      render: (deviceId: IDeviceAttribute) => {
        return <>{deviceId.name}</>;
      },
    },
    {
      title: "Old value",
      dataIndex: "oldValue",
      key: "oldValue",
    },
    {
      title: "New value",
      dataIndex: "newValue",
      key: "newValue",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleShowDetailClick(record)}>Detail</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchDataDeviceLog();
  }, [pagination.current, pagination.pageSize]);

  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Device Log
      </Typography.Title>
      <Button type="primary" onClick={fetchDataDeviceLog} loading={loading}>
        Reload
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
    </div>
  );
};

export default DeviceLog;
