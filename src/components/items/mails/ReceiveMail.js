import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetReceiveMailAPI } from "../../../apis/MailAPICalls";
import BootstrapTable from "../../contents/BootstrapTable";

function ReceiveMail() {
    const result = useSelector(state => state.mailReducer);
    const receiveMail = result && result.receivemail && result.receivemail.length > 0 ? result.receivemail : null;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetReceiveMailAPI());
        }, [dispatch]
    );

    const columns = [
        [],
        ['mailNo', '번호'],
        ['readTime', '읽음'],
        ['mailTitle', '제목'],
        ['senderMem', '발신자'],
        ['sendMailTime', '수신일']
    ];

    return (
        receiveMail && (
        <div>
            <BootstrapTable data={receiveMail} columns={columns} />
        </div>
        )
    );
}

export default ReceiveMail;