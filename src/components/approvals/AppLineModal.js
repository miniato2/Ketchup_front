import { useEffect, useState } from 'react';
import AppModalCss from './AppModal.module.css';
import Style from "./AppLine.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { callMembersAPI } from '../../apis/MemberAPICalls';

function AppLineModal({ setModalControl, setAppLine }) {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members.data?.content; //전체 사원

    const [selectedMember, setSelectedMember] = useState({
        alMember : {
            memberNo: '', memberName: '',
            position: {positionName: ''},
            department: {depName: ''}
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

    const [selectedAppList, setSelectedAppList] = useState([]); //결재선
    const [count, setCount] = useState(1); //결재순서

    const column = ['순번', '부서', '이름', '직급', '구분'];

    console.log('api 호출결과', memberList);
    console.log('추가 된 appLine', selectedAppList);

    useEffect(() => {
        dispatch(callMembersAPI());
    }, [])

    const onClickList = (member) => {
        setSelectedMember({
            alMember: member,
            alType: '',
            sequence: ''
        });
    }

    const onClickAddButton = () => {
        if (selectedMember.alMember.memberNo !== '' && !selectedAppList.find(item => item.alMember.memberNo === selectedMember.alMember.memberNo)) {
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
        setAppLine(selectedAppList);
        setModalControl({ appLineModal: false, refLineModal: false });
    }


    return (
        <div className={AppModalCss.appModal}>
            <div className={AppModalCss.appModalBox}>
                <h1>결재선 추가</h1>
                <div className={AppModalCss.appModalContents}>
                    <div className={AppModalCss.members}>
                        <h5>조직도</h5>
                        <div>
                            <ul>
                                {Object.entries(groupByDepartment()).map(([department, members]) => (
                                    <li key={department}>
                                        <h5>{department}</h5>
                                        <ul>
                                            {members.map((member, index) => (
                                                <li key={member.memberNo}
                                                    onClick={() => onClickList(member)}
                                                    className={selectedMember.alMember.memberNo === member.memberNo ? AppModalCss.selectedLi : ''}
                                                >
                                                    {member.memberName}
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
                    <div className={AppModalCss.appMem}>
                        <h5>결재자</h5>
                        <table className={Style.appTable}>
                            <thead>
                                <tr>
                                    {column.map((item) => (
                                        <th scope='col' key={item.index} style={{width: '20%'}}>{item}</th>
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
                                            <select onChange={(e) => onChangeType(item, e)}>
                                                <option value={'일반'}>일반</option>
                                                <option value={'전결'}>전결</option>
                                                {/* 직급따라서 전결 선택할 수 있는 로직 필요 */}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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