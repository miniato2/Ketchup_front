import AppCategory from "../../components/approvals/AppCategory";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAppListAPI } from "../../apis/ApprovalAPICalls";
import ApprovalCss from "./Approvals.module.css";
import AppList from "../../components/approvals/AppList";

function Approvals() {

    const [category, setCategory] = useState(1); //카테고리를 state로 관리 초기값 1
    const [status, setStatus] = useState('전체'); //문서 상태 관리 초기값 전체 
    const [currentPage, setCurrentPage] = useState(1); //페이지
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const apps = useSelector(state => state.approvalReducer);
    const appList = apps.data?.content;
    console.log('apps', apps);

    let statusList = [];
    switch(category){
        case 1: statusList = ['대기', '진행']; break;
        case 2: statusList = ['완료', '반려', '회수']; break;
        case 3: statusList = ['대기', '진행']; break;
        case 4: break;
        default : break;
    };

    useEffect(() => {
        
        dispatch(
            callAppListAPI({
                memberNo: '4',
                category: category,
                status: status,
                search: search,
                currentPage: currentPage
            })
        )
    }, [currentPage, category, status])

    const onChangeHandler = (e) => {
        setSearch(e.target.value);
    } //검색어

    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
    } //드랍박스

    return (
        <main id="main" className={'main'}>
            <AppCategory />
            <div style={{ display: "flex", height: "60px", backgroundColor: "#f5f5f5", alignItems: "center", borderBottom: 'solid 0.5px black'}}>
                <select className={ApprovalCss.selectStatus} onChange={statusChangeHandler}>
                    <option>전체</option>
                    {statusList.map((item) => (
                        <option>{item}</option>
                    ))}
                </select>

                <div>
                    <form class="search-form d-flex align-items-center" method="GET" action={''} style={{ marginBottom: '0px' }}>
                        <input type="text" name="search" placeholder="제목 검색" value={search} onChange={onChangeHandler} />
                        <button type="submit" title="SearchBtn"><i class="bi bi-search"></i></button>
                    </form>
                </div>

                <Link to={'/approvals/insert'} className={ApprovalCss.movebtn}>
                    <button className="move-btn" style={{ marginRight: '20px' }}>기안등록</button>
                </Link>
            </div>
            <AppList data={appList}/>
            <h1>페이징</h1>
        </main>
    )
}

export default Approvals;