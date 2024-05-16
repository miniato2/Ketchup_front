import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Notices from './pages/notices/Notices';
import InsertNotice from './pages/notices/InsertNotice';
import Calendar from './pages/schedules/calendar';
import Approvals from './pages/approvals/Approvals';
import InsertApproval from './pages/approvals/InsertApproval';
import ApprovalDetail from './pages/approvals/ApprovalDetail';
import Mail from './pages/mails/Mail';
import MailDetail from './pages/mails/MailDetail';
import InsertMail from './pages/mails/InsertMail';
import Login from './pages/members/Login';
import MyPage from './pages/members/MyPage';
import NoticeDetail from './pages/notices/NoticeDetail';
import Members from './pages/members/Members';
import MemberDetail from './pages/members/MemberDetail';
import MailReply from './pages/mails/MailReply';
import InsertMember from './pages/members/InsertMember';
import UpdateNotice from './pages/notices/UpdateNotice';
import Reserve from './pages/reserves/Reserve';
import InsertBoard from './pages/boards/InsertBoard';
import Boards from './pages/boards/Boards';
import Error from './pages/Error';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 로직 추가
  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // isLoggedIn 상태에 따라 리다이렉션 경로 설정
  const redirectPath = isLoggedIn ? '/main' : '/login';

  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to={redirectPath} replace />} />
    <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
    <Route path="/main" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="notices" element={<Notices />}>
        <Route path="insert" element={<InsertNotice />} />
        <Route path="update/:noticeNo" element={<UpdateNotice />} />
        <Route path=":noticeNo" element={<NoticeDetail />} />
      </Route>
      <Route path="approvals" element={<Approvals />}>
        <Route path="insert" element={<InsertApproval />} />
        <Route path=":approvalNo" element={<ApprovalDetail />} />
      </Route>
      <Route path="board" element={<Boards />}>
        <Route path="insert" element={<InsertBoard />} />
      </Route>
      <Route path="calendar" element={<Calendar />} />
      <Route path="reserve" element={<Reserve />} />
      <Route path="mails" element={<Mail />}>
        <Route path="insert" element={<InsertMail />} />
        <Route path="detail/:mailNo" element={<MailDetail />} />
        <Route path="reply" element={<MailReply />} />
      </Route>
      <Route path="mypage" element={<MyPage />} />
      <Route path="members" element={<Members />}>
        <Route path="insert" element={<InsertMember />} />
        <Route path=":memberNo" element={<MemberDetail />} />
      </Route>
    </Route>
    {/* Error 페이지 */}
   
  </Routes>
</BrowserRouter>
  );
}

export default App;