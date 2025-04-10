import { Row, Col, Form, Input, Button } from 'antd'
import { MailOutlined, UserOutlined, KeyOutlined } from "@ant-design/icons";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate, NavLink, useLocation } from "react-router";
import { useState } from "react";

const Verify = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { email, userName } = state;
    const [userNameValue, setUserNameValue] = useState(userName);

    const onFinish = async (values: any) => {
        try {
            const response = await AuthApi.verify(values.email, values.otp);
            toast.success("Xác thực thành công!");
            console.log("Verify response:", response.data);
            navigate("/login");
        } catch (error) {
            toast.error((error as any).response.data.message[0] || "Xác thực thất bại!");
            console.error("Verify failed:", error);
        }
    };

    const handleSendOtp = async () => {
        try {
            if (!userNameValue) {
                toast.error("Vui lòng nhập tài khoản trước khi gửi OTP!");
                return;
            }
            await AuthApi.sendOTP(userNameValue);
            toast.success("Gửi OTP thành công!");
        } catch (error) {
            toast.error(((error as any).response.data.message[0]) || "Gửi OTP thất bại!");
            console.error("Send OTP failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
                <h2 className="text-lg font-semibold text-center mb-6"
                    style={{ color: "rgb(0, 85, 141)" }}>
                    XÁC THỰC TÀI KHOẢN
                </h2>
                <Form name="login" onFinish={onFinish} layout="vertical">

                    {/* Tách phần UserName và Send OTP ra khỏi form */}
                    <Row gutter={8} align="middle" style={{ marginBottom: '16px' }}>
                        <Col flex="auto">
                            <Input
                                value={userNameValue}
                                onChange={(e) => setUserNameValue(e.target.value)}
                                placeholder="Nhập tên tài khoản"
                                prefix={<UserOutlined />}
                                size="large"
                                className="h-12 border-gray-400"
                            />
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                style={{
                                    backgroundColor: "rgb(0, 85, 141)",
                                    borderColor: "rgb(0, 85, 141)"
                                }}
                                className="h-12"
                                onClick={handleSendOtp}
                            >
                                Gửi OTP
                            </Button>
                        </Col>
                    </Row>

                    {/* Các Form Item khác */}
                    <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]} initialValue={email} hasFeedback >
                        <Input prefix={<MailOutlined />} placeholder="Nhập Email đăng ký" size="large" className="h-12 border-gray-400" />
                    </Form.Item>

                    <Form.Item name="otp" rules={[{ required: true, message: "Vui lòng otp!" }]} hasFeedback>
                        <Input prefix={<KeyOutlined />} placeholder="Nhập OTP" size="large" className="h-12 border-gray-400" />
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
                            Xác thực
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

export default Verify;