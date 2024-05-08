import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import approvalReducer from "./ApprovalModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";

const rootReducer = combineReducers({
    // userReducer,
    // menuReducer
    noticeReducer,
    memberReducer,
    scheduleReducer,
    approvalReducer
});

export default rootReducer;