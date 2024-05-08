import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import approvalReducer from "./ApprovalModule";

const rootReducer = combineReducers({
    noticeReducer,
    approvalReducer
});

export default rootReducer;