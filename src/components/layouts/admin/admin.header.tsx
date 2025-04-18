import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, useNavigate } from "react-router";

interface UserHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AdminHeader = ({ collapsed, setCollapsed }: UserHeaderProps) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "/profile",
      label: "Quản lý tài khoản",
    },
    {
      key: "/change-password",
      label: "Đổi mật khẩu",
    },
    {
      key: "/logout",
      label: "Đăng xuất",
    },
  ];
  const handleMenuClick = async ({ key }: { key: string }) => {
    if (key === "/logout") {
      //   await handleLogout();
    } else {
      navigate(key);
    }
  };
  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
          background: "white",
        }}
      >
        <Space>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link to="/" className="hidden sm:block">
            <span
              style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
            >
              IOT Platform
            </span>
          </Link>
        </Space>

        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid white",
              cursor: "pointer",
            }}
          />
        </Dropdown>
      </Header>
    </>
  );
};

export default AdminHeader;
