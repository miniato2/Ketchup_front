import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { callGetMailDetailAPI, callPutReadTimeAPI } from "../../apis/MailAPICalls";
import { useEffect } from "react";
import MailContent from "../../components/items/mails/MailContent";

function MailDetail() {
    const { mailNo } = useParams();
    const result = useSelector(state => state.mailReducer);
    const mailDetail = result?.maildetail || [];
    const dispatch = useDispatch();
    const location = useLocation();
    const { part } = location.state;
    const navigate = useNavigate();

    console.log("🍛🍛🍛🍛🍛🍛🍛");
    console.log(mailDetail);

    const receiveHandler = () => {
        navigate('/mails/receive');
    };

    const sendHandler = () => {
        navigate('/mails/send');
    };

    useEffect(() => {
        const fetchData = async () => {
            if (part === 'receive') {
                await dispatch(callPutReadTimeAPI(mailNo));
            }
            dispatch(callGetMailDetailAPI(mailNo, part));
        };

        fetchData();
    }, [mailNo, part, dispatch]);

    const backMailList = () => {
        navigate(`/mails/${part}`);
    };

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>메일</h2>
            </div>
            <div className="mt-3 d-flex justify-content-between align-middle">
                <div className="mail-btn">
                    <button
                        className={`${part === "receive" ? 'focus-btn ps-0 me-4 fs-5' : 'non-focus-btn ps-0 me-4 fs-5'}`}
                        onClick={() => receiveHandler()}
                    >받은 메일함</button>
                    <button
                        className={`${part === "send" ? 'focus-btn fs-5' : 'non-focus-btn fs-5'}`}
                        onClick={() => sendHandler()}
                    >보낸 메일함</button>
                </div>
                <button className="back-btn" onClick={backMailList}>목록</button>
            </div>
            <hr />
            <MailContent content={mailDetail} part={part} mailNo={mailNo} />
        </main>
    );
}

export default MailDetail;