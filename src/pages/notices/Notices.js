import SearchBar from '../../components/contents/SearchBar';
import BootstrapTable from '../../components/contents/BootstrapTable';
import PaginationButtons from '../../components/contents/PaginationButtons';
import ButtonGroup from '../../components/contents/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callGetNoticeListAPI, callSearchNoticeListAPI } from '../../apis/NoticeAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { BsMegaphone } from 'react-icons/bs';

const Notices = () => {
  const dispatch = useDispatch(); 
  const result = useSelector(state => state.noticeReducer);
  const noticeList = result.noticelist || [];
  const navigate = useNavigate();

  console.log("noticeList : ", noticeList);

  const formatDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedNoticeList = noticeList.map(item => ({
    ...item,
    noticeCreateDttm: formatDateTime(item.noticeCreateDttm)
  }));

  // 등록된 시간의 역순으로 정렬하되 noticeFix가 "Y"인 행을 상단에 위치하도록 정렬
  const sortedNoticeList = [...formattedNoticeList]
    .sort((a, b) => new Date(b.noticeCreateDttm) - new Date(a.noticeCreateDttm))
    .sort((a, b) => (a.noticeFix === 'Y' ? -1 : 1))
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
      ) : item.noticeTitle
    }));

  // 컬럼 제목 목록
  const columns = [
    ['noticeNo', '공지번호'],
    ['noticeTitle', '제목'],
    ['memberNo', '작성자'],
    ['noticeCreateDttm', '등록일']
  ];

  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const itemsPerPage = 10; // 페이지당 아이템 수
  const buttons = [
    { label: '등록', styleClass: 'move' },
  ];

  const handleRowClick = (index) => {
    // 클릭된 행의 noticeNo를 가져와서 상세 페이지로 이동합니다.
    const noticeNo = sortedNoticeList[index]?.noticeNo;

    console.log('handleRowClick [ noticeNo ] : ' , noticeNo);

    navigate(`/notices/${noticeNo}`);
  };

  useEffect(
    () => {
      if (title !== '') {
        dispatch(callSearchNoticeListAPI({ title }));
      } else {
        dispatch(callGetNoticeListAPI());
      }
    }, [dispatch, title]
  );

  // 현재 페이지에 보여질 아이템 구하기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedNoticeList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main id="main" className="main">

      <div className="title">
        <h2>공지사항</h2>
        <SearchBar onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="col-lg-12">
        <div className="row"></div>
        <div className="list">
          <Link to="/notices/insert">
            <ButtonGroup buttons={buttons} /> 
          </Link>
          {/* 테이블 컴포넌트에 컬럼 제목 목록을 props로 전달 */}
          <BootstrapTable data={currentItems} columns={columns} onRowClick={handleRowClick} />
          <PaginationButtons
            totalItems={sortedNoticeList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)} // 페이지 변경 핸들러 전달
          />
        </div>
      </div>
    </main>
  );
};

export default Notices;
