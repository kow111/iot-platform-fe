import {
  RobotOutlined,
  UserOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate, useLocation } from "react-router";
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
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  const handleOnClick = (e: any) => {
    {
      navigate(`${e.key}`);
    }
  }
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
        onClick={(e) => handleOnClick(e)}
        selectedKeys={[location.pathname]}
        style={{
          borderRight: 0,
          backgroundColor: "rgb(0, 85, 141)",
        }}
        items={[
          {
            key: "/profile",
            icon: <UserOutlined />,
            label: "Quản lý tài khoản",
          },
          {
            key: "/project",
            icon: <ProjectOutlined />,
            label: "Quản lý dự án"
          },
          {
            key: "/device-type",
            icon: <RobotOutlined />,
            label: "Quản lý loại thiết bị",
          },
        ]}
      />
    </Sider>
  );
};

export default UserSidebar;
