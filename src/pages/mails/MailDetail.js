import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callGetMailDetailAPI } from "../../apis/MailAPICalls";
import { useEffect } from "react";
import ButtonGroup from "../../components/contents/ButtonGroup";
import MailContent from "../../components/items/mails/MailContent";

function MailDetail() {
    const { mailNo } = useParams();
    const result = useSelector(state => state.mailReducer);
    const mailDetail = result.maildetail || null;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetMailDetailAPI({ mailNo }));
        }, [dispatch]
    );

    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>메일 상세</h2>
                </div>
                <div className="mt-3 d-flex justify-content-between align-middle">
                    <div className="mail-btn">
                        <button
                            // className={`${part == "receive" ? 'focus-btn ps-0 me-4 fs-5' : 'non-focus-btn ps-0 me-4 fs-5'}`}
                            // onClick={() => receiveHandler()}
                            >받은 메일함</button>
                        <button
                            // className={`${part == "send" ? 'focus-btn fs-5' : 'non-focus-btn fs-5'}`}
                            // onClick={() => sendHandler()}
                            >보낸 메일함</button>
                    </div>
                    <button className="back-btn">목록</button>
                </div>
                <hr />
                <MailContent content={mailDetail} />
            </main>
        </>
    );
}

export default MailDetail;