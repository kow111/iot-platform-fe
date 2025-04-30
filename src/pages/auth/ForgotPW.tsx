import { Form, Input, Button } from 'antd'
import { UserOutlined } from "@ant-design/icons";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ForgotPW = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            await AuthApi.forgotPW(values.userName);
            toast.success("Kiểm tra email để đổi mật khẩu !");
        } catch (error) {
            toast.error(((error as any).response.data.message[0]));
            console.error("ForgotPW failed:", error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
                <h2 className="text-lg font-semibold text-center mb-6"
                    style={{ color: "rgb(0, 85, 141)" }}>
                    ĐỔI MẬT KHẨU
                </h2>
                <Form name="ForgotPW" onFinish={onFinish} layout="vertical">

                    <Form.Item name="userName" rules={[{ required: true, message: "Vui lòng nhập tên tài khoản !" }]} hasFeedback>
                        <Input prefix={<UserOutlined />} placeholder="Nhập tên tài khoản" size="large" className="h-12 border-gray-400" />
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
                        <span
                            onClick={() => navigate(-1)}
                            className="hover:underline cursor-pointer"
                            style={{ color: "rgb(0, 85, 141)" }}
                        >
                            Quay lại
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ForgotPW;