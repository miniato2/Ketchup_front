function Main() {
    return (
        <main id="main" className="main">

            <div className="pagetitle">

                <div id="mainbox" className="p-4 p-md-5 mb-4 rounded text-body-emphasis" style={{ backgroundColor: "rgb(236, 11, 11, 0.17)" }}>
                    <div className="col-lg-6 px-0">
                        <h1 className="display-1" style={{ fontSize: "45px"}}>안녕하세요, 김현지 사원님!</h1>
                        <h2 className="lead my-3" style={{ fontSize: "30px"}}>오늘 하루도 화이팅하세요🤩</h2>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">내가 결재해야하는 문서</h5>
                                <div className="d-flex justify-content-end">
                                    <h3>0</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card revenue-card">
                            <div className="card-body">
                                <h5 className="card-title">결재 대기중인 나의 문서</h5>
                                <div className="d-flex justify-content-end">
                                    <h3>0</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card revenue-card">
                            <div className="card-body">
                                <h5 className="card-title">승인된 나의 문서</h5>
                                <div className="d-flex justify-content-end">
                                    <h3>0</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card revenue-card">
                            <div className="card-body">
                                <h5 className="card-title">반려된 나의 문서</h5>
                                <div className="d-flex justify-content-end">
                                    <h3>0</h3>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 공지사항 */}
                    <div className="col-12">
                        <div className="card recent-sales overflow-auto">
                            <div className="card-body">
                                <h5 className="card-title">공지사항</h5>

                                <div className="table">
                                    <table className="table table-border">
                                        <thead>
                                            <tr>
                                                <th scope="col">공지글 제목</th>
                                                <th scope="col">작성자</th>
                                                <th scope="col">작성 날짜</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><a href="#">1</a></th>
                                                <td>남윤진</td>
                                                <td>4/10 수요일 학원 휴강 공지</td>

                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">2</a></th>
                                                <td>남윤진</td>
                                                <td>출퇴근 시간간 입실 방법 안내</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">3</a></th>
                                                <td>이후영</td>
                                                <td>프로토타이핑 종료 일정 변경 안내</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">4</a></th>
                                                <td>이후영</td>
                                                <td>5월 저녁 식비지원 설문조사 참여 독촉의 건</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">5</a></th>
                                                <td>남윤진</td>
                                                <td>여권 사진 촬영 기한 안내</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <span>더보기</span>
                                </div>

                            </div>
                        </div>

                        {/* 일정 */}
                        <div className="col-12">
                            <div className="row">

                                <div className="col-xxl-2 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body" style={{height: "250px", overflow: "auto"}}>
                                            <h5 className="card-title" style={{ borderBottom: "0.5px solid lightGray" }}>월요일</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-3 align-items-center">
                                                    <h6>- 위클리 미팅</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body" style={{height: "250px", overflow: "auto"}}>
                                            <h5 className="card-title" style={{ borderBottom: "0.5px solid lightGray" }}>화요일</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-3 align-items-center">
                                                    <h6>- 미국 바이어 화상 회의</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body" style={{height: "250px", overflow: "auto"}}>
                                            <h5 className="card-title" style={{ borderBottom: "0.5px solid lightGray" }}>수요일</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-3 align-items-center">
                                                    <h6>- 미국 바이어 최종 준비</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body" style={{height: "250px", overflow: "auto"}}>
                                            <h5 className="card-title" style={{ borderBottom: "0.5px solid lightGray" }}>목요일</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-2 align-items-center">
                                                    <h6>- 미국 바이어 내방 미팅</h6>
                                                    <h6>- 신입사원 간담회</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body" style={{height: "250px", overflow: "auto"}}>
                                            <h5 className="card-title" style={{ borderBottom: "0.5px solid lightGray" }}>금요일</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-2 align-items-center">
                                                    <h6>- 승진 발표</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body" style={{height: "250px", overflow: "auto"}}>
                                            <h5 className="card-title"  style={{ borderBottom: "0.5px solid lightGray" }}>토요일</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="ps-2 align-items-center">
                                                    <h6>- 인왕산 등산</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;