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

// function Boards() {
//     const dispatch = useDispatch();
//     const result = useSelector(state => state.boardReducer);
//     const departments = useSelector(state => state.departmentReducer);
//     const boardList = result.boardlist || [];
//     const [totalItems, setTotalItems] = useState(0);
//     const navigate = useNavigate();
//     const [selectedDepartment, setSelectedDepartment] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [title, setTitle] = useState('');
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

//     const onChangeHandler = (e) => {
//         setTitle(e.target.value);
//     }

//     useEffect(() => {
//         const fetchBoardList = async (searchKeyword = '') => {
//             try {
//                 const response = await dispatch(callGetBoardListAPI({
//                     depNo: selectedDepartment || depNo,
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
//         fetchBoardList();
//     }, [selectedDepartment, depNo, title, currentPage, dispatch]);
    
//     const columns = [
//         ['boardNo', '번호'],
//         ['boardTitle', '제목'],
//         ['memberName', "작성자"],
//         ['boardCreateDttm', '작성일']
//     ];

//     const handleRowClick = (index) => {
//         const selectedBoard = boardList[index];
//         navigate(`/boards/${selectedBoard.boardNo}`);
//     };

//     const handleSearch = (searchKeyword) => {
//         setCurrentPage(1);
//         setTitle(searchKeyword);
//         setTitle('');
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
//                             <option value="">부서 선택</option>
//                             {departments.map(department => (
//                                 <option key={department.depNo} value={department.depNo}>{department.depName}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}
//                 {(userRole === 'LV1' || userRole === 'LV2') && (
//                     <ul>
//                         <li>{depName}</li>
//                     </ul>
//                 )}
//                 <SearchBar onSearch={handleSearch} />
//             </div>

//             <div className="col-lg-12">
//                 <div className="row"></div>
//                 <div className="list">
//                     <Link to="/boards/insert">
//                         <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
//                     </Link>

//                     {noRecords ? (
//                         <p style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-40%, -50%)', textAlign: 'center', width: '100%' }}>
//                             검색어에 해당하는 게시물이 없습니다.
//                         </p>
//                     ) : (
//                         <BootstrapTable data={boardList} columns={columns} onRowClick={handleRowClick} />
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

function Boards() {
    const dispatch = useDispatch();
    const result = useSelector(state => state.boardReducer);
    const departments = useSelector(state => state.departmentReducer);
    const boardList = result.boardlist || [];
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState('');
    const [noRecords, setNoRecords] = useState(false);

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

    const onChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        const fetchBoardList = async (searchKeyword = '') => {
            try {
                let departmentNoToFetch = selectedDepartment || depNo; // 선택한 부서가 없을 경우 사용자의 부서를 기본값으로 설정
                if (userRole === 'LV3') { // LV3 사용자인 경우 선택한 부서로 설정
                    departmentNoToFetch = selectedDepartment;
                }
    
                const response = await dispatch(callGetBoardListAPI({
                    depNo: departmentNoToFetch,
                    title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '',
                    currentPage: currentPage,
                    setTotalItems: setTotalItems
                }));
    
                if (response && response.payload && response.payload.length === 0) {
                    setNoRecords(true);
                } else {
                    setNoRecords(false);
                }
            } catch (error) {
                console.error("Error fetching board list:", error);
                setNoRecords(true);
            }
        };
        fetchBoardList();
    }, [selectedDepartment, depNo, title, currentPage, userRole, dispatch]);
    
    const columns = [
        ['boardNo', '번호'],
        ['boardTitle', '제목'],
        ['memberName', "작성자"],
        ['boardCreateDttm', '작성일']
    ];

    const handleRowClick = (index) => {
        const selectedBoard = boardList[index];
        navigate(`/boards/${selectedBoard.boardNo}`);
    };

    const handleSearch = (searchKeyword) => {
        setCurrentPage(1);
        setTitle(searchKeyword);
        setTitle('');
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
                    <ul>
                        <li>{depName}</li>
                    </ul>
                )}
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="col-lg-12">
                <div className="row"></div>
                <div className="list">
                    <Link to="/boards/insert">
                        <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
                    </Link>

                    {noRecords ? (
                        <p style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-40%, -50%)', textAlign: 'center', width: '100%' }}>
                            검색어에 해당하는 게시물이 없습니다.
                        </p>
                    ) : (
                        <BootstrapTable data={boardList} columns={columns} onRowClick={handleRowClick} />
                    )}
                    <PaginationButtons totalItems={totalItems} itemsPerPage={10} currentPage={currentPage} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
                </div>
            </div>
        </main>
    );
}

export default Boards;
