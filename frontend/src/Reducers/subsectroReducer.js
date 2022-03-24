import { getsubsectorsconstants } from "../actions/constants";

const initialstate = {
  message: "",
  error: null,
  loading: false,
  data: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case getsubsectorsconstants.getsubsectorsrequest: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case getsubsectorsconstants.getsubsectorsSuccess: {
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.message,
      };
      break;
    }
    case getsubsectorsconstants.getsubsectorsfailure: {
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }
  }
  return state;
};
