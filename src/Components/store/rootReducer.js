import { combineReducers } from "redux";
import loginReduсer from "./loginReducer";

import { createStore } from 'redux'; 

const rootReducer = combineReducers({
    loginReduсer,
    
})




const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// export default rootReducer;
export default store;

