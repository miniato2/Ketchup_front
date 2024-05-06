import { Link } from "react-router-dom";
import BootstrapTable from "../components/contents/BootstrapTable";
import ApprovalBox from "../components/contents/ApprovalBox";
import ScheduleBox from "../components/contents/ScheduleBox";

function Main() {
    // 결재 
    const approvalData = [
        { title: "내가 결재해야 하는 문서", count: 3 },
        { title: "결재 대기중인 나의 문서", count: 5 },
        { title: "승인된 나의 문서", count: 10 },
        { title: "반려된 나의 문서", count: 2 },
    ];

    // 공지사항
    const notices = [
        { '제목': '[ 필독 📢 ] 사내규정 변경의 건', '작성자': '남윤진 대표', '작성일': '2024-04-25' },
        { '제목': '[ 필독 📢 ][공지] 무선 네트워크 패스워드 변경작업 안내 (변경일시 4/26 금...', '작성자': '이후영 차장', '작성일': '2024-04-21' },
        { '제목': '[공지] 무선 네트워크 패스워드 변경작업 안내 (변경일시 4/26 금요일 20시)', '작성자': '이후영 차장', '작성일': '2024-04-19' }
    ];
    // 공지사항 컬럼 제목 목록
    const columns = ['제목', '작성자', '작성일'];

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
                        <h1 className="display-1" style={{ fontSize: "45px" }}>안녕하세요, 김현지 사원님!</h1>
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
                    <h2 className="card-title" style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', justifyContent: 'space-between',  alignItems: 'center', paddingLeft: '20px', paddingRight: '20px'}}>
                        공지사항
                        <Link to={`/notices`} style={{ fontSize: '18px', color: '#EC0B0B' }}>
                            더보기
                        </Link>
                    </h2>
                    <BootstrapTable data={notices} columns={columns} />
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