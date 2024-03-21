import { Button, Col, Form, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { END_POINTS } from "../../../../constants/api-constant";
import usePostHook from "../../../../services/ApiPostService";
import ProductForm from "../components/product-form";
import ClearCacheSWRPartialKey from "../../../../services/SWRPartialKeyService";

const { Item } = Form;

const AddProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onPostCallBack = ({ result }) => {
    ClearCacheSWRPartialKey(END_POINTS.API_PRODUCT);
    navigate(`/product/edit/${result}`);
  };
  const [postState, doPost] = usePostHook({ onPostCallBack });

  const finish = (values) => {
    doPost({ url: END_POINTS.API_PRODUCT, data: values });
  };
  return (
    <Form layout={"vertical"} onFinish={finish} form={form}>
      <ProductForm />
      <Row align="end">
        <Col>
          <Item>
            <Button
              className="form-btn"
              type="primary"
              htmlType="submit"
              loading={false}
            >
              Add
            </Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddProduct;
