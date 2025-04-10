import { Divider, Tabs, Typography } from "antd";
import TabRoom from "../../components/user/project-details/tab-room";

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
            children: <div>Thông tin</div>,
          },
        ]}
      />
    </div>
  );
};

export default ProjectDetail;
