import { Button, Divider, Form, Input, Popconfirm, Space, Table, Typography } from "antd";
import { IProject, ProjectApi } from "../../api/project.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ManageProject = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm<IProject>();
  const INIT_PROJECT: IProject = {
    id: "",
    name: "",
    description: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate an API call to fetch projects
        const response = await ProjectApi.getAllProjects();
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
      // Simulate an API call to create a new project
      const response = await ProjectApi.createProject(values);
      console.log(response.data);
      setDataSource((prev) => [...prev, response.data.data!]);
      toast.success("Thêm dự án thành công!");
      form.resetFields();
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      // Simulate an API call to delete a project
      await ProjectApi.deleteProject(id);
      setDataSource((prev) => prev.filter((project) => project.id !== id));
      toast.success("Xóa dự án thành công!");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Quản lý dự án
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        initialValues={INIT_PROJECT}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Tên dự án" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên dự án" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Thêm dự án
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={[
          {
            title: "Tên dự án",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button
                  type="link"
                  onClick={() => {
                    navigate(`/project/${record.id}`);
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

export default ManageProject;
