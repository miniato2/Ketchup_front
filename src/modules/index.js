import { combineReducers } from "redux";
import scheduleReducer from "./ScheduleModule";

const rootReducer = combineReducers({
    // userReducer,
    // menuReducer
    scheduleReducer
});

export default rootReducer;