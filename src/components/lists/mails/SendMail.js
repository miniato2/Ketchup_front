import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetSendMailAPI } from "../../../apis/MailAPICalls";
import CheckBootstrapTable from "../../contents/CheckBootstrapTable";
import { useNavigate } from "react-router-dom";

function SendMail() {
    const result = useSelector(state => state.mailReducer);
    const sendMail = result && result.sendmail && result.sendmail.length > 0 ? result.sendmail : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            dispatch(callGetSendMailAPI());
        }, []
    );

    const columns = [
        ['mailNo', '번호'],
        ['mailTitle', '제목'],
        ['receivers.receiverMem', '수신자'],
        ['sendMailTime', '발신일시']
    ];

    const handleRowClick = (index) => {
        const mailNo = sendMail[index]?.mailNo;

        navigate(`/mails/detail/${mailNo}`);
    };

    return (
        sendMail && (
            <div>
                <CheckBootstrapTable data={sendMail} columns={columns} onRowClick={handleRowClick} />
            </div>
        )
    );
}

export default SendMail;