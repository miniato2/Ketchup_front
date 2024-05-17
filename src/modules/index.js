import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import approvalReducer from "./ApprovalModule";
import mailReducer from "./MailModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";
import reserveReducer from "./ReserveModule";
<<<<<<< HEAD
import boardReducer from "./BoardModule";
=======
import resourceReducer from "./ResourceModule";
import departmentReducer from "./DepartmentModule";
import positionReducer from "./PositionModule";
>>>>>>> 07317f8d48a7e6ff9261cf94bf0a6f05904c5140

const rootReducer = combineReducers({
    // userReducer,
    // menuReducer
    noticeReducer,
    memberReducer,
    scheduleReducer,
    approvalReducer,
    mailReducer,
    reserveReducer,
<<<<<<< HEAD
    boardReducer
=======
    resourceReducer,
    departmentReducer,
    positionReducer,

>>>>>>> 07317f8d48a7e6ff9261cf94bf0a6f05904c5140
});

export default rootReducer;