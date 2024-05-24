import { useEffect, useState } from 'react';
import AppModalCss from './AppModal.module.css';
import Style from "./AppLine.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { callMembersAPI } from '../../apis/MemberAPICalls';
import { decodeJwt } from "../../utils/tokenUtils";

function AppLineModal({ setModalControl, appLine, setAppLine }) {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const dispatch = useDispatch();
    const memberList = useSelector(state => state.memberReducer); //전체 사원

    const [search, setSearch] = useState('');

    const [selectedMember, setSelectedMember] = useState({
        alMember: {
            memberNo: '', memberName: '',
            position: { positionName: '' },
            department: { depName: '' }
        },
        alType: '',
        alSequence: ''
    }) //선택된 사원 (추가 전)

    const groupByDepartment = () => {
        const groupedMembers = {};
        Array.isArray(memberList) && memberList.map(member => {
            if (!groupedMembers[member.department.depName]) {
                groupedMembers[member.department.depName] = [];
            }
            groupedMembers[member.department.depName].push(member);
        });
        return groupedMembers;
    }; //부서별로그룹

    const filteredGroupByDepartment = () => {
        const groupedMembers = groupByDepartment();
        const filteredGroups = {};

        Object.entries(groupedMembers).forEach(([department, members]) => {
            const filteredMembers = members.filter(member =>
                member.memberName.toLowerCase().includes(search.toLowerCase())
            );

            if (filteredMembers.length > 0) {
                filteredGroups[department] = filteredMembers;
            }
        });

        return filteredGroups;
    }; //부서별 그룹 + 검색

    const [selectedAppList, setSelectedAppList] = useState([]); //결재선
    const [count, setCount] = useState(1); //결재순서

    const column = ['순번', '부서', '이름', '직급', '구분'];

    useEffect(() => {
        dispatch(callMembersAPI());
        if (appLine[0].sequence !== '') {
            setSelectedAppList(appLine);
            setCount(appLine.length + 1);
        }
    }, [])

    const onClickList = (member) => {
        setSelectedMember({
            alMember: member,
            alType: '',
            sequence: ''
        });
    }

    const onDoubleClickList = (member) => {
        if (!selectedAppList.find(item => item.alMember.memberNo === member.memberNo) && member.memberNo !== loginToken.memberNo) {
            setSelectedAppList([
                ...selectedAppList,
                {
                    alMember: {
                        memberNo: member.memberNo,
                        memberName: member.memberName,
                        department: {
                            depName: member.department.depName
                        },
                        position: {
                            positionName: member.position.positionName
                        }
                    },
                    alType: '일반',
                    sequence: count
                }
            ]);
            setCount(count + 1);
        }
    }

    const onClickAddButton = () => {
        if (selectedMember.alMember.memberNo !== loginToken.memberNo &&
            selectedMember.alMember.memberNo !== '' &&
            !selectedAppList.find(item => item.alMember.memberNo === selectedMember.alMember.memberNo)) {
            setSelectedAppList([
                ...selectedAppList,
                {
                    alMember: {
                        memberNo: selectedMember.alMember.memberNo,
                        memberName: selectedMember.alMember.memberName,
                        department: {
                            depName: selectedMember.alMember.department.depName
                        },
                        position: {
                            positionName: selectedMember.alMember.position.positionName
                        }
                    },
                    alType: '일반',
                    sequence: count
                }
            ]);
            setCount(count + 1);
        }
    }
    const onChangeType = (member, e) => { //결재 타입 변경
        const updatedList = selectedAppList.map(item => {
            if (item.sequence === member.sequence) {
                return {
                    ...item,
                    alType: e.target.value
                };
            }
            return item;
        });
        setSelectedAppList(updatedList);
    }

    const onClickRmvButton = () => { //삭제 버튼
        if (selectedAppList.length > 0) {
            const removeList = selectedAppList.filter(app => app.sequence !== count - 1);
            setSelectedAppList(removeList);
            setCount(count - 1);
        }
    }

    const onClickSubmit = () => { //저장 버튼
        if (selectedAppList.length < 2) {
            alert("최소 두명 이상 지정해 주세요");
        } else {
            setAppLine(selectedAppList);
            setModalControl({ appLineModal: false, refLineModal: false });
        }
    }

    const onClickRemoveSearch = () => {
        setSearch('');
    }
    return (
        <div className={AppModalCss.appModal}>
            <div className={AppModalCss.appModalBox}>
                <h1>결재선 추가</h1>
                <div className={AppModalCss.appModalContents}>
                    <div>
                        <h5>조직도</h5>
                        <div className={AppModalCss.members}>
                            <div class="search-form d-flex align-items-center" style={{ marginBottom: '0px', position:'sticky', top:'0px'}}>
                                    <input type="text" name="search" placeholder="이름을 입력하세요" value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <button type="button" title="SearchBtn" onClick={onClickRemoveSearch}><i class='bi bi-x'></i></button>
                            </div>

                            <ul>
                                {Object.entries(filteredGroupByDepartment()).map(([department, members]) => (
                                    <li key={department}>
                                        <h5 style={{ marginTop: '5px', marginBottom: '0px' }}>{department}</h5>
                                        <ul>
                                            {members.map((member, index) => (
                                                <li key={member.memberNo}
                                                    onClick={() => onClickList(member)}
                                                    onDoubleClick={() => onDoubleClickList(member)}
                                                    className={selectedMember && selectedMember.alMember.memberNo === member.memberNo ? AppModalCss.selectedLi : ''}
                                                >
                                                    {member.memberName}
                                                    &nbsp;
                                                    {member.position.positionName}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                    <div className={AppModalCss.btnDiv}>
                        <button onClick={() => onClickAddButton()}>추가</button>
                        <br></br>
                        <button onClick={() => onClickRmvButton()}>삭제</button>
                    </div>
                    <div >
                        <h5>결재자</h5>
                        <div className={AppModalCss.appMem}>
                            <table className={Style.appTable}>
                                <thead>
                                    <tr>
                                        {column.map((item) => (
                                            <th scope='col' key={item} style={{ width: '20%' }}>{item}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {!!selectedAppList && selectedAppList.map((item) => (
                                        <tr>
                                            <td>{item.sequence}</td>
                                            <td>{item.alMember.department.depName}</td>
                                            <td>{item.alMember.memberName}</td>
                                            <td>{item.alMember.position.positionName}</td>
                                            <td>
                                                <select onChange={(e) => onChangeType(item, e)} style={{ border: 'none' }}>
                                                    <option value={'일반'}>일반</option>
                                                    <option value={'전결'}>전결</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={AppModalCss.appBtns}>
                    <button className="back-btn" onClick={() => setModalControl({ appLineModal: false, refLineModal: false })}>취소</button>
                    <button className="move-btn" onClick={onClickSubmit}>저장</button>
                </div>
            </div>
        </div>
    )
}

export default AppLineModal;