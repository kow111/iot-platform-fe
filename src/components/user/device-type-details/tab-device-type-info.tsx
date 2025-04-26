import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { IDeviceType, DeviceTypeApi } from "../../../api/device-type.api";
import { toast } from "react-toastify";

interface IProps {
  DeviceType: IDeviceType | null;
  setDeviceType: (DeviceType: IDeviceType | null) => void;
}

const TabInfo = ({ DeviceType, setDeviceType }: IProps) => {
  const [form] = Form.useForm();
  const INIT_DeviceType: IDeviceType = {
    id: DeviceType?.id || "",
    name: DeviceType?.name || "",
  };
  form.setFieldsValue(INIT_DeviceType); // Set initial values for the form

  const [hasUpdate, setHasUpdate] = useState(false);

  const handleChangeFormValue = () => {
    setHasUpdate(true);
  };

  const handleReset = () => {
    form.setFieldsValue(INIT_DeviceType);
    setHasUpdate(false);
  };
  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!values) return;

    setHasUpdate(false);
    try {
      // Simulate an API call to update theDeviceType
      const response = await DeviceTypeApi.updateDeviceType(DeviceType?.id!, values.name);
      console.log(response.data);
      setDeviceType(response.data.data || null);
      form.setFieldsValue(INIT_DeviceType); // Reset form values after successful update
      toast.success("Cập nhật loại thiết bị thành công!");
    } catch (error) {
      console.error("Error updatingDeviceType:", error);
      toast.error("Cập nhật loại thiết bị thất bại!");
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      labelAlign="left"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={handleChangeFormValue} // Lắng nghe mọi thay đổi
      onFinish={handleSubmit} // Lắng nghe sự kiện submit
    >
      <Form.Item label="Tên loại thiết bị" name="name" rules={[{ required: true }]}>
        <Input placeholder="Nhập tên loại thiết bị" />
      </Form.Item>
      {
        hasUpdate && (
          <Space style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
            <Button onClick={handleReset}>
              Hủy bỏ
            </Button>
          </Space>
        )
      }
    </Form>
  );
};

export default TabInfo;
