import { Button, Divider, Form, Input, Popconfirm, Space, Table, Typography } from "antd";
import { IDeviceType, DeviceTypeApi } from "../../api/device-type.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const ManageDeviceType = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<IDeviceType[]>([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm<IDeviceType>();
  const INIT_DeviceType: IDeviceType = {
    id: "",
    name: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate an API call to fetch DeviceTypes
        const response = await DeviceTypeApi.getAllDeviceTypes();
        console.log(response.data);
        setDataSource(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!values) return;
    setLoading(true);
    try {
      // Simulate an API call to create a new DeviceType
      const response = await DeviceTypeApi.createDeviceType(values.name);
      console.log(response.data);
      setDataSource((prev) => [...prev, response.data.data!]);
      toast.success("Thêm loại thiết bị thành công!");
      form.resetFields();
    } catch (error) {
      console.error("Error creating DeviceType:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      // Simulate an API call to delete a DeviceType
      await DeviceTypeApi.deleteDeviceType(id);
      setDataSource((prev) => prev.filter((DeviceType) => DeviceType.id !== id));
      toast.success("Xóa loại thiết bị thành công!");
    } catch (error) {
      // console.error("Error deleting DeviceType:", error);

      const err = error as AxiosError;
      if (err.status === 500) {
        toast.error("Thiết bị đang được sử dụng !");
      }
      else {
        toast.error("Xóa loại thiết bị thất bại !");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Quản lý loại thiết bị
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        initialValues={INIT_DeviceType}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Tên loại thiết bị" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên loại thiết bị" />
        </Form.Item>

        <Form.Item>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Thêm loại thiết bị
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={[
          {
            title: "Tên loại thiết bị",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button
                  type="link"
                  onClick={() => {
                    navigate(`/device-type/${record.id}`);
                  }}
                >
                  Chi tiết
                </Button>
                <Popconfirm
                  title="Xác nhận xóa?"
                  description="Hành động này không thể hoàn tác."
                  onConfirm={() => handleDelete(record.id)}
                  placement="left"
                  okText="Có"
                  cancelText="Không"
                >
                  <Button type="link" danger>
                    Xóa
                  </Button>
                </Popconfirm>
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

export default ManageDeviceType;
