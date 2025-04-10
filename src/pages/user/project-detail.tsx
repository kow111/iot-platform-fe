import { Divider, Tabs, Typography } from "antd";
import TabRoom from "../../components/user/project-details/tab-room";
import TabInfo from "../../components/user/project-details/tab-info";

const ProjectDetail = () => {
  return (
    <div>
      <Typography.Title level={3} className="mb-4">
        Dự án *Tên dự án*
      </Typography.Title>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Phòng`,
            key: "1",
            children: <TabRoom />,
          },
          {
            label: `Thành viên`,
            key: "2",
            children: <div>Thành viên</div>,
          },
          {
            label: `Thông tin`,
            key: "3",
            children: <TabInfo />,
          },
        ]}
      />
    </div>
  );
};

export default ProjectDetail;
