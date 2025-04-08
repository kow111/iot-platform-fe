import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  AssignRoleToPermissionAPI,
  IPermission,
  RemoveRoleFromPermissionAPI,
} from "../../../api/manage.permission.api";
import { roleOptions } from "../../../api/manage.user.api";
import { toast } from "react-toastify";

interface IAssignPermissionModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  permission: IPermission | null;
  setPermission: (permission: IPermission | null) => void;
  fetchDataPermission: () => void;
}

const AssignPermissionModal = ({
  show,
  setShow,
  permission,
  setPermission,
  fetchDataPermission,
}: IAssignPermissionModalProps) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setPermission(null);
    setShow(false);
  };

  const handleChange = (checkedValues: string[]) => {
    setSelectedRoles(checkedValues);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const rolesToAdd = selectedRoles.filter(
        (role) => !currentRole.includes(role)
      );
      const rolesToRemove = currentRole.filter(
        (role) => !selectedRoles.includes(role)
      );

      for (const role of rolesToAdd) {
        await AssignRoleToPermissionAPI(permission?.name || "", role);
      }
      for (const role of rolesToRemove) {
        await RemoveRoleFromPermissionAPI(permission?.name || "", role);
      }
      toast.success("Assign roles successfully!");
      fetchDataPermission();
      handleCancel();
    } catch (error: any) {
      console.error("Error assigning roles:", error);
      toast.error("Assign roles failed!" + error.response.data.message[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission) {
      const roles = permission.roles.map((role) => role.name);
      setSelectedRoles(roles);
      setCurrentRole(roles);
    }
  }, [permission]);

  return (
    <Modal
      title="Assign Permission"
      open={show}
      onCancel={handleCancel}
      onOk={handleOk}
      okButtonProps={{ loading: loading, disabled: selectedRoles.length === 0 }}
      width={"50%"}
    >
      <Checkbox.Group
        options={roleOptions}
        value={selectedRoles}
        onChange={handleChange}
      />
    </Modal>
  );
};

export default AssignPermissionModal;
