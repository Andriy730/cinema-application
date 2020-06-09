import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { createForms } from "react-redux-form";
import { InitialFeedback, InitialLogin } from "./form";
import { Movies } from "./movies";
import { User } from "./user";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            movies: Movies,
            user: User,
            ...createForms({
                feedback: InitialFeedback,
                login: InitialLogin
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}