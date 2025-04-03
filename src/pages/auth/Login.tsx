import { Button, Input, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
const Login = () => {

    const onFinish = async (values: any) => {
        try {
            const response = await AuthApi.login(values.userName, values.password);
            toast.success("Đăng nhập thành công!");
            console.log("Login response:", response.data);
            localStorage.setItem("token", response.data.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("role", JSON.stringify(response.data.data.user.roles[0].name));
        } catch (error) {
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
                    <Form.Item name="userName" rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}>
                        <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <div className="text-right mb-3">
                        <a href="#" className="hover:underline text-sm"
                            style={{ color: "rgb(0, 85, 141)" }}>
                            Quên mật khẩu?
                        </a>
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
