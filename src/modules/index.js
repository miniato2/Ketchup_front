import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import scheduleReducer from "./ScheduleModule";

const rootReducer = combineReducers({
    // userReducer,
    // menuReducer
    noticeReducer,
    scheduleReducer

});

export default rootReducer;