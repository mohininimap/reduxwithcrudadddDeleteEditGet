import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger";//match the state previous and application step
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewares=[reduxThunk];

if(process.env.NODE_ENV==="development"){
    middlewares.push(logger)
}
const store=createStore(rootReducer,applyMiddleware(...middlewares));

export default store;