import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callUpdateMyPWAPI } from '../../apis/MemberAPICalls';



export default function UpdatePWForm({ myNo, onDialogClickHandler }) {


    const dispatch = useDispatch();
    const [pass, setPass] = useState({
        firstPW: '',
        secondPW: '',
    });


    const [validationMessage, setValidationMessage] = useState({
        validPassword: '',
        passwordMatch: '',
    });

    console.log(validationMessage)


    const onChangeHandler = async (e) => {
        const { name, value } = e.target;

        await setPass({
            ...pass,
            [name]: value,
        });

        if (name === "firstPW") {
            if (!validatePassword(value)) {
                setValidationMessage({
                    ...validationMessage,
                    validPassword: '영문 숫자 특수기호 조합 8자리 이상이어야 합니다.'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    validPassword: 'ok!'
                })

            }
        }

        if (name === "secondPW") {
            if (matchPassword(value)) {
                setValidationMessage({
                    ...validationMessage,
                    passwordMatch: 'ok!'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    passwordMatch: '비밀번호가 일치하지 않습니다.'
                })

            }
        }


    }






    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
        return passwordRegex.test(String(password).toLowerCase());

    }

    const matchPassword = (value) => {

        if (pass.firstPW === value) {
            return true
        }
        else { return false }

    }





    const onClickHandler = async () => {

        await dispatch(callUpdateMyPWAPI(myNo, pass.firstPW));
        alert("수정이 완료되었습니다.");
        onDialogClickHandler();
    }



    return (
        <div style={{ marginLeft: 50, width: 500 }}>
            <label>새 비밀번호 <input
                type='password'
                name="firstPW"
                value={pass.firstPW}
                onChange={onChangeHandler}
                placeholder='비밀번호를입력해주세요'
                style={{ textAlign: 'center', marginLeft: 70, borderWidth: '0px 0px 1px 0px' }}
            /></label>
            <p style={{ color: 'red', fontSize: 13 }}>{validationMessage.validPassword}</p>

            <br />

            <br />

            <label>새 비밀번호 확인
                <input
                    type='password'
                    placeholder='한번더 입력해주세요'
                    value={pass.secondPW}
                    onChange={onChangeHandler}
                    name="secondPW"
                    style={{
                        textAlign: 'center',
                        marginLeft: 40,
                        borderWidth: '0px 0px 1px 0px'
                    }}
                />
            </label>
            <p style={{ color: 'red', fontSize: 13 }}>{validationMessage.passwordMatch}</p>

            <div style={{ marginRight: "20px" }}>


                <button
                    onClick={onDialogClickHandler}
                    style={{ backgroundColor: 'white', color: 'black', fontSize: '15px', width: 80, height: '35px', padding: '5px', cursor: 'pointer', marginLeft: '200px', borderRadius: 5 }}
                >
                    취소
                </button>
                <button
                    id="registerButton"
                    onClick={onClickHandler}
                    disabled={Object.values(validationMessage).some(msg => msg !== 'ok!')}
                    style={{ backgroundColor: 'red', color: 'white', border: 'none', fontSize: '15px', width: 80, height: '35px', padding: '5px', cursor: 'pointer', marginLeft: '10px', borderRadius: 5 }}
                >
                    등록
                </button>
            </div>
        </div>
    );
}
