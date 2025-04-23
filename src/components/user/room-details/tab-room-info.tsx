import { Button, Form, Input, Space } from "antd";
import { useCallback, useState } from "react";
import { ICreateProject, IProject, ProjectApi } from "../../../api/project.api";
import { toast } from "react-toastify";
import { ICreateRoom, IRoom, RoomApi } from "../../../api/room.api";

interface IProps {
  room: IRoom | null;
  setRoom: (room: IRoom | null) => void;
}

const TabRoomInfo = ({ room, setRoom }: IProps) => {
  const [form] = Form.useForm();
  const INIT_ROOM: ICreateRoom = {
    name: room?.name || "",
    position: room?.position || 0,
  };
  form.setFieldsValue(INIT_ROOM); // Set initial values for the form

  const [hasUpdate, setHasUpdate] = useState(false);

  const handleChangeFormValue = () => {
    setHasUpdate(true);
  };

  const handleReset = () => {
    form.setFieldsValue(INIT_ROOM);
    setHasUpdate(false);
  };
  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields();
    if (!values) return;
    const data: ICreateRoom = {
      name: values.name,
      position: Number(values.position),
    };
    setHasUpdate(false);
    try {
      // Simulate an API call to update the project
      const response = await RoomApi.updateRoom(room?.id!, data);
      console.log(response.data);
      setRoom({
        ...room,
        name: data.name,
        position: data.position,
      } as IRoom); // Update the room state with the new data
      form.setFieldsValue(INIT_ROOM); // Reset form values after successful update
      toast.success("Cập nhật phòng thành công!");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Cập nhật phòng thất bại!");
    }
  }, [room]);

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
      <Form.Item label="Vị trí" name="position" rules={[{ required: true }]}>
        <Input type="number" placeholder="Nhập vị trí" />
      </Form.Item>
      {hasUpdate && (
        <Space style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
          <Button onClick={handleReset}>Hủy bỏ</Button>
        </Space>
      )}
    </Form>
  );
};

export default TabRoomInfo;
