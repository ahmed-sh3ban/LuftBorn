import { Button, Row, Space } from "antd";
import React from "react";
import CustomTable from "../../../../components/CustomTable";
import { DATE_FORMAT_YYYY_MM_DD } from "../../../../constants/date-constant";
import moment from "moment";
import useSWR from "swr";
import { END_POINTS } from "../../../../constants/api-constant";
import { useNavigate } from "react-router-dom";
import useDeleteHook from "../../../../services/ApiDeleteService";

const ListProduct = () => {
  const navigate = useNavigate();

  const getData = useSWR({
    url: `${END_POINTS.API_PRODUCT}`,
  });
  const onCallBack = () => {
    getData.mutate();
  };
  const loadTableDate = () => {
    if (!getData.data || getData.isLoading || getData.error) return null;
    return getData.data.data.result;
  };
  const onDelete = async (id) => {
    doDelete({ deleteUrl: `${END_POINTS.API_PRODUCT}/${id}` });
  };
  const [deleteState, doDelete, contextHolder] = useDeleteHook({
    onDeleteCallBack: onCallBack,
  });
  const columns = [
    {
      key: "productName",
      title: "Product Name",
      dataIndex: "productName",
      align: "center",
    },
    {
      key: "productPrice",
      title: "Product Price",
      dataIndex: "productPrice",
      align: "center",
    },
    {
      key: "productionDate",
      title: "Production Date",
      dataIndex: "productionDate",
      align: "center",

      render: (text) => {
        return <label>{moment(text).format(DATE_FORMAT_YYYY_MM_DD)}</label>;
      },
    },
    {
      key: "expirationDate",
      title: "Expiration Date",
      dataIndex: "expirationDate",
      align: "center",
      render: (text) => {
        return <label>{moment(text).format(DATE_FORMAT_YYYY_MM_DD)}</label>;
      },
    },
    {
      key: "actions",
      align: "end",

      render: (record) => (
        <Space>
          <Button onClick={(e) => navigate(`/product/edit/${record.id}`)}>
            <span>Edit</span>
          </Button>
          <Button
            onClick={(e) => onDelete(record.id)}
            loading={deleteState.isLoading}
          >
            <span>Delete</span>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {contextHolder}

      <CustomTable
        columns={columns}
        dataSource={loadTableDate()}
        isLoading={getData.isLoading}
      />
    </div>
  );
};

export default ListProduct;
