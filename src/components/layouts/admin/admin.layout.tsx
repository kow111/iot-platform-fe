import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router";
import AdminSidebar from "./admin.sidebar";
import AdminHeader from "./admin.header";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar collapsed={collapsed} />
      <Layout>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
