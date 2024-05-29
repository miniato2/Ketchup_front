import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import SearchBar from '../../contents/SearchBar';
import { callPageMembersAPI } from '../../../apis/MemberAPICalls';
import PaginationButtons from '../../contents/PaginationButtons';
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import { Box, Grid } from '@mui/material';
import { decodeJwt } from '../../../utils/tokenUtils';

const SubscriptionList = ({ subscribedMembers, setSubscribedMembers }) => {
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const dptNo = token?.depNo;
    console.log("dptNo??", dptNo);
    const schedules = useSelector(state => state.scheduleReducer);
    const scheduleList = schedules?.results?.schedule || [];
    console.log("scheduleList가 왜 비어있음?", scheduleList);
    const members = useSelector(state => state.memberReducer);
    const memberList = members?.data?.content || [];
    console.log("memberList", memberList);
    const filteredMemberList = memberList.filter(member => member.department.depNo === dptNo);
    console.log("filteredMemberList SubscriptionList에서", filteredMemberList);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const initialSubscribedMembers = filteredMemberList.map(member => member.memberNo);
        setSubscribedMembers(initialSubscribedMembers);
    }, []);

    useEffect(() => {
        dispatch(callPageMembersAPI(currentPage, searchKeyword));
    }, [dispatch, currentPage, searchKeyword]);

    const handleSearch = (searchKeyword) => {
        setSearchKeyword(searchKeyword);
        dispatch(callPageMembersAPI(currentPage, searchKeyword));
    };

    const handleSubscribeChange = (memberNo) => {
        if (subscribedMembers.includes(memberNo)) {
            setSubscribedMembers(subscribedMembers.filter(id => id !== memberNo));
        } else {
            setSubscribedMembers([...subscribedMembers, memberNo]);
        }
    };

    return (
        <Box p={3} mt={7} display={'flex'} width={'1000px'}>
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <div>
                        <h5>다가오는 일정</h5>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>일정 제목</th>
                                <th>작성자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleList.slice(0, 5).map((schedule) => (
                                <tr key={schedule.skdNo}>
                                    <td>{schedule.skdStartDttm}</td>
                                    <td>{schedule.skdName}</td>
                                    <td>{schedule.authorName}</td>
                                </tr>
                            ))}
                            {scheduleList.length === 0 &&
                                <td colSpan={6}>
                                    <h6>일정 목록이 비어있습니다.</h6>
                                </td>
                            }
                        </tbody>
                    </Table>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={12} xs={6} lg={12}>
                    <div>
                        <h5>일정 구독</h5>
                        <SearchBar onSearch={handleSearch} value={searchKeyword} name={'이름으로 검색'} />
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>구독</th>
                                <th>프로필 사진</th>
                                <th>직급</th>
                                <th>이름</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMemberList.map((member) => (
                                <tr key={member.memberNo}>
                                    <td>
                                        <Checkbox
                                            checked={subscribedMembers.includes(member.memberNo)}
                                            onChange={() => handleSubscribeChange(member.memberNo)}
                                            sx={{ color: red[800], '&.Mui-checked': { color: red[600] } }}
                                        />
                                    </td>
                                    <td>
                                        <img src={`/img/${member.imgUrl}`} width={30} height={30} alt='memberImg' />
                                    </td>
                                    <td>{member.position.positionName}</td>
                                    <td>{member.memberName}</td>
                                </tr>
                            ))}
                            {/* {filteredMemberList.length === 0 && (
                                <tr>
                                    <td colSpan={6}>
                                        <h6>검색 결과가 없습니다.</h6>
                                    </td>
                                </tr>
                            )} */}
                        </tbody>
                    </Table>
                    <PaginationButtons
                        totalItems={members?.data?.totalElements}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SubscriptionList;
