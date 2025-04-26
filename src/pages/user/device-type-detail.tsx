import { Divider, Tabs, Typography } from "antd";
import TabRoom from "../../components/user/device-type-details/tab-device-type-info";
import TabDeviceAttribute from "../../components/user/device-type-details/tab-device-attribute";
import { IDeviceType, DeviceTypeApi } from "../../api/device-type.api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const DeviceTypeDetail = () => {
  // get DeviceTypeId from route params
  const params = useParams();
  const DeviceTypeId = params.DeviceTypeId;
  const [DeviceType, setDeviceType] = useState<IDeviceType | null>(null);

  useEffect(() => {
    const fetchDeviceType = async () => {
      // Simulate an API call to fetch DeviceType details
      try {
        const response = await DeviceTypeApi.getDeviceTypeById(DeviceTypeId!);
        setDeviceType(response.data.data || null);
      } catch (error) {
        console.error("Error fetching DeviceType:", error);
      }
    };

    fetchDeviceType();
  }, [DeviceTypeId]);

  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Thiết bị {DeviceType?.name}
      </Typography.Title>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Thuộc tính thiết bị`,
            key: "1",
            children: <TabDeviceAttribute deviceType={DeviceType} />,
          },
          {
            label: `Thông tin`,
            key: "2",
            children: <TabRoom DeviceType={DeviceType} setDeviceType={setDeviceType} />,
          },
        ]}
      />
    </div>
  );
};

export default DeviceTypeDetail;
