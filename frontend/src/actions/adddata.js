import { getsectorsconstants } from "./constants";
const axios = require("axios");
export const AddData = (data) => {
  return async (disptach) => {
    const token = localStorage.getItem("LCtoken");
    disptach({ type: getsectorsconstants.getsectorsrequest });
    await axios
      .post(`https://testeess.herokuapp.com/api/user/create`, {
        ...data,
      })
      .then((res) => {
        if (res.status === 201) {
          const { data, message } = res.data;
          localStorage.setItem("message", message);
          disptach({
            type: getsectorsconstants.getsectorsSuccess,
            payload: {
              data,
              message,
            },
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          localStorage.setItem("message", error.response.data.message);
          disptach({
            type: getsectorsconstants.getsectorsfailure,
            payload: { message: error.response.data.message },
          });
        } else if (error.request) {
          localStorage.setItem("message", error.request);
          disptach({
            type: getsectorsconstants.getsectorsfailure,
            payload: { message: error.request },
          });
        } else {
          localStorage.setItem("message", error.message);
          disptach({
            type: getsectorsconstants.getsectorsfailure,
            payload: { message: error.message },
          });
        }
      });
  };
};
