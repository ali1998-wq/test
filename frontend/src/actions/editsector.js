import { editsectorconstants } from "./constants";
const axios = require("axios");
export const Editsec = (data) => {
  return async (disptach) => {
    const token = localStorage.getItem("LCtoken");
    disptach({ type: editsectorconstants.editsectorrequest });
    await axios
      .post(`http://localhost:5000/api/updatesector`, {
        ...data,
      })
      .then((res) => {
        if (res.status === 201) {
          const { data, message } = res.data;
          localStorage.setItem("message", message);
          disptach({
            type: editsectorconstants.editsectorSuccess,
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
            type: editsectorconstants.editsectorfailure,
            payload: { message: error.response.data.message },
          });
        } else if (error.request) {
          localStorage.setItem("message", error.request);
          disptach({
            type: editsectorconstants.editsectorfailure,
            payload: { message: error.request },
          });
        } else {
          localStorage.setItem("message", error.message);
          disptach({
            type: editsectorconstants.editsectorfailure,
            payload: { message: error.message },
          });
        }
      });
  };
};
