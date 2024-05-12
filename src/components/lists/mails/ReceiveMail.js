import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetReceiveMailAPI } from "../../../apis/MailAPICalls";
import CheckBootstrapTable from "../../contents/CheckBootstrapTable";
import { useNavigate } from "react-router-dom";

function ReceiveMail({part}) {
    const result = useSelector(state => state.mailReducer);
    const receiveMail = result && result.receivemail && result.receivemail.length > 0 ? result.receivemail : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗🎗");
    console.log(part);

    useEffect(
        () => {
            dispatch(callGetReceiveMailAPI());
        }, [dispatch]
    );

    const columns = [
        ['mailNo', '번호'],
        ['readTime', '읽음'],
        ['mailTitle', '제목'],
        ['senderMem', '발신자'],
        ['sendMailTime', '수신일']
    ];

    const handleRowClick = (index) => {
        const mailNo = receiveMail[index]?.mailNo;

        navigate(`/mails/detail/${mailNo}`);
    };

    return (
        receiveMail && (
        <div>
            <CheckBootstrapTable data={receiveMail} columns={columns} onRowClick={handleRowClick} />
        </div>
        )
    );
}

export default ReceiveMail;