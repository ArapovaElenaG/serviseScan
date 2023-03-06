import { combineReducers } from "redux";
import loginReduсer from "./loginReducer";

import { createStore } from 'redux'; 

const rootReducer = combineReducers({
    loginReduсer,
    
})




const store = createStore(rootReducer)

// export default rootReducer;
export default store;

