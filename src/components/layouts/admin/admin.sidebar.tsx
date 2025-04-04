import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { useNavigate } from "react-router";

import Sider from "antd/es/layout/Sider";

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  borderRight: "1px solid #f0f0f0",
  zIndex: 1,
  paddingTop: 16,
  paddingLeft: 5,
};

interface IProps {
  collapsed: boolean;
  //   handleLogout: () => void;
}

const AdminSidebar = ({ collapsed }: IProps) => {
  const navigate = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  return (
    <Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
    >
      <img
        style={{
          height: "auto",
          maxHeight: 142,
          width: "auto",
          margin: "0 auto",
        }}
        src="https://tracuuxettuyen.hcmute.edu.vn/assets/img/logo/ute_logo.png"
      />
      <Divider />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["/admin"]}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
        items={[
          {
            key: "/admin",
            icon: <DashboardOutlined />,
            label: "DashBoard",
          },
          {
            key: "/admin/manage-user",
            icon: <UserOutlined />,
            label: "User",
          },
        ]}
      />
    </Sider>
  );
};

export default AdminSidebar;
