import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import "./user.sidebar.css";

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  zIndex: 1,
  paddingTop: 16,
  backgroundColor: "rgb(0, 85, 141)",
};
const UserSidebar = () => {
  return (
    <Sider style={siderStyle} trigger={null} width={280}>
      <div>
        <img
          style={{
            height: 142,
            width: "auto",
            margin: "0 auto",
          }}
          src="https://tracuuxettuyen.hcmute.edu.vn/assets/img/logo/ute_logo.png"
        />
      </div>
      <Divider
        style={{
          backgroundColor: "rgba(145, 158, 171, 0.718)",
        }}
      />
      <Menu
        className="custom-menu"
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        style={{
          borderRight: 0,
          backgroundColor: "rgb(0, 85, 141)",
        }}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
};

export default UserSidebar;
