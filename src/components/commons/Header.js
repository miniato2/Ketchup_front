import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap'
import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';




function Header() {

    
const dispatch = useDispatch();

const navigate = useNavigate();

 
 
 

const onClickLogoutHandler = () => {
    window.localStorage.removeItem('accessToken');  
    //로그아웃
    dispatch(callLogoutAPI());
    
    alert('로그아웃이 되어 로그인화면 으로 이동합니다.');
    navigate("login", { replace: true })
   
}

   


    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to="/main" className="logo d-flex align-items-center">
                    <img style={{ width: '180px', height: '150px' }} src="img/logo.png" alt="Logo" />
                </Link>
            </div>

            <Nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item">
                        <Link to="/mails?part=receive" className="bi-envelope nav-icon" style={{color: '#EC0B0B'}}></Link>
                    </li>
                    <li className="nav-item dropdown pe-2">
                        <a className="nav-link nav-profile d-flex align-items-center pe-6" href="#" data-bs-toggle="dropdown">
                            <img src="img/profile-img.png" alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2" style={{ color: "#000" }}>김현지 사원</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>김현지</h6>
                                <span>개발팀</span>
                            </li>
                            <li>
                                <Link className="dropdown-item d-flex align-items-center" to="users-profile.html">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item d-flex align-items-center" onClick={onClickLogoutHandler}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </Nav>
        </header>
    );
}

export default Header;