import { Col, Form, Row, Input, DatePicker } from "antd";
import React from "react";
import { DATE_FORMAT_YYYY_MM_DD } from "../../../../constants/date-constant";
const { Item } = Form;
const ProductForm = () => {
  return (
    <Row justify="space-between" align="center" gutter={[16, 16]}>
      <Col span={12}>
        <Item name="productName" label="Product Name">
          <Input />
        </Item>
      </Col>
      <Col span={12}>
        <Item name="productPrice" label="Product Price">
          <Input />
        </Item>
      </Col>
      <Col span={12}>
        <Item name="productionDate" label="Production date">
          <DatePicker
            style={{ width: "100%" }}
            format={DATE_FORMAT_YYYY_MM_DD}
          />
        </Item>
      </Col>
      <Col span={12}>
        <Item name="expirationDate" label="Expiration Date">
          <DatePicker
            style={{ width: "100%" }}
            format={DATE_FORMAT_YYYY_MM_DD}
          />
        </Item>
      </Col>
    </Row>
  );
};

export default ProductForm;
