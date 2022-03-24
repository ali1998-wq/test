import { getusersconstants } from "../actions/constants";

const initialstate = {
  message: "",
  error: null,
  loading: false,
  data: {},
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case getusersconstants.getusersrequest: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case getusersconstants.getusersSuccess: {
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.message,
      };
      break;
    }
    case getusersconstants.getusersfailure: {
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }
  }
  return state;
};
