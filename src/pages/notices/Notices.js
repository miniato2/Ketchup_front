import SearchBar from '../../components/contents/SearchBar';
import BootstrapTable from '../../components/contents/BootstrapTable';
import PaginationButtons from '../../components/contents/PaginationButtons';
import ButtonGroup from '../../components/contents/ButtonGroup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callGetNoticeListAPI } from '../../apis/NoticeAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { BsMegaphone } from 'react-icons/bs';
import FormatDateTime from '../../components/contents/FormatDateTime';
import { decodeJwt } from '../../utils/tokenUtils';

const Notices = () => {
  const dispatch = useDispatch();
  const result = useSelector(state => state.noticeReducer);
  const noticeList = result.noticelist || [];
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const itemsPerPage = 10; // 페이지당 아이템 수
  const navigate = useNavigate();


  console.log("noticeList : ", noticeList);

  // 중복된 noticeNo 제거 및 공지 정렬
  const sortedNoticeList = [...noticeList]
    .sort((a, b) => {
      if (a.noticeFix === 'Y' && b.noticeFix !== 'Y') {
        return -1; // a가 필독 공지이고 b가 필독 공지가 아닌 경우, a를 먼저 배치
      } else if (a.noticeFix !== 'Y' && b.noticeFix === 'Y') {
        return 1; // a가 필독 공지가 아니고 b가 필독 공지인 경우, b를 먼저 배치
      } else {
        return new Date(b.noticeCreateDttm) - new Date(a.noticeCreateDttm); // a와 b가 모두 필독 공지이거나 아닌 경우 등록된 시간의 역순으로 정렬
      }
    })
    .map(item => ({
      ...item,
      noticeTitle: item.noticeFix === 'Y' ? (
        <>
          <span style={{ marginRight: '5px' }}>
            [ 필독&nbsp;
            <span style={{ color: '#EC0B0B' }}>
              <BsMegaphone />
            </span>
            &nbsp;]
          </span>
          {item.noticeTitle}
        </>
      ) : item.noticeTitle,
      noticeCreateDttm: FormatDateTime(item.noticeCreateDttm) // 등록일 형식화 적용

    }));

  // 컬럼 제목 목록
  const columns = [
    ['noticeNo', '공지번호'],
    ['noticeTitle', '제목'],
    ['memberName', '작성자'],
    ['noticeCreateDttm', '등록일']
  ];

  const handleRowClick = (index) => {
    const realIndex = (currentPage - 1) * itemsPerPage + index;
    const noticeNo = sortedNoticeList[realIndex]?.noticeNo;
    console.log(noticeNo);
    navigate(`/notices/${noticeNo}`);
  };

  // 검색어를 API 호출 함수에 전달하는 함수입니다.
  const handleSearch = (searchKeyword) => {
    dispatch(callGetNoticeListAPI(searchKeyword));
  }

  useEffect(
    () => {
      // 페이지가 로드될 때 전체 공지 목록을 불러옵니다.
      dispatch(callGetNoticeListAPI());
    }, [dispatch]
  );

  // 현재 페이지에 보여질 아이템 구하기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedNoticeList.slice(indexOfFirstItem, indexOfLastItem);

  // 사용자의 직위 이름
  const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
  console.log("[ loginToken ] ", loginToken.role);

  return (
    <main id="main" className="main">

      <div className="title">
        <h2>공지사항</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="col-lg-12">
        <div className="row"></div>
        <div className="list">
          {loginToken.role === "LV2" || loginToken.role === "LV3" ? (
            <Link to="/notices/insert">
              <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
            </Link>
          ) : null}

          <div style={{ marginTop: loginToken.role !== "LV2" && loginToken.role !== "LV3" && '30px' }}>
            <BootstrapTable data={currentItems} columns={columns} onRowClick={handleRowClick} />
          </div>

          <PaginationButtons totalItems={sortedNoticeList.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
        </div>
      </div>
    </main>
  );
};

export default Notices;