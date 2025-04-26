import { Button, Divider, Form, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { ICreateDeviceAttribute, IDeviceAttribute, DeviceAttributeApi } from "../../../api/device-attribute.api";
import { IDeviceType } from "../../../api/device-type.api";
import { toast } from "react-toastify";

interface IProps {
  deviceType: IDeviceType | null;
}

const TabDeviceAttribute = ({ deviceType }: IProps) => {
  const [dataSource, setDataSource] = useState<IDeviceAttribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<IDeviceAttribute | null>(null);
  const [form] = Form.useForm<ICreateDeviceAttribute>();

  const fetchData = async () => {
    if (!deviceType?.id) return;
    setLoading(true);
    try {
      const response = await DeviceAttributeApi.getAllDeviceAttributes(deviceType.id);
      setDataSource(response?.data?.data?.message?.attributes || []);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    form.resetFields();
    setEditingAttribute(null);
  }, [deviceType]);

  const INIT_DeviceAttribute: ICreateDeviceAttribute = {
    name: "",
    unit: "",
    deviceTypeId: deviceType?.id || "",
  };

  useEffect(() => {
    form.setFieldsValue(INIT_DeviceAttribute);
  }, [deviceType]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!values) return;
    setLoading(true);
    try {
      const data: ICreateDeviceAttribute = {
        name: values.name,
        unit: values.unit,
        deviceTypeId: deviceType?.id || "",
      };
      if (editingAttribute) {
        // Update
        await DeviceAttributeApi.updateDeviceAttribute(editingAttribute.id, data);
        toast.success("Cập nhật thuộc tính thiết bị thành công!");
      } else {
        // Create
        await DeviceAttributeApi.createDeviceAttribute(data);
        toast.success("Thêm thuộc tính thiết bị thành công!");
      }
      fetchData();
      form.resetFields();
      setEditingAttribute(null);
    } catch (error) {
      console.error("Error submitting DeviceAttribute:", error);
      toast.error("Thao tác thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingAttribute(null);
    form.resetFields();
    form.setFieldsValue(INIT_DeviceAttribute);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Tên thuộc tính thiết bị" name="name" rules={[{ required: true, message: "Vui lòng nhập tên thuộc tính!" }]}>
          <Input placeholder="Nhập tên thuộc tính thiết bị" />
        </Form.Item>

        <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Vui lòng nhập unit!" }]}
        >
          <Input placeholder="Nhập giá trị unit" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3, span: 14 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingAttribute ? "Cập nhật thuộc tính" : "Thêm thuộc tính thiết bị"}
            </Button>
            {editingAttribute && (
              <Button onClick={handleCancelEdit}>
                Huỷ sửa
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>

      <Divider />

      <Table
        rowKey="id"
        dataSource={dataSource}
        loading={loading}
        columns={[
          {
            title: "Tên thuộc tính",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
          },
          {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  type="link"
                  onClick={() => {
                    setEditingAttribute(record);
                    form.setFieldsValue({
                      name: record.name,
                      unit: record.unit,
                    });
                  }}
                >
                  Sửa
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={async (e) => {
                    e.stopPropagation();
                    setLoading(true);
                    try {
                      await DeviceAttributeApi.deleteDeviceAttribute(record.id);
                      setDataSource((prev) => prev.filter((item) => item.id !== record.id));
                      toast.success("Xóa thuộc tính thiết bị thành công!");
                    } catch (error) {
                      console.error("Error deleting DeviceAttribute:", error);
                      toast.error("Xóa thuộc tính thiết bị thất bại!");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
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
      />
    </div>
  );
};

export default TabDeviceAttribute;
