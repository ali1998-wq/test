import { editmodalconstants } from "../actions/constants";

const initialstate = {
  message: "",
  error: null,
  loading: false,
  open: false,
  value: "",
  name: "",
  id: "",
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case editmodalconstants.editmodalrequest: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case editmodalconstants.editmodalSuccess: {
      state = {
        ...state,
        loading: false,
        open: action.payload.open,
        value: action.payload.value,
        name: action.payload.name,
        id: action.payload.id,
      };
      break;
    }
  }
  return state;
};
