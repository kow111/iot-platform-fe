import { Divider, Typography, Button, Form, Input, Avatar } from "antd";
import { useEffect, useState } from "react";
import { UserApi } from "../../api/user.api";
import { IUserProfile } from "../../api/user.api";
import { toast } from "react-toastify";
const UserProfile = () => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    const [user, setUser] = useState<IUserProfile>();
    const [form] = Form.useForm();

    const fetchUserProfile = async () => {
        try {
            const response = await UserApi.getProfile(userId);
            // console.log("User Profile:", response.data);
            setUser(response.data.data?.user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (values: any) => {
        try {

            const rs = await UserApi.updateProfile(userId, values.displayName);
            if (rs.data.success) {
                toast.success("Cập nhật thông tin thành công!");
                fetchUserProfile();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                userName: user.userName,
                displayName: user.displayName,
                email: user.email,
                avatarUrl: user.avatarUrl,
            });
        }
    }, [user]);

    return (
        <>
            <Typography.Title level={3} className="mb-4">
                Thông tin tài khoản
            </Typography.Title>
            <Divider />
            <Form
                layout="horizontal"
                labelAlign="left"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleUpdateProfile}
                form={form}
            >
                <Form.Item label="Email" name="email">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Tên đăng nhập" name="userName">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Tên hiển thị"
                    name="displayName"
                    rules={[{ required: true, message: "Vui lòng nhập tên hiển thị" }]}
                >
                    <Input placeholder="Nhập tên hiển thị" />
                </Form.Item>

                <Form.Item label="Avatar" name="avatarUrl">
                    {user?.avatarUrl ? (
                        <Avatar
                            size={160}
                            src={user.avatarUrl}
                            alt="Avatar"
                        />
                    ) : (
                        <Avatar size={80}>
                            {user?.displayName?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
            <Divider />
        </>
    );
}

export default UserProfile;