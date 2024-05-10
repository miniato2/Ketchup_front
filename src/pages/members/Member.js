import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import { callGetMemberAPI } from '../../apis/MemberAPICalls';

function Member({selectMemberNo}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberDetail = member?.data;

    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/");
    }

    useEffect(
        () => {
           

            if(token){
                dispatch(callGetMemberAPI({memberNo: selectMemberNo}));
            }

        },[]
    );

   

    return (
       
        <div 
            
            style={ { backgroundColor: 'white' } }
        >

            { memberDetail&& memberDetail?.department?.depName &&
            
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              

                <label style={{color: '#878787'}}>사번
                <input 
                    type="text" 
                    placeholder="사번" 
                    readOnly={true}
                    value={memberDetail.memberNo || ''}
                    style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px',textAlign: 'center'}}
                />
                </label>
                 <label style={{color: '#878787'}}>이름
                <input 
                    type="text" 
                    placeholder="이름" 
                    readOnly={true}
                    value={memberDetail.memberName || ''}
                    style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px',width: '400px', textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>생년월일<input 
                    type="text" 
                    placeholder="생년월일" 
                    readOnly={true}
                    value={memberDetail.birthDate || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>성별<input 
                    type="text" 
                    placeholder="성별" 
                    readOnly={true}
                    value={memberDetail.gender || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>주소<input 
                    type="text" 
                    placeholder="주소" 
                    readOnly={true}
                    value={memberDetail.address || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>이메일<input 
                    type="text" 
                    placeholder="이메일" 
                    readOnly={true}
                    value={memberDetail.privateEmail || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>사내메일<input 
                    type="text" 
                    placeholder="사내메일" 
                    readOnly={true}
                    value={memberDetail.companyEmail || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>부서<input 
                    type="text" 
                    placeholder="부서명" 
                    readOnly={true}
                    value={memberDetail.department.depName  || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>직급<input 
                    type="text" 
                    placeholder="직급명" 
                    readOnly={true}
                    value={memberDetail.position.positionName  || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>계좌번호<input 
                    type="text" 
                    placeholder="계좌번호" 
                    readOnly={true}
                    value={memberDetail.account  || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>재직상태<input 
                    type="text" 
                    placeholder="재직상태" 
                    readOnly={true}
                    value={memberDetail.status  || ''}
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>사원사진
                <img src={`/img/${memberDetail.imgUrl}`} width="200" height="150"/>
                {/* <img src = 'src/main/resources/static/uploadfiles/8f3fd818208e44f6abd7b7116f9f79e1.png'/> */}
                
                
               
</label>


                <span>
                <button
                  style={{ border: 'none', margin: 0, fontSize: '15px', height: '30px', padding: '5px', cursor: 'pointer',marginLeft:'700px'}}
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
                <button
                  style={{backgroundColor: 'red', color: 'white', border: 'none',  fontSize: '15px', height: '30px', padding: '5px', cursor: 'pointer',marginLeft:'10px'}}
                    onClick = { onClickBackHandler }
                >
                    비밀번호 수정
                </button>
                </span>
            </div>

            }
        </div>
       
    );



}

export default Member;