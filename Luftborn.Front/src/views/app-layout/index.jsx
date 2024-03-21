import React, { useEffect, useState } from "react";

import { Breadcrumb, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import navigationConfig from "../../configs/navigation-config";
import Views from "../app-views";
import "./layout.scss";
const { Header, Content, Sider } = Layout;
const menuItems = () => {
  return [
    {
      key: navigationConfig.key,
      label: navigationConfig.label,
      children: navigationConfig.submenu.map((obj) => ({
        key: obj.key,
        label: <Link to={obj.path}>{obj.label}</Link>,
      })),
    },
  ];
};
const AppLayout = () => {
  const [breadcrumbsItems, setBreadcrumbsItems] = useState([]);
  const location = useLocation();
  const GenerateBreadcrumbItems = () => {
    var path = location.pathname;
    var pathSplitItems = path.split("/");
    var breadcrumbItems = pathSplitItems.flatMap((obj, index) => {
      if (index === 0) return [];
      return { title: obj.toUpperCase() };
    });
    return [{ title: "LUFTBORN" }, ...breadcrumbItems];
  };

  return (
    <Layout className="page-layout">
      <Header className="layout-header">
        <span className="title">LuftBorn</span>
      </Header>
      <Layout className="layout-body">
        <Sider className="side-bar">
          <Menu
            mode="inline"
            className="side-bar-menu"
            items={menuItems()}
          ></Menu>
        </Sider>
        <Layout className="page-content">
          <Breadcrumb
            className="bread-crumb"
            items={GenerateBreadcrumbItems()}
          />

          <Content className="content">
            <Views />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
