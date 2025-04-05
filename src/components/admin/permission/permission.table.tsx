import { Table, TableProps } from "antd";
import { IPermission } from "../../../api/manage.permission.api";

interface IProps {
  dataSource: IPermission[];
  loading: boolean;
  columns: TableProps<IPermission>["columns"];
}

const PermissionTable = ({ dataSource, loading, columns }: IProps) => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default PermissionTable;
