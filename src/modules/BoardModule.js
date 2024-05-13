import { createActions, handleActions } from "redux-actions";

const initialState =  {
    memberNo: '',
    depNo: 0,
    boardContent: '',
    boardCreateDttm: 0,
    boardImgUrl: '',
    boardNo: 0,
    boardTitle: '',
    boardUpdateDttm: ''
};

const GET_BOARDLIST = 'notice/GET_BOARDLIST';
const GET_BOARD = 'notice/GET_BOARD';
const INSERT_BOARD = 'notice/INSERT_BOARD';
const UPDATE_BOARD = 'notice/UPDATE_BOARD';
const DELETE_BOARD = 'notice/DELETE_BOARD';

export const { notice: { getBoardlist, getBoard, insertBoard, updateBoard, deleteBoard } } = createActions({
    [GET_BOARDLIST]: (res) => ({ boardlist: res }),
    [GET_BOARD]: (res) => ({ board: res }),
    [INSERT_BOARD]: (res) => ({ insert: res }),
    [UPDATE_BOARD]: (res) => ({ update: res }),
    [DELETE_BOARD]: (res) => ({ delete: res })
});

const boardReducer = handleActions (
    {
        [GET_BOARDLIST]: (state, {payload}) => {
            return payload;
        },
        [GET_BOARD]: (state, {payload}) => {
            return payload;
        },
        [INSERT_BOARD]: (state, {payload}) => {
            return payload;
        },
        [UPDATE_BOARD]: (state, {payload}) => {
            return payload;
        },
        [DELETE_BOARD]: (state, {payload}) => {
            return payload;
        }
    }, 
    initialState
);

export default boardReducer;