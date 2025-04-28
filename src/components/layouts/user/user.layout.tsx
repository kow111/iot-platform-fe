import { Button, Layout, Result, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import UserSidebar from "./user.sidebar";
import UserHeader from "./user.header";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const UserLayout = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const role: any = JSON.parse(localStorage.getItem("role") || "[]");

  if (role[0]?.name !== "USER") {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Back Home
          </Button>
        }
      />
    );
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

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
