import { getsubsectorsconstants } from "./constants";
const axios = require("axios");
export const getSubSec = (id) => {
  return async (disptach) => {
    disptach({ type: getsubsectorsconstants.getsubsectorsrequest });
    await axios
      .get(`https://testeess.herokuapp.com/api/getdubsector`)
      .then((res) => {
        if (res.status === 200) {
          const { data, message } = res.data;
          localStorage.setItem("message", message);
          disptach({
            type: getsubsectorsconstants.getsubsectorsSuccess,
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
            type: getsubsectorsconstants.getsubsectorsfailure,
            payload: { message: error.response.data.message },
          });
        } else if (error.request) {
          localStorage.setItem("message", error.request);
          disptach({
            type: getsubsectorsconstants.getsubsectorsfailure,
            payload: { message: error.request },
          });
        } else {
          localStorage.setItem("message", error.message);
          disptach({
            type: getsubsectorsconstants.getsubsectorsfailure,
            payload: { message: error.message },
          });
        }
      });
  };
};
