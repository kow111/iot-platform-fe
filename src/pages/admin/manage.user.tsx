import { useEffect, useState } from "react";
import UserTable from "../../components/admin/user/user.table";
import {
  BanUserAPI,
  DeleteUserAPI,
  GetAllUsersAPI,
  IUser,
} from "../../api/manage.user.api";
import { Divider, Popconfirm, Space, TableProps, Tag, Typography } from "antd";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchDataUser = async () => {
    setLoading(true);
    try {
      const response = await GetAllUsersAPI({
        page: pagination.current - 1,
        limit: pagination.pageSize,
      });
      if (response.status === 200) {
        setDataSource(response.data.data?.users || []);
        setPagination({
          ...pagination,
          total: response.data.data?.totalElements || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const confirmBan = async (record: IUser) => {
    try {
      const res = await BanUserAPI(record.id);
      if (res.status === 200) {
        toast.success("Ban user successfully!");
        fetchDataUser();
      }
    } catch (error: any) {
      console.error("Error banning user:", error);
      toast.error("Ban user failed!" + error.response.data.message[0]);
    }
  };

  const confirmDelete = async (record: IUser) => {
    try {
      const res = await DeleteUserAPI(record.id);
      if (res.status === 200) {
        toast.success("Delete user successfully!");
        fetchDataUser();
      }
    } catch (error: any) {
      console.error("Error banning user:", error);
      toast.error("Ban user failed!" + error.response.data.message[0]);
    }
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatarUrl: string) => (
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            objectFit: "scale-down",
          }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return status === "ACTIVE" ? (
          <Tag color="green">{status}</Tag>
        ) : status === "INACTIVE" ? (
          <Tag color="orange">{status}</Tag>
        ) : (
          <Tag color="red">{status}</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            className="ms-3"
            title="Confirm ban?"
            description="This action cannot be undo."
            onConfirm={() => confirmBan(record)}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
            <a
              style={{
                color: "red",
              }}
            >
              Ban
            </a>
          </Popconfirm>
          <Popconfirm
            className="ms-3"
            title="Confirm delete?"
            description="This action cannot be undo."
            onConfirm={() => confirmDelete(record)}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    });
  };

  useEffect(() => {
    fetchDataUser();
  }, [pagination.current, pagination.pageSize]);

  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Manage Users
      </Typography.Title>
      <Divider />
      <UserTable
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </div>
  );
};

export default ManageUser;
