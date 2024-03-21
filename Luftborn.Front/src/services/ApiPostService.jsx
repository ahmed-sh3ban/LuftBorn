import { useEffect, useReducer } from "react";
import { useState } from "react";
import fetch from "./FetchService";
const usePostHook = (props) => {
  const [api, setAPI] = useState({
    url: "",
    data: null,
    contentType: "application/json",
  });
  const dataPostReducer = (state, action) => {
    setAPI({ url: "", data: null, contentType: "application/json" });

    switch (action.type) {
      case "POST_INIT":
        return { ...state, isLoading: true, isError: false };
      case "POST_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          response: action.payload,
        };
      case "POST_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          response: action.payload,
        };
      case "POST_EMPTY":
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
  const [state, dispatch] = useReducer(dataPostReducer, {
    isLoading: false,
    isError: false,
    response: {},
  });

  useEffect(() => {
    const postData = async () => {
      api.url === ""
        ? dispatch({ type: "POST_EMPTY" })
        : dispatch({ type: "POST_INIT" });

      try {
        const param =
          api.contentType === "application/json"
            ? JSON.stringify(api.data)
            : api.data;
        const result = await fetch.post(api.url, param, {
          headers: {
            "Content-Type": api.contentType,
          },
        });

        dispatch({ type: "POST_SUCCESS", payload: result });
        if (result.status === 200) {
          if (props.onPostCallBack) {
            props.onPostCallBack(result.data);
          }
        }
      } catch (error) {
        dispatch({ type: "POST_FAILURE", payload: error });
      }
    };
    if (api.url !== "" && api.data !== null) {
      postData();
    }
  }, [api]);
  return [state, setAPI];
};
export default usePostHook;