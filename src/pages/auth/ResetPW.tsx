import { Form, Input, Button } from 'antd'
import { LockOutlined } from "@ant-design/icons";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router";

const ResetPW = () => {
    const navigate = useNavigate();
    const token = new URLSearchParams(window.location.search).get("token") || "";
    const onFinish = async (values: any) => {
        try {
            const response = await AuthApi.resetPassword(token, values.newPassword);
            toast.success("Đổi mật khẩu thành công!");
            console.log("ResetPW response:", response.data);
            navigate("/login");
        } catch (error) {
            toast.error((error as any).response.data.message[0] || "Đổi mật khẩu thất bại!");
            console.error("ResetPW failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
                <h2 className="text-lg font-semibold text-center mb-6"
                    style={{ color: "rgb(0, 85, 141)" }}>
                    Đặt lại mật khẩu
                </h2>
                <Form name="ResetPW" onFinish={onFinish} layout="vertical">
                    <Form.Item name="newPassword" rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]} hasFeedback>
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
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

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-12"
                            style={{
                                backgroundColor: "rgb(0, 85, 141)",
                                borderColor: "rgb(0, 85, 141)",
                                fontWeight: "bold"
                            }}
                        >
                            Xác nhận
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

export default ResetPW;