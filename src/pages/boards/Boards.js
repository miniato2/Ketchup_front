// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "../../components/contents/SearchBar";
// import ButtonGroup from "../../components/contents/ButtonGroup";
// import BootstrapTable from "../../components/contents/BootstrapTable";
// import { callGetBoardListAPI } from "../../apis/BoardAPICalls";
// import PaginationButtons from "../../components/contents/PaginationButtons";
// import { decodeJwt } from "../../utils/tokenUtils";
// import { callDepartmentsAPI } from "../../apis/MemberAPICalls";
// import FormatDateTime from "../../components/contents/FormatDateTime";

// function Boards() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const result = useSelector(state => state.boardReducer);
//     const boardList = result.boardlist || [];
//     const departments = useSelector(state => state.departmentReducer);

//     const [totalItems, setTotalItems] = useState(0);
//     const [selectedDepartment, setSelectedDepartment] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [noRecords, setNoRecords] = useState(false);

//     const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
//     const userRole = loginToken.role;
//     const depNo = loginToken.depNo;
//     const depName = loginToken.depName;

//     useEffect(() => {
//         const fetchDepartments = async () => {
//             try {
//                 const response = await dispatch(callDepartmentsAPI());
//                 console.log("departments : ", response.payload);
//             } catch (error) {
//                 console.error("Error fetching departments:", error);
//             }
//         };
//         fetchDepartments();
//     }, [dispatch]);

//     useEffect(() => {
//         const fetchBoardList = async (searchKeyword = '') => {
//             try {
//                 let departmentNoToFetch = selectedDepartment || depNo; // 선택한 부서가 없을 경우 사용자의 부서를 기본값으로 설정
//                 if (userRole === 'LV3') { // LV3 사용자인 경우 선택한 부서로 설정
//                     departmentNoToFetch = selectedDepartment || depNo;
//                 }

//                 const response = await dispatch(callGetBoardListAPI({
//                     depNo: departmentNoToFetch,
//                     title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '',
//                     currentPage: currentPage,
//                     setTotalItems: setTotalItems
//                 }));

//                 if (response && response.payload && response.payload.length === 0) {
//                     setNoRecords(true);
//                 } else {
//                     setNoRecords(false);
//                 }

//             } catch (error) {
//                 console.error("Error fetching board list:", error);
//                 setNoRecords(true);
//             }
//         };
//         fetchBoardList(searchKeyword); // 검색어가 변경될 때마다 API 호출
//     }, [dispatch, depNo, selectedDepartment, searchKeyword, currentPage]);

//     const columns = [
//         ['boardNo', '번호'],
//         ['boardTitle', '제목'],
//         ['memberName', '작성자'],
//         ['boardCreateDttm', '등록일']
//     ];

//     const formattedBoardList = boardList.map(board => ({
//         ...board,
//         memberName: `${board.memberName} ${board.positionName}`,
//         boardCreateDttm: FormatDateTime(board.boardCreateDttm)
//     }));


//     const handleRowClick = (index) => {
//         const selectedBoard = boardList[index];
//         navigate(`/boards/${selectedBoard.boardNo}`);
//     };

//     const handleSearch = (searchKeyword) => {
//         setCurrentPage(1);
//         setSearchKeyword(searchKeyword);
//     };

//     const handleDepartmentChange = (event) => {
//         setSelectedDepartment(Number(event.target.value));
//     };

//     return (
//         <main id="main" className="main">
//             <div className="title">
//                 <h2>자료실</h2>
//                 {userRole === 'LV3' && (
//                     <div>
//                         <select onChange={handleDepartmentChange} value={selectedDepartment}>
//                             <option value={null}>부서 선택</option>
//                             {departments.map(department => (
//                                 <option key={department.depNo} value={department.depNo}>{department.depName}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}
//                 {(userRole === 'LV1' || userRole === 'LV2') && (
//                     <ul style={{ margin: 0, padding: 0 }}>
//                         <li style={{ listStyle: 'none' }}>{depName}</li>
//                     </ul>
//                 )}
//                 <SearchBar onSearch={handleSearch} value={searchKeyword} name={'제목 검색'} />
//             </div>

//             <div className="col-lg-12">
//                 <div className="row"></div>
//                 <div className="list">
//                     <Link to="/boards/insert">
//                         <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
//                     </Link>

//                     {noRecords ? (
//                         <p style={{ textAlign: 'center' }}>'{searchKeyword}' 제목 공지가 없습니다.</p>
//                     ) : (
//                         <BootstrapTable data={formattedBoardList} columns={columns} onRowClick={handleRowClick} />
//                     )}
//                     <PaginationButtons totalItems={totalItems} itemsPerPage={10} currentPage={currentPage} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default Boards;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/contents/SearchBar";
import ButtonGroup from "../../components/contents/ButtonGroup";
import BootstrapTable from "../../components/contents/BootstrapTable";
import { callGetBoardListAPI } from "../../apis/BoardAPICalls";
import PaginationButtons from "../../components/contents/PaginationButtons";
import { decodeJwt } from "../../utils/tokenUtils";
import { callDepartmentsAPI } from "../../apis/MemberAPICalls";
import FormatDateTime from "../../components/contents/FormatDateTime";

function Boards() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const result = useSelector(state => state.boardReducer);
    const boardList = result.boardlist || [];
    const departments = useSelector(state => state.departmentReducer);

    const [totalItems, setTotalItems] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const userRole = loginToken.role;
    const depNo = loginToken.depNo;
    const depName = loginToken.depName;

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await dispatch(callDepartmentsAPI());
                console.log("departments : ", response.payload);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchDepartments();
    }, [dispatch]);

    useEffect(() => {
        const fetchBoardList = async () => {
            try {
                let departmentNoToFetch = selectedDepartment || depNo; // 선택한 부서가 없을 경우 사용자의 부서를 기본값으로 설정
                if (userRole === 'LV3') { // LV3 사용자인 경우 선택한 부서로 설정
                    departmentNoToFetch = selectedDepartment || depNo;
                }

                const response = await dispatch(callGetBoardListAPI({
                    depNo: departmentNoToFetch,
                    title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '',
                    currentPage: currentPage,
                    setTotalItems: setTotalItems
                }));

            } catch (error) {
                console.error("Error fetching board list:", error);
            }
        };
        fetchBoardList();
    }, [dispatch, depNo, selectedDepartment, searchKeyword, currentPage]);

    const columns = [
        ['boardNo', '번호'],
        ['boardTitle', '제목'],
        ['memberName', '작성자'],
        ['boardCreateDttm', '등록일']
    ];

    const formattedBoardList = boardList.map(board => ({
        ...board,
        memberName: `${board.memberName} ${board.positionName}`,
        boardCreateDttm: FormatDateTime(board.boardCreateDttm)
    }));


    const handleRowClick = (index) => {
        const selectedBoard = boardList[index];
        navigate(`/boards/${selectedBoard.boardNo}`);
    };

    const handleSearch = (searchKeyword) => {
        setCurrentPage(1);
        setSearchKeyword(searchKeyword);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(Number(event.target.value));
    };

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>자료실</h2>
                {userRole === 'LV3' && (
                    <div>
                        <select onChange={handleDepartmentChange} value={selectedDepartment}>
                            <option value={null}>부서 선택</option>
                            {departments.map(department => (
                                <option key={department.depNo} value={department.depNo}>{department.depName}</option>
                            ))}
                        </select>
                    </div>
                )}
                {(userRole === 'LV1' || userRole === 'LV2') && (
                    <ul style={{ margin: 0, padding: 0 }}>
                        <li style={{ listStyle: 'none' }}>{depName}</li>
                    </ul>

                )}
                <SearchBar onSearch={handleSearch} value={searchKeyword} name={'제목 검색'} />
            </div>

            <div className="col-lg-12">
                <div className="row"></div>
                <div className="list">
                    <Link to="/boards/insert">
                        <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
                    </Link>

                    {formattedBoardList.length === 0 && (
                        <>
                            <BootstrapTable data={formattedBoardList} columns={columns} onRowClick={handleRowClick} />
                            <p style={{ textAlign: 'center' }}>'{searchKeyword}' 제목 게시물이 없습니다.</p>
                        </>
                    )}

                    {formattedBoardList.length > 0 && (
                        <BootstrapTable data={formattedBoardList} columns={columns} onRowClick={handleRowClick} />
                    )}
                    <PaginationButtons totalItems={totalItems} itemsPerPage={10} currentPage={currentPage} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
                </div>
            </div>
        </main>
    );
}

export default Boards;
