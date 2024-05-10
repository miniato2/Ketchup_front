import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callMembersAPI } from "../../apis/MemberAPICalls";
import { Table } from "react-bootstrap";
import PaginationButtons from "../../components/contents/PaginationButtons";
import { useNavigate } from "react-router-dom";

function Members() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members?.data?.content;
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
   
    const navigate = useNavigate();



    useEffect(
        () => {
            if (token !== null) {
                dispatch(callMembersAPI());
              
            }

        }, []

    );

    const itemsPerPage = 10; // 페이지당 아이템 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const handleRowClick = (memberNo) => {
        // 클릭된 행의 noticeNo를 가져와서 상세 페이지로 이동합니다.
       
    
        console.log('handleRowClick [ memberNo ] : ' , memberNo);
    
        navigate(`/members/${memberNo}`);
      };
    


    return (
        <>
            <main id="main">
                <div >
                    <Table>

                        <thead>
                            <tr>
                                <th>사진</th>
                                <th>부서</th>
                                <th>직급</th>
                                <th>이름</th>
                                <th>연락처</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(memberList) && memberList.map((member) => (
                                <tr key={member.memberNo} onClick={() => handleRowClick(member.memberNo)}>
                                    <td>
                                        <img src={`/img/${member.imgUrl}`} width="30" height="30" alt="member" />
                                    </td>
                                    <td>{member.department.depName}</td>
                                    <td>{member.position.positionName}</td>
                                    <td>{member.memberName}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.privateEmail}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <PaginationButtons
                        totalItems={memberList?.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)} // 페이지 변경 핸들러 전달
                    />
                </div>
            </main>
        </>

    );
}

export default Members;
