import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import mailReducer from "./MailModule";

const rootReducer = combineReducers({
    noticeReducer,
    mailReducer
});

export default rootReducer;