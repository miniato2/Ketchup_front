import { Link, NavLink } from 'react-router-dom';
import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li class="nav-item">
                    <NavLink  className="nav-link collapsed" activeClassName="active" to="/notices">
                        <i className="bi bi-megaphone"></i><span>공지사항</span>
                    </NavLink >
                </li>
                <li class="nav-item">
                    <Link className="nav-link collapsed" to="/approvals">
                        <i className="bi bi-pencil-square"></i><span>전자결재</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link collapsed" to="/calendar">
                        <i className="bi bi-calendar-event"></i><span>일정</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link collapsed" to="/boards">
                        <i className="bi bi-file-text"></i><span>자료실</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link collapsed" to="/reserve">
                        <i className="bi bi-clock"></i><span>자원예약</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link collapsed" to="#">
                        <i className="bi bi-diagram-3"></i><span>조직도</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link collapsed" to="/members">
                        <i className="bi bi-person-badge"></i><span>사원</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#organization-nav">
                        <i className="bi bi-diagram-3"></i><span>조직</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="organization-nav" className="nav-content collapse" data-bs-parent="#organization-parent">
                        <li class="nav-item">
                            <Link to="/organization-metting.html" style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 부서관리</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/organization-vehicle.html" style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 직급관리</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#resource-management-nav">
                        <i className="bi bi-people"></i><span>자원관리</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>              
                    <ul id="resource-management-nav" className="nav-content collapse" data-bs-parent="#resource-management-parent">                    
                        <li class="nav-item">
                            <Link to="/resources/conferences" style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 회의실</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/resources/vehicles" style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 차량</span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;