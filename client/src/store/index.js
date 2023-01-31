// //Uso el Middleware Thunk para Acciones Asíncronas por bugs en actions front/back
// import {configureStore} from '@reduxjs/toolkit';
// import {  combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from "../reducer/index";

// let reducer = combineReducers(rootReducer)
// // applyMiddleware sobrecarga configureStore con middlewares:
// let store = configureStore(reducer, applyMiddleware(thunk))

// export default store;

import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

const store = configureStore({
    middleware: [thunk],
    reducer: rootReducer
  });

export default store;

// /* Importing the configureStore function from the reduxjs/toolkit library. */
// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// /* Importing the rootReducer from the reducers folder. */
// import rootReducer from "../reducer/index";

// /* Creating a store object that is used to store the state of the application. */
// const store = configureStore({
// 	reducer: rootReducer,
// 	middleware: [thunk],
// });

// export default store;

//  import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

// import rootReducer from "../reducer/index";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;