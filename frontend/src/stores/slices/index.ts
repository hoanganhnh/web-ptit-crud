import { combineReducers } from "redux";

import authReducer from "./auth";
import loadingReducer from "./loading";
import orderReducer from "./order";

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  order: orderReducer,
});

export default rootReducer;
