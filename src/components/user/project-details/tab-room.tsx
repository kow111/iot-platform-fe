import { Button, Divider, Form, Input, Space, Table } from "antd";
import { use, useEffect, useState } from "react";
import { ICreateRoom, IRoom, RoomApi } from "../../../api/room.api";
import { IProject } from "../../../api/project.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface IProps {
  project: IProject | null;
}

const TabRoom = ({ project } : IProps) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // không dùng phân trang
        const response = await RoomApi.getAllRooms({ page: 0, limit: 1000 });
        const rooms = response.data.data?.message.rooms.filter(
          // không có api lấy room theo project
          // nên tạm thời dùng filter để lấy ra danh sách phòng của dự án
          (room: IRoom) => room.project.id === project?.id
        ) || [];
        setDataSource(rooms);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project]);

  const [form] = Form.useForm<ICreateRoom>();
  const INIT_ROOM: ICreateRoom = {
    name: "",
    position: 0
  };
  form.setFieldsValue(INIT_ROOM); // Set initial values for the form

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
    if (!values) return;
    setLoading(true);
    try {
      const data: ICreateRoom = {
        name: values.name,
        position: values.position,
        project_id: project?.id, // Gán id dự án vào phòng
      };
      const response = await RoomApi.createRoom(data);
      setDataSource((prev) => [...prev, response.data.data!]);
      form.resetFields();
      toast.success("Thêm phòng thành công!");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Thêm phòng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Tên phòng" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nhập phòng" />
        </Form.Item>
        <Form.Item
          label="Vị trí"
          name="position"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Nhập vị trí" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm phòng
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={[
          {
            title: "Tên phòng",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Vị trí",
            dataIndex: "position",
            key: "position",
          },
          {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button 
                  type="link"
                  onClick={() => {
                    // Handle edit project
                    navigate(`/room/${record.id}`, {
                      state: { room: record, project: project },
                    });
                  }}
                >
                  Chi tiết
                </Button>
                <Button onClick={async (e) => {
                  e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
                  setLoading(true);
                  try {
                    await RoomApi.deleteRoom(record.id);
                    setDataSource((prev) => prev.filter((room) => room.id !== record.id));
                    toast.success("Xóa phòng thành công!");
                  } catch (error) {
                    console.error("Error deleting room:", error);
                    toast.error("Xóa phòng thất bại!");
                  } finally {
                    setLoading(false);
                  }
                }} type="link" danger>
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
      ></Table>
    </div>
  );
}

export default TabRoom;