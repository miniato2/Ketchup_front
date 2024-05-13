import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import approvalReducer from "./ApprovalModule";
import mailReducer from "./MailModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";
import reserveReducer from "./ReserveModule";

const rootReducer = combineReducers({
    // userReducer,
    // menuReducer
    noticeReducer,
    memberReducer,
    scheduleReducer,
    approvalReducer,
    mailReducer,
    reserveReducer
});

export default rootReducer;