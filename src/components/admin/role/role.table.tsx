import { Table, TableProps } from "antd";
import { IRole } from "../../../api/manage.user.api";

interface IProps {
  columns: TableProps<IRole>["columns"];
}

const RoleTable = ({ columns }: IProps) => {
  const dataSource: IRole[] = [
    {
      id: 1,
      name: "ADMIN",
    },
    {
      id: 2,
      name: "USER",
    },
    {
      id: 3,
      name: "MANAGER",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default RoleTable;
