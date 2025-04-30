import { Divider, Tabs, Typography, Button, Space } from "antd";
import TabRoom from "../../components/user/project-details/tab-room";
import TabInfo from "../../components/user/project-details/tab-info";
import TabMember from "../../components/user/project-details/tab-member";
import { IProject, ProjectApi } from "../../api/project.api";
import { useParams } from "react-router";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ProjectDetail = () => {
  // get projectId from route params
  const params = useParams();
  const navigate = useNavigate();
  const projectId = params.projectId;
  const [project, setProject] = useState<IProject | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      // Simulate an API call to fetch project details
      try {
        const response = await ProjectApi.getProjectById(projectId!);
        setProject(response.data.data || null);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

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
          Dự án {project?.name}
        </Typography.Title>
      </Space>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Phòng`,
            key: "1",
            children: <TabRoom project={project} />,
          },
          {
            label: `Thành viên`,
            key: "2",
            children: <TabMember project={project} />,
          },
          {
            label: `Thông tin`,
            key: "3",
            children: <TabInfo project={project} setProject={setProject} />,
          },
        ]}
      />
    </div>
  );
};

export default ProjectDetail;
