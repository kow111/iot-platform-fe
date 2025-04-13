import { Divider, TableProps, Typography } from "antd";
import RoleTable from "../../components/admin/role/role.table";
import { IRole } from "../../api/manage.user.api";
import { useEffect, useState } from "react";
import {
  GetAllPermissionsAPI,
  IPermission,
} from "../../api/manage.permission.api";
import ModalAssignRole from "../../components/admin/role/role.assign";

const ManageRole = () => {
  const [dataSourcePermission, setDataSourcePermission] = useState<
    IPermission[]
  >([]);
  const [showEditRole, setShowEditRole] = useState(false);
  const [role, setRole] = useState<IRole | null>(null);

  const handleEditClick = (record: IRole) => {
    setRole(record);
    setShowEditRole(true);
  };

  const columns: TableProps<IRole>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <a onClick={() => handleEditClick(record)}>Edit</a>
        </span>
      ),
    },
  ];

  const fetchDataPermission = async () => {
    try {
      const response = await GetAllPermissionsAPI();
      setDataSourcePermission(response.data.data?.permissions || []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  useEffect(() => {
    fetchDataPermission();
  }, []);

  return (
    <>
      <Typography.Title level={3} className="mb-4">
        Manage Roles
      </Typography.Title>
      <Divider />
      <RoleTable columns={columns} />
      <ModalAssignRole
        show={showEditRole}
        setShow={setShowEditRole}
        dataPermission={dataSourcePermission}
        role={role}
        setRole={setRole}
        fetchDataPermission={fetchDataPermission}
      />
    </>
  );
};

export default ManageRole;
