import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../../components/contents/Editor";
import TitleAndFile from "../../components/contents/TitleAndFile";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callInsertNoticeAPI } from "../../apis/NoticeAPICalls";

function InsertNoticeForm() {

    const result = useSelector(state => state.noticeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [insertNotice, setInsertNotice] = useState(
        {
            noticeTitle: '',
            noticeImgUrl: null,
            noticeFix: false,
            noticeContent: '',
        }
    );

    const onChangeHandler = (e) => {
        let { name, value, type, checked } = e.target;
    
        // 체크박스의 경우 checked 값을 사용하고, 그 외에는 value 값을 사용합니다.
        value = type === 'checkbox' ? checked : value;
    
        setInsertNotice({
            ...insertNotice,
            [name]: value
        });
    }

    // const onChangeHandler = (e) => {
    //     let { name, value, type, checked } = e.target;

    //     if (name === 'noticeFix') {
    //         value = type === 'checkbox' ? checked : value;
    //     }

    //     setInsertNotice({
    //         ...insertNotice,
    //         [name]: value
    //     });
    // }

    useEffect(
        () => {
            if (result.insert) {
                alert('공지 등록');
                navigate(`/notices`);
            }
        },
        [result, navigate]
    );


    const onClickHandler = async () => {
        console.log("버튼이 클릭되었습니다!");

        try {
            const formData = new FormData();

            // 필요한 데이터 추가
            formData.append("noticeTitle", insertNotice.noticeTitle);
            formData.append("noticeFix", insertNotice.noticeFix);
            formData.append("noticeContent", insertNotice.noticeContent);

            console.log("formData", formData);

            // 파일이 있는 경우에만 추가
            if (insertNotice.noticeImgUrl && insertNotice.noticeImgUrl[0]) {
                // 파일을 FormData에 추가
                formData.append("noticeImgUrl", insertNotice.noticeImgUrl[0]);
            }

            const result = await dispatch(callInsertNoticeAPI(formData));
            console.log('insertNotice [ result ] ', result);

        } catch (error) {
            console.error('Error inserting notice:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }

    const buttons = [
        { label: '취소', onClick: () => navigate('/notices'), styleClass: 'back' },
        { label: '등록', onClick: onClickHandler, styleClass: 'move' }
    ];

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>공지사항</h2>
            </div>

            <div className="col-lg-12">
                <div className="list">
                    <div className="card-title">
                        <TitleAndFile onChange={onChangeHandler} />
                        <input type="checkbox" id="fix" onChange={onChangeHandler} /> &nbsp;
                        <label htmlFor="fix">최상단에 공지로 등록</label>
                    </div>
                    <div className="editor-container">
                        <Editor value={insertNotice.noticeContent} onChange={setInsertNotice} />
                    </div>
                    <ButtonGroup buttons={buttons} />
                </div>
            </div>
        </main>
    );
};

export default InsertNoticeForm;
