import { getsectorsconstants } from "../actions/constants";

const initialstate = {
  message: "",
  error: null,
  loading: false,
  data: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case getsectorsconstants.getsectorsrequest: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case getsectorsconstants.getsectorsSuccess: {
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.message,
      };
      break;
    }
    case getsectorsconstants.getsectorsfailure: {
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }
  }
  return state;
};
