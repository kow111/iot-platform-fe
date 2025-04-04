import { useEffect, useState } from "react";
import UserTable from "../../components/admin/user/user.table";
import { GetAllUsersAPI, IUser } from "../../api/manage.user.api";
import { Space, TableProps } from "antd";

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
      // dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            style={{
              color: "red",
            }}
          >
            Ban
          </a>
          <a>Delete</a>
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
      <h1>Manage User</h1>
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
