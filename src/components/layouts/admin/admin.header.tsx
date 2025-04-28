import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router";

interface UserHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AdminHeader = ({ collapsed, setCollapsed }: UserHeaderProps) => {
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
          <Link to="/admin" className="hidden sm:block">
            <span
              style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
            >
              IOT Platform
            </span>
          </Link>
        </Space>
      </Header>
    </>
  );
};

export default AdminHeader;
