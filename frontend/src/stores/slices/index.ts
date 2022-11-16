import { combineReducers } from "redux";

import authReducer from "./auth";
import loadingReducer from "./loading";

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
});

export default rootReducer;
