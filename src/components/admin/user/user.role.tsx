import { Modal, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import {
  ChangeRoleUserAPI,
  IUser,
  roleOptions,
} from "../../../api/manage.user.api";
import { toast } from "react-toastify";

interface IUserRole {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  fetchDataUser: () => void;
}

const UserRoleModal = ({
  show,
  setShow,
  fetchDataUser,
  user,
  setUser,
}: IUserRole) => {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onCancel = () => {
    setUser(null);
    setValue("");
    setShow(false);
  };

  const onOk = () => {
    if (user && value) {
      handleChangeRole(user, value);
    } else {
      toast.error("Please select a role!");
    }
  };

  const handleChangeRole = async (user: IUser, role: string) => {
    setLoading(true);
    try {
      const res = await ChangeRoleUserAPI(user.id, role);
      if (res.status === 200) {
        toast.success("Change role user successfully!");
        fetchDataUser();
        onCancel();
      }
    } catch (error: any) {
      console.error("Error changing role user:", error);
      toast.error("Change role user failed!" + error.response.data.message[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue(user.roles[0].name);
    }
  }, [user]);

  return (
    <Modal
      title="Manage Role"
      open={show}
      onCancel={onCancel}
      onOk={onOk}
      okButtonProps={{ loading: loading, disabled: loading }}
    >
      <Radio.Group onChange={onChange} value={value} options={roleOptions} />
    </Modal>
  );
};

export default UserRoleModal;
