import { Button, Divider, Form, Input, Popconfirm, Space, Table, Typography, Modal } from "antd";
import { IDeviceType, DeviceTypeApi } from "../../api/device-type.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const ManageDeviceType = () => {
  const [dataSource, setDataSource] = useState<IDeviceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<IDeviceType | null>(null);

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
      if (currentDevice) {
        // Update existing device type
        const response = await DeviceTypeApi.updateDeviceType(currentDevice.id, values.name);
        setDataSource((prev) =>
          prev.map((device) => (device.id === currentDevice.id ? response.data.data! : device))
        );
        toast.success("Cập nhật thiết bị thành công!");
      } else {
        // Create new device type
        const response = await DeviceTypeApi.createDeviceType(values.name);
        setDataSource((prev) => [...prev, response.data.data!]);
        toast.success("Thêm thiết bị thành công!");
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting DeviceType:", error);

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
      toast.success("Xóa thiết bị thành công !");
    } catch (error) {
      // console.error("Error deleting DeviceType:", error);
      const err = error as AxiosError;
      if (err.status == 500) {
        toast.error("Thiết bị đang được sử dụng, không thể xóa !");
      }
      else {
        toast.error("Xóa thiết bị không thành công");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (device: IDeviceType) => {
    setCurrentDevice(device);
    form.setFieldsValue({ name: device.name });
    setIsModalVisible(true);
  };

  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Quản lý loại thiết bị
      </Typography.Title>
      <Divider />
      <Button onClick={() => setIsModalVisible(true)} type="primary" className="mb-4">
        Thêm thiết bị
      </Button>
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
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button type="link" onClick={() => handleEdit(record)}>
                  Sửa
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

      {/* Modal for adding/editing device type */}
      <Modal
        title={currentDevice ? "Chỉnh sửa thiết bị" : "Thêm thiết bị"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
      >
        <Form
          form={form}
          initialValues={INIT_DeviceType}
          layout="vertical"
        >
          <Form.Item label="Tên thiết bị" name="name" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên thiết bị" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageDeviceType;
