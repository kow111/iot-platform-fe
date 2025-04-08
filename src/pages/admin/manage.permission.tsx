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
import CreatePermissionModal from "../../components/admin/permission/permission.create";
import AssignPermissionModal from "../../components/admin/permission/permission.assign";
import PermissionDetail from "../../components/admin/permission/permission.detail";

const ManagePermission = () => {
  const [dataSource, setDataSource] = useState<IPermission[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [permission, setPermission] = useState<IPermission | null>(null);
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

  const handleAssignPermission = (record: IPermission) => {
    setPermission(record);
    setOpenAssignModal(true);
  };

  const handleShowDetailClick = (record: IPermission) => {
    setShowDetail(true);
    setPermission(record);
  };

  const columns: TableProps<IPermission>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return <a onClick={() => handleShowDetailClick(record)}>{id}</a>;
      },
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
          <a onClick={() => handleAssignPermission(record)}>
            Assign Permission
          </a>
          <Popconfirm
            title="Confirm delete?"
            description="This action cannot be undo."
            onConfirm={() => confirmDelete(record)}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
            <a
              style={{
                color: "red",
              }}
            >
              Delete
            </a>
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
      <Button
        type="primary"
        className="mb-4"
        onClick={() => setOpenModal(true)}
      >
        Add Permission
      </Button>
      <PermissionTable
        dataSource={dataSource}
        loading={loading}
        columns={columns}
      />
      <CreatePermissionModal
        open={openModal}
        setOpen={setOpenModal}
        fetchDataPermission={fetchDataPermission}
      />
      <AssignPermissionModal
        show={openAssignModal}
        setShow={setOpenAssignModal}
        permission={permission}
        setPermission={setPermission}
        fetchDataPermission={fetchDataPermission}
      />
      <PermissionDetail
        open={showDetail}
        setOpen={setShowDetail}
        permission={permission}
        setPermission={setPermission}
      />
    </div>
  );
};

export default ManagePermission;
