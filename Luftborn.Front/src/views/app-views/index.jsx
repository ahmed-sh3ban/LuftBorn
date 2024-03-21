import React from "react";
import {Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { SWRConfig } from "swr";
import ListProduct from "./Products/List";
import AddProduct from "./Products/Add";
import UpdateProduct from "./Products/Update";
import { API_BASE_URL } from "../../configs/EnvironmentConfig";
import fetch from "../../services/FetchService";
const Views = () => {
  return (
    <SWRConfig
      value={{
        fetcher: ({ url, params }) => {
          return fetch.get(`${API_BASE_URL}${url}`, { params }).then((r) => r);
        },
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
        shouldRetryOnError: false,
      }}
    >
      <Routes>
        <Route
          path={"/"}
          element={<Navigate to={`/product/list`} replace />}
        />
        <Route path={"/product/add"} element={<AddProduct />} />
        <Route path={"/product/edit/:id"} element={<UpdateProduct />} />
        <Route path={"/product/list"} element={<ListProduct />} />
      </Routes>
    </SWRConfig>
  );
};

export default Views;
