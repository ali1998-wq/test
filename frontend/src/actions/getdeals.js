import { getsectorsconstants } from "./constants";
const axios = require("axios");
export const getSec = (id) => {
  return async (disptach) => {
    disptach({ type: getsectorsconstants.getsectorsrequest });
    await axios
      .get(`https://testeess.herokuapp.com/api/getsctors`)
      .then((res) => {
        if (res.status === 200) {
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
