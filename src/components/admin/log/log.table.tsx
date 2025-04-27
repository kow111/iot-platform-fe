import { Table, TableProps } from "antd";
import { ILog } from "../../../api/log.api";

interface IProps {
  dataSource: ILog[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  columns: TableProps<ILog>["columns"];
  handleTableChange: (pagination: any) => void;
}

const LogTable = ({
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

export default LogTable;
