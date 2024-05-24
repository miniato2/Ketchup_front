import React, { useEffect, useState } from 'react';
import { callAllDepartmentsAPI,callUpdateDepartmentAPI } from '../../apis/MemberAPICalls';
import { useDispatch } from 'react-redux';
import ButtonGroup from '../contents/ButtonGroup';



export default function DepartmentForm({ department, onDialogClickHandler }) {

    console.log('다이얼로그 시작 수정할 부서', department);
    const dispatch = useDispatch();
    const [form, setForm] = useState('');


   


    const onChangeHandler = (e) => {
        setForm(
           e.target.value,
        );
    }

    const onClickHandler = async () => {
        await dispatch(callUpdateDepartmentAPI(department.depNo, form));

        alert("수정이 완료되었습니다.");

        await dispatch(callAllDepartmentsAPI());

        onDialogClickHandler();
    }







    return (


        <div style={{ marginLeft: 50, width: 500}}>
            <label>현재 부서명 <input value={department.depName} style={{ textAlign: 'center', marginLeft: 50, borderWidth: '0px 0px 1px 0px' }}></input></label>
            <br></br>





            <label>수정후 부서명
                <input
                    defaultValue={department.depName}
                    onChange={onChangeHandler}
                    name="depName"
                    style={{
                        textAlign: 'center',
                        marginLeft: 40,
                        borderWidth: '0px 0px 1px 0px'
                    }}>
                </input>
            </label>




            <br></br>
            {/* <button style={{ marginLeft: 330, marginBottom: 20 }} onClick={() => { onDialogClickHandler() }}>취소</button>
            <button style={{ marginLeft: 5 }} onClick={onClickHandler}>저장</button> */}

<div style={{ marginRight: "20px"}}>
                <ButtonGroup
                    buttons={[
                        { label: '취소', styleClass: 'back', onClick: () => { onDialogClickHandler() } },
                        { label: '저장', styleClass: 'move', onClick: onClickHandler }
                    ]}
                />
            </div>





        </div>



    );
}
