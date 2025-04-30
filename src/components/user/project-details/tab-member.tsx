import { Avatar, Button, Divider, Flex, List, Skeleton, Space, Typography } from "antd";
import Input, { SearchProps } from "antd/es/input";
import { IUser, SearchUserAPI } from "../../../api/manage.user.api";
import { useCallback, useEffect, useState } from "react";
import { IProjectMember, ProjectMemberApi } from "../../../api/project-member.api";
import { IProject } from "../../../api/project.api";
import { toast } from "react-toastify";

interface IProps {
  project: IProject | null;
}

const TabMember = ({ project } : IProps) => {
  const [searchList, setSearchList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [projectMembers, setProjectMembers] = useState<IUser[]>([]);
  const [originalProjectMembers, setOriginalProjectMembers] = useState<IProjectMember[]>([]);

  const fetchProjectMembers = useCallback(async () => {
    try {
      // Simulate an API call to fetch project members
      const response = await ProjectMemberApi.getAllProjectMembers(project?.id!);
      console.log(project?.id!);
      // setProjectMembers(response.data.data?.content.map(x => x) || []);
      const projectMembersUser = response.data.data?.content.map((x: IProjectMember) => x.user) || [];
      setProjectMembers(projectMembersUser);
      setOriginalProjectMembers(response.data.data?.content || []);
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  }, [project]);

  useEffect(() => {
    fetchProjectMembers();
  }, [fetchProjectMembers]);

  const onSearch: SearchProps["onSearch"] = async (value) => {
    if (!value) {
      setSearchList([]);
      return;
    }

    setLoading(true);
    try {
      const res = await SearchUserAPI({
        keyword: value,
      });
      // setSearchList(res.data.data?.users || []);
      // filter out the project members from the search results
      const filteredUsers = res.data.data?.users.filter((user: IUser) => {
        return !projectMembers.some((member: IUser) => member.id === user.id);
      }) || [];
      setSearchList(filteredUsers);
      console.log(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleUpdateProjectMembers = async () => {
    setLoading(true);
    try {
      const listTasks = []; // list of tasks to be executed in parallel
      // new member: projectMembers - originalProjectMembers
      const newMembers = projectMembers.filter((member) => {
        return !originalProjectMembers.some((originalMember) => originalMember.user.id === member.id);
      });
      // remove member: originalProjectMembers - projectMembers
      const removedMembers = originalProjectMembers.filter((originalMember) => {
        return !projectMembers.some((member) => member.id === originalMember.user.id);
      });
      // update new members
      for (const member of newMembers) {
        const data = {
          userId: member.id,
          projectId: project?.id!,
          role: "member",
          canControlDevices: false,
        };
        const task = ProjectMemberApi.createProjectMember(data);
        listTasks.push(task);
      }

      // update removed members
      for (const member of removedMembers) {
        const task = ProjectMemberApi.deleteProjectMember(member.id);
        listTasks.push(task);
      }
      await Promise.all(listTasks);
      await fetchProjectMembers(); // Refresh the project members list after updating
      toast.success("Cập nhật thành viên thành công!");
    } catch (error) {
      console.error("Error updating project members:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex
      style={{ width: "100%" }}
      dir="row"
      justify="space-between"
      gap={16}
    >
      <div style={{ width: "100%" }}>
        <Input.Search
          placeholder="Tìm kiếm người dùng"
          onSearch={onSearch}
          enterButton
        />
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={searchList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => {
                  setProjectMembers((prev) => [...prev, item]);
                  const newSearchList = searchList.filter((x) => x.id !== item.id);
                  setSearchList(newSearchList);
                }} type="primary" key="list-loadmore-edit">
                  Thêm
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatarUrl} />}
                  title={item.displayName}
                  description={item.email}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
      <Divider type="vertical" />
      <div style={{ width: "100%" }}>
        <Typography.Title level={4} className="mb-4">
          Thành viên trong dự án
        </Typography.Title>
        <List
          className="demo-loadmore-list"
          loading={loading}
          style={{ maxHeight: 400, overflowY: 'auto' }}
          itemLayout="horizontal"
          dataSource={projectMembers}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => {
                  setProjectMembers((prev) => prev.filter((x) => x.id !== item.id));
                }} type="primary" key="list-loadmore-edit">
                  Xóa
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatarUrl} />}
                  title={item.displayName}
                  description={item.email}
                />
              </Skeleton>
            </List.Item>
          )}
        />
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Button onClick={handleUpdateProjectMembers} type="primary">
            Cập nhật
          </Button>
        </div>
      </div>
    </Flex>
  );
};

export default TabMember;
