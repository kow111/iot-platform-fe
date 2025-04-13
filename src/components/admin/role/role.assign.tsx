import { Collapse, CollapseProps, Modal, Spin, Switch } from "antd";
import {
  AssignRoleToPermissionAPI,
  IPermission,
  RemoveRoleFromPermissionAPI,
} from "../../../api/manage.permission.api";
import { IRole } from "../../../api/manage.user.api";
import { useEffect, useState } from "react";

interface IProps {
  show: boolean;
  setShow: (show: boolean) => void;
  dataPermission: IPermission[];
  role: IRole | null;
  setRole: (role: IRole | null) => void;
  fetchDataPermission: () => void;
}

const ModalAssignRole = ({
  show,
  setShow,
  dataPermission,
  role,
  setRole,
  fetchDataPermission,
}: IProps) => {
  const [data, setData] = useState<Record<string, IPermission[]>>({});
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setRole(null);
    setShow(false);
  };

  const handleChange = async (
    checked: boolean,
    permission: IPermission,
    roleName: string
  ) => {
    setLoading(true);

    if (checked) {
      await AssignRoleToPermissionAPI(permission?.name || "", roleName);
    } else {
      await RemoveRoleFromPermissionAPI(permission?.name || "", roleName);
    }

    fetchDataPermission();
    setLoading(false);
  };

  const items: CollapseProps["items"] = Object.entries(data).map(
    ([groupName, permissions], index) => ({
      key: String(index + 1),
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{groupName.toUpperCase()}</span>
        </div>
      ),
      children: (
        <ul style={{ paddingLeft: 20 }}>
          {permissions.map((permission) => (
            <li
              key={permission.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span>
                {permission.name} - {permission.description}
              </span>
              <Switch
                checked={
                  permission.roles.find(
                    (roleItem) => roleItem.name === role?.name
                  )
                    ? true
                    : false
                }
                onChange={(checked) =>
                  handleChange(checked, permission, role?.name || "")
                }
              />
            </li>
          ))}
        </ul>
      ),
    })
  );
  const handleTransformData = () => {
    const grouped = dataPermission.reduce(
      (acc: Record<string, IPermission[]>, item) => {
        const groupName = item.nameGroup;

        if (!acc[groupName]) {
          acc[groupName] = [];
        }

        acc[groupName].push(item);
        return acc;
      },
      {} as Record<string, IPermission[]>
    );
    setData(grouped);
  };

  useEffect(() => {
    handleTransformData();
  }, [show, dataPermission, role]);

  return (
    <Modal
      title="Assign Role"
      open={show}
      onCancel={handleCancel}
      width={"75%"}
      footer={null}
    >
      <Spin tip="Loading..." spinning={loading}>
        <Collapse items={items} />
      </Spin>
    </Modal>
  );
};

export default ModalAssignRole;
