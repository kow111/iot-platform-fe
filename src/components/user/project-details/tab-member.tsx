import { Avatar, Button, Divider, Flex, List, Skeleton, Space, Typography } from "antd";
import Input, { SearchProps } from "antd/es/input";
import { IUser, SearchUserAPI } from "../../../api/manage.user.api";
import { useState } from "react";

const TabMember = () => {
  const [searchList, setSearchList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

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
      console.log(res.data);
      setSearchList(res.data.data?.users || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

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
                <Button type="primary" key="list-loadmore-edit">
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
      </div>
    </Flex>
  );
};

export default TabMember;
