import rootReducer from './rootReducer';
import { createStore } from 'redux';
// //или так
// import Redux from 'redux';
// const { createStore } = Redux;
// // или так
// let createStore = Redux.createStore; 



// стандартная запись без библиотек
// // если есть в local storage стейт, то достаем его
// const persistedState = localStorage.getItem('reduxState') 
//                        ? JSON.parse(localStorage.getItem('reduxState'))
//                        : {}

// const store = createStore(
//     rootReducer, 
//     persistedState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// это подписка на весь стор, без выделения отдельных свойств
// store.subscribe(() => {
//     localStorage['expireRespAut'] = JSON.stringify(store.getState());
// });


// использование библиотека redux-persist для сохранения в localStorage
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// const rootPersistConfig = {
//     key: 'root',
//     storage,
//     // whitelist: ['loginReduсer'],
// };

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


// const store = createStore(
//     persistedReducer, 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )


const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export const persistor = persistStore (store);


export default store;