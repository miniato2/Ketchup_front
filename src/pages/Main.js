import { Link, useNavigate } from "react-router-dom";
import BootstrapTable from "../components/contents/BootstrapTable";
import ApprovalBox from "../components/contents/ApprovalBox";
import ScheduleBox from "../components/contents/ScheduleBox";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../utils/tokenUtils';
import { useEffect, useState } from "react";
import { callGetMemberNameAPI } from "../apis/MemberAPICalls";

function Main() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log('[ loginToken ] : ', loginToken);

    // 결재 
    const approvalData = [
        { title: "내가 결재해야 하는 문서", count: 3 },
        { title: "결재 대기중인 나의 문서", count: 5 },
        { title: "승인된 나의 문서", count: 10 },
        { title: "반려된 나의 문서", count: 2 },
    ];

    // 공지사항
    const result = useSelector(state => state.noticeReducer);
    const noticeList = result.noticelist;

    // 공지사항 컬럼 제목 목록
    const formatDateTime = dateTimeString => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 상태 변수
    const [formattedNoticeList, setFormattedNoticeList] = useState([]);

    // 컴포넌트가 마운트될 때 공지사항 목록을 가져와서 작성자의 이름을 추가
    useEffect(() => {
        const fetchNoticeList = async () => {
            if (noticeList) {
                const formattedList = await Promise.all(noticeList.slice(0, 3).map(async (item) => {
                    try {
                        const memberInfo = await dispatch(callGetMemberNameAPI({ memberNo: item.memberNo }));
                        console.log('[ memberInfo ] : ', memberInfo);

                        return {
                            ...item,
                            noticeCreateDttm: formatDateTime(item.noticeCreateDttm),
                            memberName: memberInfo
                        }

                    } catch (error) {
                        console.error('Failed to fetch member name:', error);
                        return {
                            ...item,
                            noticeCreateDttm: formatDateTime(item.noticeCreateDttm),
                            memberName: 'Unknown'
                        };
                    }
                }));
                setFormattedNoticeList(formattedList);
            }
        };
        fetchNoticeList();
    }, [dispatch, noticeList]);

    // const formattedNoticeList = noticeList ? noticeList.slice(0, 3).map(item => ({
    //     ...item,
    //     noticeCreateDttm: formatDateTime(item.noticeCreateDttm)
    // })) : [];

    // 컬럼 제목 목록
    const columns = [
        ['noticeTitle', '제목'],
        ['memberName', '작성자'],
        ['noticeCreateDttm', '등록일']
    ];

    const handleRowClick = (index) => {
        // 클릭된 행의 noticeNo를 가져와서 상세 페이지로 이동합니다.
        const noticeNo = noticeList[index]?.noticeNo;

        console.log('handleRowClick [ noticeNo ] : ', noticeNo);

        navigate(`/notices/${noticeNo}`);
    };

    //   const jwt = require('jsonwebtoken');
    //   const decodedToken = jwt.decode(token);
    //   const memberNo = decodedToken.memberNo;
    //     console.log('memberNo: ', memberNo);
    //     const memberName = decodedToken.memberName;
    //     console.log('memberName: ', memberName);



    // 일정
    const scheduleData = [
        { dayOfWeek: "일요일", schedules: [] },
        { dayOfWeek: "월요일", schedules: ["위클리 미팅", "프로젝트 회의"] },
        { dayOfWeek: "화요일", schedules: ["미국 바이어 화상 회의"] },
        { dayOfWeek: "수요일", schedules: ["미국 바이어 최종 준비"] },
        { dayOfWeek: "목요일", schedules: ["미국 바이어 내방 미팅", "신입사원 간담회"] },
        { dayOfWeek: "금요일", schedules: ["사내 교육", "업무 보고"] },
        { dayOfWeek: "토요일", schedules: ["인왕산 등산"] },
    ];

    return (


        <main id="main" className="main">

            {/* 메인 환영 */}
            <div className="pagetitle">
                <div id="mainbox" className="p-4 p-md-5 mb-4 rounded text-body-emphasis" style={{ backgroundColor: "rgb(236, 11, 11, 0.17)" }}>
                    <div className="col-lg-6 px-0">
                        <h1 className="display-1" style={{ fontSize: "45px" }}>안녕하세요, {loginToken.memberName} 사원님!</h1>
                        <h2 className="lead my-3" style={{ fontSize: "30px" }}>오늘 하루도 화이팅하세요🤩</h2>
                    </div>
                </div>
            </div>

            {/* 전자결재 */}
            <div className="col-lg-12">
                <div className="row">
                    {approvalData.map(({ title, count }) => (
                        <ApprovalBox title={title} count={count} />
                    ))}
                </div>
            </div>

            {/* 공지사항 */}
            <div className="col-12">
                <div className="card recent-sales overflow-auto">
                    <h2 className="card-title"
                        style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
                        공지사항
                        <Link to={`/notices`} style={{ fontSize: '18px', color: '#EC0B0B' }}>
                            더보기
                        </Link>
                    </h2>
                    <BootstrapTable data={formattedNoticeList} columns={columns} onRowClick={handleRowClick} />
                </div>
            </div>

            {/* 일정 */}
            <div className="col-12">
                <div className="d-flex justify-content-between">
                    {scheduleData.map(({ dayOfWeek, schedules }) => (
                        <ScheduleBox key={dayOfWeek} dayOfWeek={dayOfWeek} schedules={schedules} />
                    ))}
                </div>
            </div>
        </main >
    );
}

export default Main;