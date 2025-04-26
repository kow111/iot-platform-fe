import { Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, useNavigate } from "react-router";
import { AuthApi } from "../../../api/AuthApi";
import { toast } from "react-toastify";

const UserHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const items = [
    {
      key: "/profile",
      label: "Quản lý tài khoản",
    },
    {
      key: "/logout",
      label: "Đăng xuất",
    },
  ];
  const handleMenuClick = async ({ key }: { key: string }) => {
    if (key === "/logout") {
      const rs = await AuthApi.logout();
      if (rs.data.success == true) {
        localStorage.clear();
        toast.success("Đăng xuất thành công !");
      }
      navigate("/login");
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
          backgroundColor: "rgb(0, 85, 141)",
          borderBottom: "1px solid #f0f0f0",
          borderLeft: "1px solid #f0f0f0",
        }}
      >
        <Link to="/" className="hidden sm:block">
          <span
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
          >
            IOT Platform
          </span>
        </Link>

        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <img
            src={user.avatarUrl || "https://www.w3schools.com/w3images/avatar2.png"}
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

export default UserHeader;
