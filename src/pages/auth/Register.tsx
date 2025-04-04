import { Button, Input, Form, Upload } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, FileImageOutlined } from "@ant-design/icons";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append("userName", values.userName);
        formData.append("password", values.password);
        formData.append("email", values.email);
        formData.append("displayName", values.displayName);
        formData.append("avatar", values.avatar[0].originFileObj);
        console.log("File object:", values.avatar);
        try {
            const response = await AuthApi.register(formData);
            console.log("Register response:", response.data);
            toast.success("Đăng ký thành công!");
            navigate("/verify", { state: { email: values.email } });
        } catch (error) {
            toast.error((error as any).response.data.message[0] || "Đăng ký thất bại !");
            console.error("Register failed:", error);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
                <h2 className="text-lg font-semibold text-center mb-6"
                    style={{ color: "rgb(0, 85, 141)" }}>
                    ĐĂNG KÝ TÀI KHOẢN
                </h2>
                <Form name="register" onFinish={onFinish} layout="vertical">
                    <Form.Item name="userName" rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]} hasFeedback>
                        <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]} hasFeedback>
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            {
                                validator(_, value) {
                                    if (!value || value.includes("@")) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Email phải chứa @"));
                                },
                            },
                        ]}
                        hasFeedback>
                        <Input prefix={<MailOutlined />} placeholder="Email" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item name="displayName" rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]} hasFeedback>
                        <Input prefix={<UserOutlined />} placeholder="Tên hiển thị" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e && e.fileList}
                        rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
                    >
                        <Upload
                            listType="picture"
                            beforeUpload={() => false}
                        >
                            <Button icon={<FileImageOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full h-12"
                            style={{ backgroundColor: "rgb(0, 85, 141)", borderColor: "rgb(0, 85, 141)", fontWeight: "bold" }}>
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <div className="flex justify-center text-sm">
                        <NavLink to="/login" className="hover:underline" style={{ color: "rgb(0, 85, 141)" }}>
                            Quay lại trang đăng nhập
                        </NavLink>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;