import { createActions, handleActions } from "redux-actions";

const initialState = [{
    mailNo: '',
    senderMem: '',
    mailTitle: '',
    mailContent: '',
    sendMailTime: '',
    sendCancelStatus: '',
    sendDelStatus: '',
    receivers: [{
        receiverNo: '',
        receiverMem: '',
        readTime: '',
        receiverDelStatus: ''
    }],
    mailFiles: [{
        mailFileNo: '',
        mailNo: '',
        mailFilePath: '',
        mailFileName: '',
        mailFileOriName: ''
    }]
}];

const GET_RECEIVEMAIL = 'mails/GET_RECEIVEMAIL';
const GET_SENDMAIL = 'mails/GET_SENDMAIL';
const GET_MAILDETAIL = 'mails/GET_MAILDETAIL';
const POST_INSERTMAIL = 'mails/POST_INSERTMAIL';
const PUT_DELETEMAIL = 'mails/PUT_DELETEMAIL';

export const {mails: {getReceivemail, getSendmail, getMaildetail, postInsertmail, putDeletemail}} = createActions({
    [GET_RECEIVEMAIL]: (res) => ({receivemail: res}),
    [GET_SENDMAIL]: (res) => ({sendmail: res}),
    [GET_MAILDETAIL]: (res) => ({maildetail: res}),
    [POST_INSERTMAIL]: (res) => ({insertmail: res}),
    [PUT_DELETEMAIL]: (res) => ({deletemail: res})
});

const mailReducer = handleActions(
    {
        [GET_RECEIVEMAIL]: (state, {payload}) => {
            return payload;
        },
        [GET_SENDMAIL]: (state, {payload}) => {
            return payload;
        },
        [GET_MAILDETAIL]: (state, {payload}) => {
            return payload;
        },
        [POST_INSERTMAIL]: (state, {payload}) => {
            return payload;
        },
        [PUT_DELETEMAIL]: (state, {payload}) => {
            return payload;
        }
    }, initialState
);

export default mailReducer;