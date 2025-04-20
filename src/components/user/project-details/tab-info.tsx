import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { ICreateProject, IProject, ProjectApi } from "../../../api/project.api";
import { toast } from "react-toastify";

interface IProps {
  project: IProject | null;
  setProject: (project: IProject | null) => void;
}

const TabInfo = ({project, setProject}: IProps) => {
  const [form] = Form.useForm();
  const INIT_PROJECT: IProject = {
    id: project?.id || "",
    name: project?.name || "",
    description: project?.description || "",
  };
  form.setFieldsValue(INIT_PROJECT); // Set initial values for the form

  const [hasUpdate, setHasUpdate] = useState(false);

  const handleChangeFormValue = () => {
    setHasUpdate(true);
  };

  const handleReset = () => {
    form.setFieldsValue(INIT_PROJECT);
    setHasUpdate(false);
  };
  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!values) return;
    const data: ICreateProject = {
      name: values.name,
      description: values.description,
    };
    setHasUpdate(false);
    try {
      // Simulate an API call to update the project
      const response = await ProjectApi.updateProject(project?.id!, data);
      console.log(response.data);
      setProject(response.data.data || null);
      form.setFieldsValue(INIT_PROJECT); // Reset form values after successful update
      toast.success("Cập nhật dự án thành công!");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Cập nhật dự án thất bại!");
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      labelAlign="left"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={handleChangeFormValue} // Lắng nghe mọi thay đổi
      onFinish={handleSubmit} // Lắng nghe sự kiện submit
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
