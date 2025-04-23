import { Divider, Tabs, Typography } from "antd";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { IRoom, RoomApi } from "../../api/room.api";
import TabRoomInfo from "../../components/user/room-details/tab-room-info";

const RoomDetail = () => {
  // get projectId from route params
  const params = useParams();
  const roomId = params.roomId;
  const [room, setRoom] = useState<IRoom|null>(null);
  
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
      <Typography.Title level={3} className="mb-4">
        Phòng {room?.name}
      </Typography.Title>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Thiết bị`,
            key: "1",
            children: "Thiết bị",
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
