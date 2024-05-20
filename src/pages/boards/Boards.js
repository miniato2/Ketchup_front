// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // import SearchBar from "../../components/contents/SearchBar";
// // import ButtonGroup from "../../components/contents/ButtonGroup";
// // import BootstrapTable from "../../components/contents/BootstrapTable";
// // import { callGetBoardListAPI } from "../../apis/BoardAPICalls";
// // import PaginationButtons from "../../components/contents/PaginationButtons";
// // import { decodeJwt } from "../../utils/tokenUtils";
// // import { callDepartmentsAPI } from "../../apis/MemberAPICalls";

// // function Boards() {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const result = useSelector(state => state.boardReducer);
// //     const boardList = result.boardlist || [];

// //     const [departments, setDepartments] = useState([]);      //  모든 부서 목록을 저장
// //     const [selectedDepartments, setSelectedDepartments] = useState([]);      // 사용자가 선택한 부서를 저장
// //     const [showDepartmentList, setShowDepartmentList] = useState(false);

// //     const [totalItems, setTotalItems] = useState(0); // totalItems 상태 추가
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [title, setTitle] = useState('');

// //     const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
// //     const userRole = loginToken.role;
// //     const depNo = loginToken.depNo;
// //     const depName = loginToken.depName;

// //     useEffect(() => {
// //         const fetchDepartments = async () => {
// //             try {
// //                 if (userRole === 'LV3') {
// //                     const response = await dispatch(callDepartmentsAPI());
// //                     setDepartments(response.payload);
// //                 } else {
// //                     setSelectedDepartments([depNo]);
// //                 }
// //             } catch (error) {
// //                 console.error("Error fetching departments:", error);
// //             }
// //         };
// //         fetchDepartments();
// //     }, [userRole, depNo, dispatch]);

// //     const toggleDepartmentList = () => {
// //         setShowDepartmentList(prevState => !prevState);
// //     };

// //     const onChangeHandler = (e) => {
// //         setTitle(e.target.value);
// //     }

// //     useEffect(() => {
// //         const fetchBoardList = async (searchKeyword = '') => {
// //             dispatch(callGetBoardListAPI({
// //                 depNo: depNo,
// //                 title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '',
// //                 currentPage: currentPage,
// //                 setTotalItems: setTotalItems // setTotalItems 함수를 전달
// //             }));
// //         };
// //         fetchBoardList();
// //     }, [depNo, title, currentPage, dispatch]);

// //     const columns = [
// //         ['boardNo', '번호'],
// //         ['boardTitle', '제목'],
// //         ['memberName', "작성자"],
// //         ['boardCreateDttm', '작성일']
// //     ];

// //     const handleRowClick = (index) => {
// //         const selectedBoard = boardList[index];
// //         navigate(`/boards/${selectedBoard.boardNo}`);
// //     };

// //     const handleSearch = (searchKeyword) => {
// //         setCurrentPage(1);
// //         setTitle(searchKeyword);
// //     };

// //     const handleDepartmentChange = (event) => {
// //         const selectedDepNo = Number(event.target.value);
// //         const updatedDepartments = [...selectedDepartments];
// //         if (updatedDepartments.includes(selectedDepNo)) {
// //             const index = updatedDepartments.indexOf(selectedDepNo);
// //             updatedDepartments.splice(index, 1);
// //         } else {
// //             updatedDepartments.push(selectedDepNo);
// //         }
// //         setSelectedDepartments(updatedDepartments);
// //     };

// //     return (
// //         <main id="main" className="main">
// //             <div className="title">
// //                 <h2>자료실</h2>
// //                 {userRole === 'LV3' && (
// //                     <div>
// //                         {showDepartmentList && (
// //                             <select onChange={handleDepartmentChange} value={selectedDepartments}>
// //                                 <option value="">부서 선택</option>
// //                                 {selectedDepartments.map(department => (
// //                                     <option key={department.depNo} value={department.depNo}>{department.depName}</option>
// //                                 ))}
// //                             </select>
// //                         )}
// //                     </div>
// //                 )}
// //                 {userRole === 'LV3' && (!departments || departments.length === 0) && (
// //                     <div>부서 정보를 불러올 수 없습니다.</div>
// //                 )}
// //                 {(userRole === 'LV1' || userRole === 'LV2') && (
// //                     <ul>
// //                         <li>{depName}</li>
// //                     </ul>
// //                 )}
// //                 <SearchBar onSearch={handleSearch} />
// //             </div>

// //             <div className="col-lg-12">
// //                 <div className="row"></div>
// //                 <div className="list">
// //                     <Link to="/boards/insert">
// //                         <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
// //                     </Link>

// //                     {boardList.length === 0 ? (
// //                         <p style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-40%, -50%)', textAlign: 'center', width: '100%' }}>
// //                             검색어에 해당하는 게시물이 없습니다.
// //                         </p>
// //                     ) : (
// //                         <BootstrapTable data={boardList} columns={columns} onRowClick={handleRowClick} />
// //                     )}
// //                     <PaginationButtons totalItems={totalItems} itemsPerPage={10} currentPage={currentPage} onPageChange={(pageNumber) => setCurrentPage(pageNumber)}/>
// //                 </div>
// //             </div>
// //         </main>
// //     );
// // }

// // export default Boards;



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
//             dispatch(callGetBoardListAPI({
//                 depNo: selectedDepartment || depNo, // 선택한 부서가 없으면 사용자의 부서 선택
//                 title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '',
//                 currentPage: currentPage,
//                 setTotalItems: setTotalItems
//             }));
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
//                 {userRole === 'LV3' && (!departments || departments.length === 0) && (
//                     <div>부서 정보를 불러올 수 없습니다.</div>
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

//                     {boardList.length === 0 ? (
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
    const [selectedDepartment, setSelectedDepartment] = useState('');
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
                const response = await dispatch(callGetBoardListAPI({
                    depNo: selectedDepartment || depNo,
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
    }, [selectedDepartment, depNo, title, currentPage, dispatch]);
    
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
                            <option value="">부서 선택</option>
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
