import { Checkbox, Form, FormProps, Input, Modal } from "antd";
import { ICreatePermission } from "../../../api/manage.permission.api";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const options = [
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
  { label: "Manager", value: "MANAGER" },
];

const CreatePermissionModal = ({ open, setOpen }: IProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish: FormProps<ICreatePermission>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Modal
      title="Create Permission"
      open={open}
      onOk={form.submit}
      onCancel={handleCancel}
      width={"50%"}
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
        <Form.Item<ICreatePermission> label="Description" name="description">
          <Input placeholder="Permission Description" />
        </Form.Item>
        <Form.Item<ICreatePermission> label="Roles" name="roles">
          <Checkbox.Group options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePermissionModal;
