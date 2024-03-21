import { Button, Col, Form, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { END_POINTS } from "../../../../constants/api-constant";
import usePutHook from "../../../../services/ApiPutService";
import ClearCacheSWRPartialKey from "../../../../services/SWRPartialKeyService";
import ProductForm from "../components/product-form";

const { Item } = Form;

const UpdateProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const getData = useSWR({
    url: `${END_POINTS.API_PRODUCT}/${id}`,
  });
  const onUpdateCallBack = () => {
    ClearCacheSWRPartialKey(END_POINTS.API_PRODUCT);
    getData.mutate();
  };
  const [putState, doPut, contextHolder] = usePutHook({ onUpdateCallBack });

  useEffect(() => {
    if (getData.data && !getData.isLoading && !getData.error) {
      const fetchedData = getData.data.data.result;
      const updateValues = {
        ...fetchedData,
        productionDate: fetchedData["productionDate"]
          ? moment(fetchedData["productionDate"])
          : null,
        expirationDate: fetchedData["expirationDate"]
          ? moment(fetchedData["expirationDate"])
          : null,
      };
      form.setFieldsValue(updateValues);
    }
  }, [getData.isLoading, getData.error, getData.data]);
  const finish = (values) => {
    doPut({ url: END_POINTS.API_PRODUCT, data: { id: id, ...values } });
  };
  return (
    <Form layout={"vertical"} onFinish={finish} form={form}>
      {contextHolder}
      <ProductForm />
      <Row align="end">
        <Col>
          <Item>
            <Button
              className="form-btn"
              type="primary"
              htmlType="submit"
              loading={putState.isLoading}
            >
              Update
            </Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateProduct;
