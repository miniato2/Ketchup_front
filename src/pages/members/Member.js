import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMemberAPI, callResignMemberAPI, callUpdateMembersAPI } from '../../apis/MemberAPICalls';


function Member({ selectMemberNo }) {

    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const memberDetail = member?.data;
    console.log(memberDetail);
    const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태 추가
    const [imagePreview, setImagePreview] = useState('');
    const [form, setForm] = useState([]);
   
    





    const handleStatusChange = async (e) => {

        await dispatch(callResignMemberAPI(memberDetail?.memberNo, { status: e.target.value }));
        await dispatch(callGetMemberAPI({ memberNo: selectMemberNo }));

    }
  

    useEffect(() => {
        dispatch(callGetMemberAPI({ memberNo: selectMemberNo }));
    }, []);

   

    const handleEditModeToggle = () => {
        setForm({
            memberNo: memberDetail.memberNo,
            memberName: memberDetail.memberName,
            phone: memberDetail.phone,
            address: memberDetail.address,
            privateEmail: memberDetail.privateEmail,
            companyEmail: memberDetail.companyEmail,
            department: memberDetail.department?.depNo,
            position: memberDetail.position?.positionNo,
            account: memberDetail.account,
            
        });
        setIsEditMode(prevState => !prevState);
    }

    const handleSaveToggle = () => {
        console.log('보내는 수정폼!!', form);

        dispatch(callUpdateMembersAPI({
            form: form
        }));
        alert("수정이 완료되었습니다.")
        setIsEditMode(prevState => !prevState);
        dispatch(callGetMemberAPI({ memberNo: selectMemberNo }));
       
    }



    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            setForm(prevForm => ({
                ...prevForm,
                memberImage: file
            }));
        };

    };




    return (

        <div

            style={{ backgroundColor: 'white' }}
        >

            {memberDetail && memberDetail?.department?.depName && 

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                    <label style={{ color: '#878787' }}>사번
                        <input
                            type="text"
                            placeholder="사번"
                            readOnly={!isEditMode}
                            defaultValue={memberDetail.memberNo || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <label style={{ color: '#878787' }}>이름
                        <input
                            type="text"
                            placeholder="이름"
                            readOnly={!isEditMode}
                            name="memberName"
                            defaultValue={memberDetail.memberName || ''}
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <label style={{ color: '#878787' }}>연락처
                        <input
                            type="text"
                            placeholder="연락처"
                            name="phone"
                            readOnly={!isEditMode}
                            defaultValue={memberDetail.phone || ''}
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <label style={{ color: '#878787' }}>생년월일<input
                        type="text"
                        placeholder="생년월일"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.birthDate || ''}

                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>성별<input
                        type="text"
                        placeholder="성별"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.gender || ''}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>주소<input
                        type="text"
                        placeholder="주소"
                        readOnly={!isEditMode}
                        name="address"
                        defaultValue={memberDetail.address || ''}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>이메일<input
                        type="text"
                        placeholder="이메일"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.privateEmail || ''}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>사내메일<input
                        type="text"
                        placeholder="사내메일"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.companyEmail || ''}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>부서<input
                        type="text"
                        placeholder="부서명"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.department.depName || ''}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>직급<input
                        type="text"
                        placeholder="직급명"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.position.positionName || ''}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>
                    <label style={{ color: '#878787' }}>계좌번호<input
                        type="text"
                        placeholder="계좌번호"
                        readOnly={!isEditMode}
                        defaultValue={memberDetail.account || ''}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                    </label>


                    <label>
                        재직상태:
                        <select
                            value={memberDetail.status || ''}
                            disabled={!isEditMode}
                            onChange={(e) => {
                                handleStatusChange(e)
                            }}
                            style={{ marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        >
                            <option value="">선택해주세요</option>
                            <option value="재직중">재직중</option>
                            <option value="퇴사">퇴사</option>
                            <option value="휴직">휴직</option>
                        </select>
                    </label>


                    <label style={{ color: '#878787' }}>사원사진
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            name="memberImage"
                            style={{ display: 'none' }} // 기존 스타일 수정
                        />
                        <img
                            src={imagePreview || `/img/${memberDetail?.imgUrl}`}
                            alt="사원사진 미리보기"
                            style={{
                                borderWidth: '0px 0px 1px 0px',
                                marginBottom: '20px',
                                padding: '5px',
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover', 
                                cursor: 'pointer'
                            }}
                        />
                    </label>

                </div>

            }


            {isEditMode ? <button onClick={handleSaveToggle} style={{ marginLeft: '1000px', borderRadius: 5 }}>저장</button>
                : <button onClick={handleEditModeToggle} style={{ marginLeft: '1000px', borderRadius: 5 }}>수정</button>}



        </div>

    );



}

export default Member;