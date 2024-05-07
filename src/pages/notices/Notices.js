import SearchBar from '../../components/contents/SearchBar';
import BootstrapTable from '../../components/contents/BootstrapTable';
import PaginationButtons from '../../components/contents/PaginationButtons';
import ButtonGroup from '../../components/contents/ButtonGroup';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callGetNoticeListAPI, callSearchNoticeListAPI } from '../../apis/NoticeAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { BsMegaphone } from 'react-icons/bs';


const Notices = () => {
  const dispatch = useDispatch(); // useDispatch 훅 추가
  const result = useSelector(state => state.noticeReducer);
  // const noticeList = result.noticelist.data.data.content;
  const noticeList = result.noticelist?.data?.data?.content || [];

  console.log("noticeList : ", noticeList);

  const formatDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formattedNoticeList = noticeList.map(item => ({
    ...item,
    noticeCreateDttm: formatDateTime(item.noticeCreateDttm)
  }));

  // const getMemberInfo = memberNo => {
  //   // 여기서 실제로 토큰에서 사용자 정보를 가져오는 API 호출 또는 Redux 상태에서 사용자 정보를 가져오는 등의 로직이 들어갈 수 있습니다.
  //   // 임시로 예시를 제공합니다.
  //   const member = {
  //     memberNo: 5,
  //     memberName: "김현지",
  //     positionName: "팀장"
  //   };
  //   return member;
  // };

  // 등록된 시간의 역순으로 정렬하되 noticeFix가 "Y"인 행을 상단에 위치하도록 정렬
  const sortedNoticeList = [...formattedNoticeList]
  .sort((a, b) => new Date(b.noticeCreateDttm) - new Date(a.noticeCreateDttm))
  .sort((a, b) => (a.noticeFix === 'Y' ? -1 : 1))
  .map(item => ({
    ...item,
    noticeTitle: item.noticeFix === 'Y' ? (
      <>
        <span style={{ marginRight: '5px' }}>
          [ 필독 
          <span style={{ color: '#EC0B0B' }}>
            <BsMegaphone />
          </span> 
          ]
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

  const buttons = [
    { label: '등록', styleClass: 'move' },
  ];

  
  
  useEffect( 
    () => {
      if (title !== '') {
        dispatch(callSearchNoticeListAPI({ title }));
      } else {
          dispatch(callGetNoticeListAPI());
      }
    }, [dispatch, title]
  );

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
          <ButtonGroup buttons={ buttons } />
        </Link>
      {/* 테이블 컴포넌트에 컬럼 제목 목록을 props로 전달 */}
      <BootstrapTable data={sortedNoticeList} columns={columns} />
      <PaginationButtons />
    </div>
    </div>
  </main>
  );
};

export default Notices;