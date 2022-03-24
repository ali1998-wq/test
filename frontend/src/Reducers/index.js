import { combineReducers } from "redux";
import editModalReducer from "./editModalReducer";
import getDealsRedcuer from "./getDealsRedcuer";
import getuser from "./getuser";
import subsectroReducer from "./subsectroReducer";

const RootReducer = combineReducers({
  DealsGet: getDealsRedcuer,
  SubGet: subsectroReducer,
  UseGet: getuser,
  openMod: editModalReducer,
});

export default RootReducer;
