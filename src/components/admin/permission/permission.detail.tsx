import { Descriptions, Drawer } from "antd";
import { IPermission } from "../../../api/manage.permission.api";

interface IPermissionDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  permission: IPermission | null;
  setPermission: (permission: IPermission | null) => void;
}

const PermissionDetail = ({
  open,
  setOpen,
  permission,
  setPermission,
}: IPermissionDetailProps) => {
  return (
    <>
      <Drawer
        title="Permission Detail"
        placement="right"
        onClose={() => {
          setOpen(false);
          setPermission(null);
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
          <Descriptions.Item label="Id">{permission?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{permission?.name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {permission?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Name Group">
            {permission?.nameGroup}
          </Descriptions.Item>
          <Descriptions.Item label="Roles">
            {permission?.roles.map((role) => role.name).join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="URL Pattern">
            {permission?.urlPattern || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default PermissionDetail;
