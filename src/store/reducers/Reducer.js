import DataReducer from "./DataReducer";
import FavoriteReducer from "./FavoriteReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	DataReducer:DataReducer,
	FavoriteReducer:FavoriteReducer
})  
  
  export default rootReducer
  