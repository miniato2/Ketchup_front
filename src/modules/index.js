import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import memberReducer from "./MemberModule";

const rootReducer = combineReducers({
    noticeReducer,
    memberReducer
});

export default rootReducer;