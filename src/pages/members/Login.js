
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callLoginAPI
} from '../../apis/MemberAPICalls'


function Login() {
        
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    // 폼 데이터 한번에 변경 및 State에 저장    
    const [form, setForm] = useState({
        memberNo: '',
        memberPW: ''
    });

    useEffect(() => {
        
        // if(loginMember.status === 200){
        //     console.log("[Login] Login SUCCESS {}", loginMember);
        //     navigate("/", { replace: true });
        // }
    }
    ,[loginMember]);
    
    // 로그인 상태일 시 로그인페이지로 접근 방지
    // if(loginMember.length > 0) {
    //     console.log("[Login] Login is already authenticated by the server");        
    //     return <Navigate to="/"/>
    // }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 
        navigate("/register", { replace: true })
    }

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
        console.log("로그인 진행");
        navigate("/main",{replace: true});
    }


    return (
        <div >
            <div >
                <h1>로그인</h1>
                <input 
                    type="text" 
                    name='memberNo'
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name='memberPW' 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick={ onClickLoginHandler }
                >
                    로그인
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ onClickRegisterHandler }
                >
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Login;