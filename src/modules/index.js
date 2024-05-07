import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';

const rootReducer = combineReducers({
    noticeReducer 
});

export default rootReducer;