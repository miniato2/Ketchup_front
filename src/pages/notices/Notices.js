
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/contents/SearchBar';
import ButtonGroup from '../../components/contents/ButtonGroup';
import BootstrapTable from '../../components/contents/BootstrapTable';
import { callGetNoticeListAPI } from '../../apis/NoticeAPICalls';
import PaginationButtons from '../../components/contents/PaginationButtons';
import { decodeJwt } from '../../utils/tokenUtils';
import FormatDateTime from '../../components/contents/FormatDateTime';
import { BsMegaphone } from 'react-icons/bs';

const Notices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const result = useSelector(state => state.noticeReducer);

  const noticeList = result?.noticelist?.noticesWithMemberNames || [];

  console.log("Notices [ result ] : ", result);
  console.log("Notices [ noticeList ] : ", noticeList);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));

  const pinnedNotices = noticeList
    .filter(notice => notice.noticeFix === 'Y')
    .map(notice => ({
      ...notice,
      noticeTitle: (
        <>
          <span style={{ marginRight: '5px' }}>
            [ 필독&nbsp;
            <span style={{ color: '#EC0B0B' }}>
              <BsMegaphone />
            </span>
            &nbsp;]
          </span>{notice.noticeTitle}
        </>
      ),
      memberName: `${notice.memberName} ${notice.positionName}`,
      noticeCreateDttm: FormatDateTime(notice.noticeCreateDttm)
    }));

  console.log("pinnedNotices ; ", pinnedNotices);

  const normalNotices = noticeList.filter(notice => notice.noticeFix !== 'Y').map(notice => ({
    ...notice,
    memberName: `${notice.memberName} ${notice.positionName}`,
    noticeCreateDttm: FormatDateTime(notice.noticeCreateDttm)
  }));

  console.log("totalItems : ", totalItems);
  const mergedNoticeList = [...pinnedNotices, ...normalNotices];

  useEffect(() => {
    setTotalItems(normalNotices);

    // API 호출
    dispatch(callGetNoticeListAPI({
      currentPage: currentPage,
      title: typeof searchKeyword === 'string' ? searchKeyword.toLowerCase() : '',
      setTotalItems: setTotalItems
    }));
  }, [dispatch, currentPage, searchKeyword]);


  const columns = [
    ['noticeNo', '공지번호'],
    ['noticeTitle', '제목'],
    ['memberName', '작성자'],
    ['noticeCreateDttm', '등록일']
  ];

  const handleRowClick = (index) => {
    const noticeNo = mergedNoticeList[index].noticeNo;
    navigate(`/notices/${noticeNo}`);
  };

  const handleSearch = (searchKeyword) => {
    setCurrentPage(1);
    setSearchKeyword(searchKeyword);
  };

  return (
    <main id="main" className="main">
      <div className="title">
        <h2>공지사항</h2>
        <SearchBar onSearch={handleSearch} value={searchKeyword} name={'제목 검색'} />
      </div>

      <div className="col-lg-12">
        <div className="row"></div>
        <div className="list">
          {(loginToken.role === "LV2" || loginToken.role === "LV3") && (
            <Link to="/notices/insert">
              <ButtonGroup buttons={[{ label: '등록', styleClass: 'move' }]} />
            </Link>
          )}

          {/* 검색 결과가 없을 때 '00' 표시 */}
          {normalNotices.length === 0 && (
            <>
              <BootstrapTable data={mergedNoticeList} columns={columns} onRowClick={handleRowClick} />
              <p style={{ textAlign: 'center' }}>'{searchKeyword}' 제목 공지가 없습니다.</p>
            </>
          )}

          {/* 검색 결과가 없을 때 '00' 표시 */}
          {normalNotices.length > 0 && (
            <>
              <BootstrapTable data={mergedNoticeList} columns={columns} onRowClick={handleRowClick} />
            </>
          )}
          <PaginationButtons
            totalItems={totalItems}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
        </div>
      </div>
    </main>
  );
};

export default Notices;
