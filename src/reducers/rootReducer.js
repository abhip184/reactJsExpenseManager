import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import transectionReducer from "./transectionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  transection: transectionReducer
});

export default rootReducer;
