import { useEffect, useReducer } from "react";
import { useState } from "react";
import { message } from "antd";
import fetch from "./FetchService";

const useDeleteHook = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Record Deleted Successfully",
    });
  };
  const dataDeleteReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_INIT":
        return { ...state, isLoading: true, isError: false };
      case "DELETE_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "DELETE_FAILURE":
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(dataDeleteReducer, {
    isLoading: false,
    isError: false,
    data: 0,
  });
  const [url, setUrl] = useState({ deleteUrl: null });
  useEffect(() => {
    const DeleteData = async () => {
      dispatch({ type: "DELETE_INIT" });
      try {
        const result = await fetch.delete(url.deleteUrl);
        if (result.status === 200) {
          if (props.onDeleteCallBack) {
            props.onDeleteCallBack();
          }
          success();
        }
        dispatch({ type: "DELETE_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "DELETE_FAILURE" });
      }
    };
    if (url.deleteUrl !== null && url.deleteUrl !== null) {
      DeleteData();
    }
  }, [url]);
  return [state, setUrl, contextHolder];
};
export default useDeleteHook;
