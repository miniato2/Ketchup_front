import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";

const rootReducer = combineReducers({
    noticeReducer,
    memberReducer,
    scheduleReducer
});

export default rootReducer;