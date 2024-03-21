import react, { useEffect, useReducer } from "react";
import { useState } from "react";
import { message } from "antd";
import fetch from "./FetchService";
const usePutHook = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Record Updated Successfully",
    });
  };
  const dataPutReducer = (state, action) => {
    switch (action.type) {
      case "PUT_INIT":
        return { ...state, isLoading: true, isError: false };
      case "PUT_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          response: action.payload,
        };
      case "PUT_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          response: action.payload,
        };
      case "PUT_EMPTY":
        return {
          ...state,
          isLoading: false,
          isError: false,
          response: "",
        };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(dataPutReducer, {
    isLoading: false,
    isError: false,
    response: {},
  });
  const [api, setAPI] = useState({ url: "", data: {} });

  useEffect(() => {
    const PutData = async () => {
      api.url === ""
        ? dispatch({ type: "PUT_EMPTY" })
        : dispatch({ type: "PUT_INIT" });
      try {
        const param = JSON.stringify(api.data);
        const result = await fetch.put(api.url, param, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.status === 200) {
          if (props.onUpdateCallBack) {
            props.onUpdateCallBack();
          }
          
          success();
        }
        dispatch({ type: "PUT_SUCCESS", payload: result });
      } catch (error) {
        dispatch({ type: "PUT_FAILURE", payload: error });
      }
    };

    if (api.url !== "" && api.data !== null) {
      PutData();
    }
  }, [api]);
  return [state, setAPI, contextHolder];
};
export default usePutHook;
