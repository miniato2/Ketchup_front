import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/contents/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callDeleteNoticeAPI } from "../../apis/NoticeAPICalls";
import Notice from "./Notice";
import { Button } from "react-bootstrap";

function NoticeDetail() {

    /* 로그인 상태 확인 */
    // const loginStatus = !!localStorage.getItem('isLogin');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticeNo } = useParams();
    const result = useSelector(state => state.noticeReducer);


    useEffect(
        () => {
            if (result.delete) {
                alert('공지 삭제');
                navigate(`/notices`);
            }
        },
        [result.delete, navigate]
    );

    const updateHandler = () => navigate(`/notices/${noticeNo}`);
    const deleteHandler = () => dispatch(callDeleteNoticeAPI({noticeNo}));


    return (
        <main id="main" className="main">
            <div className="title">
                <h2>공지사항</h2>
            </div>
            <div className="col-lg-12">
                <div className="row">

                    <div className="archive-body">
                        <div>
                            <Button variant="outline-dark" style={{ float: 'right' }}  onClick={() => navigate('/notices') } >목록</Button>
                        </div>
                        
                        <div>
                        { /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
                        {/* { (loginStatus) &&  */}
                        <ButtonGroup
                            buttons={[
                                { label: '수정', styleClass: 'back', onClick: updateHandler },
                                { label: '삭제', styleClass: 'move', onClick: deleteHandler }
                            ]}
                        />
                        {/* } */}
                        </div>
                        <Notice noticeNo={noticeNo} />
                    </div>
                </div>
            </div>
        </main>

    );
}

export default NoticeDetail;