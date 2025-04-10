import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { ICreateProject } from "../../../api/project.api";

const TabInfo = () => {
  const [form] = Form.useForm();
  const INIT_PROJECT: ICreateProject = {
    name: "",
    description: "",
  };
  const [hasUpdate, setHasUpdate] = useState(false);

  const handleChangeFormValue = () => {
    setHasUpdate(true);
  };

  const handleReset = () => {
    form.setFieldsValue(INIT_PROJECT);
    setHasUpdate(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      labelAlign="left"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={handleChangeFormValue} // Lắng nghe mọi thay đổi
    >
      <Form.Item label="Tên dự án" name="name" rules={[{ required: true }]}>
        <Input placeholder="Nhập tên dự án" />
      </Form.Item>
      <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
        <Input placeholder="Nhập mô tả" />
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
