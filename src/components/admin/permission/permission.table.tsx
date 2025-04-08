import { Table, TableProps } from "antd";
import { IPermission } from "../../../api/manage.permission.api";
import { useEffect, useState } from "react";

interface IProps {
  dataSource: IPermission[];
  loading: boolean;
  columns: TableProps<IPermission>["columns"];
}

const PermissionTable = ({ dataSource, loading, columns }: IProps) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: dataSource.length,
  });

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
    });
  };

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: dataSource.length,
    }));
  }, [dataSource]);

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

export default PermissionTable;
