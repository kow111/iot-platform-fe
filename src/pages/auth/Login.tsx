import { Button, Input, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    localStorage.clear();
    const onFinish = async (values: any) => {
        try {
            const response = await AuthApi.login(values.userName, values.password);
            toast.success("Đăng nhập thành công!");
            console.log("Login response:", response.data);
            localStorage.setItem("token", response.data.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("role", JSON.stringify(response.data.data.user.roles));
            navigate("/");
        } catch (error) {
            toast.error((error as any).response.data.message[0] || "Đăng nhập thất bại!");
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
                <h2 className="text-lg font-semibold text-center mb-6"
                    style={{ color: "rgb(0, 85, 141)" }}>
                    ĐĂNG NHẬP HỆ THỐNG
                </h2>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item name="userName" rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]} hasFeedback>
                        <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]} hasFeedback>
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <div className="flex justify-between mb-3 text-sm">
                        <NavLink to="/register" className="hover:underline" style={{ color: "rgb(0, 85, 141)" }}>
                            Đăng ký
                        </NavLink>
                        <NavLink to="#" className="hover:underline" style={{ color: "rgb(0, 85, 141)" }}>
                            Quên mật khẩu
                        </NavLink>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full h-12"
                            style={{ backgroundColor: "rgb(0, 85, 141)", borderColor: "rgb(0, 85, 141)", fontWeight: "bold" }}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;