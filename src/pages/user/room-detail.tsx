import { Divider, Tabs, Typography, Space, Button } from "antd";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { IRoom, RoomApi } from "../../api/room.api";
import TabRoomInfo from "../../components/user/room-details/tab-room-info";
import TabDevice from "../../components/user/room-details/tab-device";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
const RoomDetail = () => {
  // get projectId from route params
  const params = useParams();
  const navigate = useNavigate();
  const roomId = params.roomId;
  const [room, setRoom] = useState<IRoom | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      // Simulate an API call to fetch project details
      try {
        const response = await RoomApi.getRoomById(roomId!);
        setRoom(response.data.data?.message || null);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [roomId]);

  return (
    <div>
      <Space direction="horizontal" align="start">
        <Button
          onClick={() => navigate(-1)}
          type="link"
          icon={<ArrowLeftOutlined style={{ fontSize: '20px', paddingTop: "5px" }} />}
        >
        </Button>
        <Typography.Title level={3} className="mb-4">
          Phòng {room?.name}
        </Typography.Title>
      </Space>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Thiết bị`,
            key: "1",
            children: <TabDevice room={room} />,
          },
          {
            label: `Thông tin`,
            key: "2",
            children: <TabRoomInfo room={room} setRoom={setRoom} />,
          },
        ]}
      />
    </div>
  );
};

export default RoomDetail;
