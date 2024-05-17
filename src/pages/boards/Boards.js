import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/contents/SearchBar";
import ButtonGroup from "../../components/contents/ButtonGroup";
import BootstrapTable from "../../components/contents/BootstrapTable";
import { callGetBoardListAPI } from "../../apis/BoardAPICalls";
import PaginationButtons from "../../components/contents/PaginationButtons";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function Boards() {
    const dispatch = useDispatch();
    const result = useSelector(state => state.boardReducer);
    const boardList = result.boardlist || [];
    const navigate = useNavigate();
    const [userDepartments, setUserDepartments] = useState([]);
    // const [boardList, setBoardList] = useState([]);


    // 현재 사용자 정보 가져오기
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const userRole = loginToken.role;
    const depNo = loginToken.depNo;
    const depName = loginToken.depName;

    useEffect(() => {
        // LV3 이상 권한을 가진 사용자에 대해서만 회원 정보를 가져옴
        if (userRole !== 'LV3') {
            setUserDepartments([{ depNo: depNo, depName: depName }]);
        }
    }, [userRole, depNo, depName]);
    

    useEffect(() => {
        // 부서 정보가 변경될 때마다 해당 부서의 자료실 목록을 가져옴
        const fetchBoardList = async (searchKeyword = '') => {
            const departmentNo = userRole === 'LV3' ? null : depNo;
            const params = {
                title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '', // searchKeyword가 문자열인 경우에만 소문자로 변환
                depNo: departmentNo
            };
            dispatch(callGetBoardListAPI({ params }));
        };
        fetchBoardList();
    }, [userRole, depNo, dispatch]);


    // useEffect(() => {
    //     // LV3 이상 권한을 가진 사용자에 대해서만 회원 정보를 가져옴
    //     if (userRole !== 'LV3') {
    //         const fetchData = async () => {
    //             try {
    //                 // 사용자 정보를 가져오는 부분을 제거하고 setUserDepartments 함수를 사용하여 사용자의 부서 정보를 설정합니다.
    //                 setUserDepartments([{ depNo: depNo, depName: depName }]);
    //             } catch (error) {
    //                 console.error("Error getting member information: ", error);
    //             }
    //         };
    //         fetchData();
    //     }
    // }, [userRole, depNo, depName]);
    

    // useEffect(() => {
    //     // 부서 정보가 변경될 때마다 해당 부서의 자료실 목록을 가져옴
    //     const fetchBoardList = async (searchKeyword = '') => {
    //         const departmentNo = userRole === 'LV3' ? null : depNo;
    //         console.log("depNo : ", depNo);
    //         console.log("departmentNo : ", departmentNo);
    //         const params = {
    //             title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '', // searchKeyword가 문자열인 경우에만 소문자로 변환
    //             depNo: departmentNo
    //         };
    //         console.log("params : ", params);
    //         dispatch(callGetBoardListAPI({ params }));
    //     };
    //     fetchBoardList();
    // }, [userRole, depNo, dispatch]);
   

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
        dispatch(callGetBoardListAPI({ title: searchKeyword, depNo }));
    };

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>자료실</h2>
                {userDepartments.length > 0 && (
                    <ul>
                        {userDepartments.map(department => (
                            <li key={department.depNo}>{department.depName}</li>
                        ))}
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
                    <BootstrapTable data={boardList} columns={columns} onRowClick={handleRowClick} />
                    {/* <PaginationButtons totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} /> */}
                </div>
            </div>
        </main>
    );
}

export default Boards;
