import { Descriptions, Drawer } from "antd";
import { IUser } from "../../../api/manage.user.api";

interface IUserDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const UserDetail = ({ open, setOpen, user, setUser }: IUserDetailProps) => {
  return (
    <>
      <Drawer
        title="User Detail"
        placement="right"
        onClose={() => {
          setOpen(false);
          setUser(null);
        }}
        open={open}
        width={"50%"}
      >
        <Descriptions
          bordered
          column={1}
          labelStyle={{ fontWeight: "bold" }}
          contentStyle={{ fontSize: 16 }}
        >
          <Descriptions.Item label="Id">{user?.id}</Descriptions.Item>
          <Descriptions.Item label="Username">
            {user?.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Display Name">
            {user?.displayName}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {user?.roles.map((role) => role.name).join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {user?.status === "ACTIVE" ? (
              <span style={{ color: "green" }}>{user?.status}</span>
            ) : user?.status === "INACTIVE" ? (
              <span style={{ color: "orange" }}>{user?.status}</span>
            ) : (
              <span style={{ color: "red" }}>{user?.status}</span>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Avatar">
            <img
              src={user?.avatarUrl}
              alt="Avatar"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "scale-down",
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {user?.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {user?.updatedAt
              ? new Date(user.updatedAt).toLocaleString()
              : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserDetail;
