import {
  Button,
  Divider,
  Popconfirm,
  Space,
  TableProps,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  DeletePermissionAPI,
  GetAllPermissionsAPI,
  IPermission,
} from "../../api/manage.permission.api";
import PermissionTable from "../../components/admin/permission/permission.table";
import { IRole } from "../../api/manage.user.api";
import { toast } from "react-toastify";

const ManagePermission = () => {
  const [dataSource, setDataSource] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDataPermission = async () => {
    setLoading(true);
    try {
      const response = await GetAllPermissionsAPI();
      setDataSource(response.data.data?.permissions || []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (record: IPermission) => {
    try {
      const res = await DeletePermissionAPI(record.name);
      if (res.status === 200) {
        toast.success("Delete permission successfully!");
        fetchDataPermission();
      }
    } catch (error: any) {
      console.error("Error deleting permission:", error);
      toast.error("Delete permission failed!" + error.response.data.message[0]);
    }
  };

  const columns: TableProps<IPermission>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name Group",
      dataIndex: "nameGroup",
      key: "nameGroup",
    },

    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: IRole[]) => {
        return (
          <>
            {roles.map((role) => {
              let color = role.name === "ADMIN" ? "geekblue" : "green";
              if (role.name === "USER") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={role.id}>
                  {role.name.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Popconfirm
            className="ms-3"
            title="Confirm ban?"
            description="This action cannot be undo."
            // onConfirm={() => confirmBan(record)}
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
          </Popconfirm> */}
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

  useEffect(() => {
    fetchDataPermission();
  }, []);
  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Manage Permissions
      </Typography.Title>
      <Divider />
      <Button type="primary" className="mb-4">
        Add Permission
      </Button>
      <PermissionTable
        dataSource={dataSource}
        loading={loading}
        columns={columns}
      />
    </div>
  );
};

export default ManagePermission;
