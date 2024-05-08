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
        mailNo: '',
        receiverMem: '',
        readTime: '',
        receiverDelStatus: 'N'
    }],
    mailFiles: []
}];

const GET_RECEIVEMAIL = 'mails/GET_RECEIVEMAIL';

export const {mails: {getReceivemail}} = createActions({
    [GET_RECEIVEMAIL]: (res) => ({receivemail: res})
});

const mailReducer = handleActions(
    {
        [GET_RECEIVEMAIL]: (state, {payload}) => {
            return payload;
        }
    }, initialState
);

export default mailReducer;