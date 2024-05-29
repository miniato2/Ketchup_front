import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { callMembersAPI } from '../../../apis/MemberAPICalls';
import { red } from '@mui/material/colors';
import { Box, Grid, Checkbox } from '@mui/material';
import { decodeJwt } from '../../../utils/tokenUtils';
import SearchBar from '../../contents/SearchBar';

const SubscriptionList = ({ subscribedMembers, setSubscribedMembers, selectedStatus, setSelectedStatus }) => {
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const dptNo = token?.depNo;

    const schedules = useSelector(state => state.scheduleReducer);
    const scheduleList = schedules?.results?.schedule || [];

    const members = useSelector(state => state.memberReducer);
    const filteredMemberList = useMemo(() => {
        return Array.isArray(members)
            ? members.filter(member => member?.department?.depNo === dptNo)
            : [];
    }, [members, dptNo]);

    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const initialSubscribedMembers = filteredMemberList.map(member => member.memberNo);
        setSubscribedMembers(initialSubscribedMembers);
    }, [filteredMemberList, setSubscribedMembers]);

    useEffect(() => {
        dispatch(callMembersAPI());
    }, [dispatch]);

    const handleSearch = (searchKeyword) => {
        setSearchKeyword(searchKeyword);
        dispatch(callMembersAPI());
    };

    const handleSubscribeChange = (memberNo) => {
        if (subscribedMembers.includes(memberNo)) {
            setSubscribedMembers(subscribedMembers.filter(id => id !== memberNo));
        } else {
            setSubscribedMembers([...subscribedMembers, memberNo]);
        }
    };

    const handleStatusChange = (status) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(s => s !== status));
        } else {
            setSelectedStatus([...selectedStatus, status]);
        }
    };

    const filterTableByMembers = (filteredList) => (
        <div style={{ maxHeight: '343px', overflowY: 'scroll' }}>
            <Table>
                <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr>
                        <th>구독</th>
                        <th>프로필 사진</th>
                        <th>직급</th>
                        <th>이름</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((member) => (
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
                    {filteredList.length === 0 && (
                        <tr>
                            <td colSpan={4}>
                                <h6>검색 결과가 없습니다.</h6>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );

    const scheduleStatuses = ["예정", "진행 중", "완료", "보류", "막힘"];

    const filterTablebyStatus = () => (
        <Table>
            <thead>
                <tr>
                    <th>선택</th>
                    <th>일정 상태</th>
                </tr>
            </thead>
            <tbody>
                {scheduleStatuses.map(status => (
                    <tr key={status}>
                        <td>
                            <Checkbox
                                checked={selectedStatus.includes(status)}
                                onChange={() => handleStatusChange(status)}
                                sx={{ color: red[800], '&.Mui-checked': { color: red[600] } }}
                            />
                        </td>
                        <td>{status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    return (
        <Box p={3} mt={4} display="flex" justifyContent="space-between" width="81.3vw">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                        <h5 style={{ marginRight: '16px' }}>참여 인원별 일정</h5>
                        <SearchBar onSearch={handleSearch} value={searchKeyword} name={'이름으로 검색'} />
                    </Grid>
                    {filterTableByMembers(filteredMemberList)}
                </Grid>
                <Grid item xs={12} md={6}>
                    <h5 style={{ marginBottom: 25 }}>진행상태별 일정</h5>
                    {filterTablebyStatus()}
                </Grid>
            </Grid>
        </Box >
    );
};

export default SubscriptionList;
