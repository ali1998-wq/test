import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Thunk from "redux-thunk";
import RootReducer from "../Reducers/index";

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(Thunk))
);

export default Store;
