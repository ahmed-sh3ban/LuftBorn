import { Table } from "antd";

const CustomTable = ({ dataSource, columns, isLoading = false }) => {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={false}
    />
  );
};

export default CustomTable;