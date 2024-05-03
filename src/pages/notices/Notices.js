import SearchBar from '../../components/contents/SearchBar';
import BootstrapTable from '../../components/contents/BootstrapTable';
import PaginationButtons from '../../components/contents/PaginationButtons';
import ButtonGroup from '../../components/contents/ButtonGroup';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notices = () => {
  const result = useSelector(state => state.noticeReducer);

  // 테이블에 사용될 데이터
  const notices = [
    { '번호': 10, '제목': '[ 필독 📢 ] 사내규정 변경의 건', '작성자': '남윤진 대표', '작성일': '2024-04-25' },
    { '번호': 9, '제목': '[ 필독 📢 ][공지] 무선 네트워크 패스워드 변경작업 안내 (변경일시 4/26 금...', '작성자': '이후영 차장', '작성일': '2024-04-21'  },
    { '번호': 8, '제목': '[공지] 무선 네트워크 패스워드 변경작업 안내 (변경일시 4/26 금요일 20시)', '작성자': '이후영 차장', '작성일': '2024-04-19'  },
    { '번호': 7, '제목': '[공지] 카카오톡 관련 서비스 사용 제한', '작성자': '최승욱 팀장', '작성일': '2024-04-15'  },
    { '번호': 6, '제목': '[공지] 회의실 노트북 패스워드 변경 작업 안내 (10/27 금요일 17시30분)', '작성자': '최승욱 팀장', '작성일': '2024-04-14'  },
    { '번호': 5, '제목': '[공지] Symantec 백신 소프트웨어 재설치 안내', '작성자': '이진우 과장', '작성일': '2024-04-01'  },
    { '번호': 4, '제목': '[ Ketchup ] 3.1 버전 업데이트 안내', '작성자': '이진우 과장', '작성일': '2024-03-23'  },
    { '번호': 3, '제목': '[공지] 신종 코로나바이러스감염증 예방수칙 안내', '작성자': '박다은 팀장', '작성일': '2024-03-16'  },
    { '번호': 2, '제목': '[공지] Portal 업그레이드 작업', '작성자': '박다은 팀장', '작성일': '2024-03-09'  },
    { '번호': 1, '제목': '[공지] 프린터 교체에 따른 설치 및 사용 안내', '작성자': '이후영 차장', '작성일': '2024-03-02'  },
    // 데이터 추가
  ];

  // 컬럼 제목 목록
  const columns = ['번호', '제목', '작성자', '작성일'];

  const buttons = [
    // { label: '취소', onClick: 'handleAddNotice', styleClass: 'back' },
    { label: '등록', styleClass: 'move' },
    // 다른 버튼에 대한 정보 추가
  ];
  
  useEffect(
    () => {
      console.log('공지 등록')
    }, 
    [result]
  );

  return (
    <main id="main" class="main">

    <div class="title">
      <h2>공지사항</h2>
      <SearchBar />
    </div>

    <div class="col-lg-12">
    <div class="row"></div>

    <div class="list">
        <Link to="/notices/insert">
          <ButtonGroup buttons={ buttons } />
        </Link>
      {/* 테이블 컴포넌트에 컬럼 제목 목록을 props로 전달 */}
      <BootstrapTable data={notices} columns={columns} />
      <PaginationButtons />
    </div>
    </div>
  </main>
  );
};

export default Notices;