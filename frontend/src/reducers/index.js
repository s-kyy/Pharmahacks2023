import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import foodReducer from "./food";
import messageReducer from "./message";
import diagnosisReducer from "./diagnosis";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  food: foodReducer,
  diagnosis: diagnosisReducer,
  message: messageReducer,
});
