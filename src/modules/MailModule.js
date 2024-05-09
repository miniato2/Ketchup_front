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

export const {mails: {getReceivemail, getSendmail}} = createActions({
    [GET_RECEIVEMAIL]: (res) => ({receivemail: res}),
    [GET_SENDMAIL]: (res) => ({sendmail: res})
});

const mailReducer = handleActions(
    {
        [GET_RECEIVEMAIL]: (state, {payload}) => {
            return payload;
        },
        [GET_SENDMAIL]: (state, {payload}) => {
            return payload;
        }
    }, initialState
);

export default mailReducer;