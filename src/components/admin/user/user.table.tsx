import { Table, TableProps } from "antd";
import { IUser } from "../../../api/manage.user.api";

interface IProps {
  dataSource: IUser[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  columns: TableProps<IUser>["columns"];
  handleTableChange: (pagination: any) => void;
}

const UserTable = ({
  dataSource,
  loading,
  pagination,
  columns,
  handleTableChange,
}: IProps) => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
        }}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default UserTable;
