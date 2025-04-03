import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import UserSidebar from "./user.sidebar";
import UserHeader from "./user.header";

const UserLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserSidebar />
      <Layout>
        <UserHeader />
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

export default UserLayout;
