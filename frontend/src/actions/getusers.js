import { getusersconstants } from "./constants";
const axios = require("axios");
export const getUs = (id) => {
  return async (disptach) => {
    disptach({ type: getusersconstants.getusersrequest });
    await axios
      .get(`http://localhost:5000/api/getuser/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const { data, message } = res.data;
          localStorage.setItem("message", message);
          disptach({
            type: getusersconstants.getusersSuccess,
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
            type: getusersconstants.getusersfailure,
            payload: { message: error.response.data.message },
          });
        } else if (error.request) {
          localStorage.setItem("message", error.request);
          disptach({
            type: getusersconstants.getusersfailure,
            payload: { message: error.request },
          });
        } else {
          localStorage.setItem("message", error.message);
          disptach({
            type: getusersconstants.getusersfailure,
            payload: { message: error.message },
          });
        }
      });
  };
};
