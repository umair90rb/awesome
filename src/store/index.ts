import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";
import logger from "./middlewares/logger"
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./rootEpic";

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, undefined, applyMiddleware(epicMiddleware, logger))

epicMiddleware.run(rootEpic)

export default store;