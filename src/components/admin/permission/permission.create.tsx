import { Checkbox, Form, FormProps, Input, Modal } from "antd";
import {
  CreatePermissionAPI,
  ICreatePermission,
} from "../../../api/manage.permission.api";
import { roleOptions } from "../../../api/manage.user.api";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchDataPermission: () => void;
}

const CreatePermissionModal = ({
  open,
  setOpen,
  fetchDataPermission,
}: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish: FormProps<ICreatePermission>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const res = await CreatePermissionAPI(values);
      if (res.status === 200) {
        toast.success("Create permission successfully!");
        fetchDataPermission();
        handleCancel();
      }
    } catch (error: any) {
      console.error("Error creating permission:", error);
      toast.error("Create permission failed!" + error.response.data.message[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Permission"
      open={open}
      onOk={form.submit}
      onCancel={handleCancel}
      width={"50%"}
      okButtonProps={{ loading: loading, disabled: loading }}
    >
      <Form
        name="layout-multiple-horizontal"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ roles: ["ADMIN"] }}
      >
        <Form.Item<ICreatePermission>
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Permission Name" />
        </Form.Item>
        <Form.Item<ICreatePermission> label="Name Group" name="nameGroup">
          <Input placeholder="Permission Name Group" />
        </Form.Item>
        <Form.Item<ICreatePermission> label="Description" name="description">
          <Input placeholder="Permission Description" />
        </Form.Item>
        <Form.Item<ICreatePermission> label="Roles" name="roleNames">
          <Checkbox.Group options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePermissionModal;
