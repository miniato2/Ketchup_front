import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetReceiveMailAPI, callPutReadTimeAPI } from "../../../apis/MailAPICalls";
import MailTable from "../../items/mails/MailTable";
import { useNavigate, useParams } from "react-router-dom";
import FormatDateTime from "../../contents/FormatDateTime";

function ReceiveMail({ checkedItems, setCheckedItems }) {
    const { part } = useParams();
    const [sortedMail, setSortedMail] = useState([]);
    const result = useSelector(state => state.mailReducer);
    const receiveMail = result && result.receivemail && result.receivemail.length > 0 ? result.receivemail : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            dispatch(callGetReceiveMailAPI());
        }, [dispatch]
    );

    useEffect(() => {
        if (receiveMail) {
            const sorted = [...receiveMail].sort((a, b) => new Date(b.sendMailTime) - new Date(a.sendMailTime));
            const formattedSortedMail = sorted.map(mail => ({
                ...mail,
                sendMailTime: FormatDateTime(mail.sendMailTime)
            }));
            setSortedMail(formattedSortedMail);
        }
    }, [receiveMail]);

    const columns = [
        ['readTime', '읽음'],
        ['mailTitle', '제목'],
        ['senderName', '발신자'],
        ['sendMailTime', '수신일시']
    ];

    const handleRowClick = (index) => () => {
        const mailNo = receiveMail[index]?.mailNo;

        navigate(`/mails/detail/${mailNo}`, { state: { part } });

        if (part == 'receive') {
            dispatch(callPutReadTimeAPI(mailNo));
        }
    };

    return (
        <div>
            <MailTable
                data={sortedMail}
                columns={columns}
                onRowClick={handleRowClick}
                part={part}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems} />
        </div>
    );
}

export default ReceiveMail;