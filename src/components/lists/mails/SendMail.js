import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetSendMailAPI } from "../../../apis/MailAPICalls";
import CheckBootstrapTable from "../../contents/CheckBootstrapTable copy";

function SendMail() {
    const result = useSelector(state => state.mailReducer);
    const sendMail = result && result.sendmail && result.sendmail.length > 0 ? result.sendmail : null;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetSendMailAPI());
        }, [dispatch]
    );

    const columns = [
        ['mailNo', '번호'],
        ['mailTitle', '제목'],
        ['receivers.receiverMem', '수신자'],
        ['sendMailTime', '발신일시']
    ];

    return (
        sendMail && (
            <div>
                <CheckBootstrapTable data={sendMail} columns={columns} />
            </div>
        )
    );
}

export default SendMail;