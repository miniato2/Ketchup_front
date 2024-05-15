import React, { useState } from 'react';
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
  const accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    // 토큰 유효성 검사 로직 추가
    setIsLoggedIn(true);
  }

  // isLoggedIn 상태에 따라 리다이렉션 경로 설정
  const redirectPath = isLoggedIn ? '/main' : '/login';

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 여부에 따라 "/" 경로를 리다이렉션 */}
        <Route path="/" element={<Navigate to={redirectPath} replace />} />
        <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/main" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="notices">
            <Route index element={<Notices />} />
            <Route path=":noticeNo" element={<NoticeDetail />} />
            <Route path="insert" element={<InsertNotice />} />
            <Route path="update">
              <Route path=":noticeNo" element={<UpdateNotice />} />
            </Route>
          </Route>
          <Route path="approvals">
            <Route index element={<Approvals />} />
            <Route path="insert" element={<InsertApproval />} />
            <Route path=":approvalNo" element={<ApprovalDetail />} />
          </Route>
          <Route path="board">
            <Route index element={<Boards />} />
            <Route path="insert" element={<InsertBoard />} />
          </Route>
          <Route path="calendar" element={<Calendar />} />
          <Route path='reserve' element={<Reserve/>}/>          
          <Route path="mails">
            <Route path=":part" element={<Mail />} />
            <Route path="detail">
              <Route path=":mailNo" element={<MailDetail />} />
            </Route>
            <Route path="insert" element={<InsertMail />} />
            <Route path="reply" element={<MailReply />} />
          </Route>
          <Route path="mypage" element={<MyPage />} />
          <Route path="members">
            <Route index element={<Members />} />
            <Route path="insert" element={<InsertMember />} />
            <Route path=":memberNo" element={<MemberDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import Layout from './layouts/Layout';
// import Main from './pages/Main';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Notices from './pages/notices/Notices';
// import InsertNotice from './pages/notices/InsertNotice';
// import Calendar from './pages/schedules/calendar';
// import Approvals from './pages/approvals/Approvals';
// import InsertApproval from './pages/approvals/InsertApproval';
// import ApprovalDetail from './pages/approvals/ApprovalDetail';
// import Mail from './pages/mails/Mail';
// import MailDetail from './pages/mails/MailDetail';
// import InsertMail from './pages/mails/InsertMail';
// import Login from './pages/members/Login';
// import MyPage from './pages/members/MyPage';
// import NoticeDetail from './pages/notices/NoticeDetail';
// import Members from './pages/members/Members';
// import MemberDetail from './pages/members/MemberDetail';
// import MailReply from './pages/mails/MailReply';
// import InsertMember from './pages/members/InsertMember';
// import UpdateNotice from './pages/notices/UpdateNotice';
// import Reserve from './pages/reserves/Reserve';
// import InsertBoard from './pages/boards/InsertBoard';
// import Boards from './pages/boards/Boards';
// import { useEffect, useState } from 'react';
// import Error from './pages/Error';

// function App() {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     // 로그인 상태 확인 로직 추가
//     const accessToken = window.localStorage.getItem('accessToken');
//     if (accessToken) {
//       // 토큰 유효성 검사 로직 추가
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   // useEffect(() => {
//   //   // isLoggedIn 상태가 변경되었을 때 이동 로직 추가
//   //   if (isLoggedIn) {
//   //     navigate('/main', { replace: true });
//   //   }
//   // }, [isLoggedIn, navigate]);


//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* 로그인 여부에 따라 "/" 경로를 리다이렉션 */}
//         {!isLoggedIn && <Route path="/" element={<Navigate to="/login" replace />} />}
//         {isLoggedIn && <Route path="/" element={<Navigate to="/main" replace />} />}

//         {isLoggedIn && (
//           <Route element={<Layout />}>
//             <Route index element={<Main />} />
//             <Route path="main" element={<Main />} />
//             <Route path='notices'>
//               <Route index element={<Notices />} />
//               <Route path=':noticeNo' element={<NoticeDetail />} />
//               <Route path='insert' element={<InsertNotice />} />
//               <Route path='update'>
//                 <Route path=':noticeNo' element={<UpdateNotice />} />
//               </Route>
//             </Route>
//             <Route path='approvals'>
//               <Route index element={<Approvals />} />
//               <Route path='insert' element={<InsertApproval />} />
//               <Route path=':approvalNo' element={<ApprovalDetail />} />
//             </Route>
//             <Route path='board'>
//               <Route index element={<Boards />} />
//               <Route path='insert' element={<InsertBoard />} />
//             </Route>
//             <Route path='calendar' element={<Calendar />} />
//             <Route path='mails'>
//               <Route path=':part/' element={<Mail />} />
//               <Route path='detail'>
//                 <Route path=':mailNo' element={<MailDetail />} />
//               </Route>
//               <Route path='insert' element={<InsertMail />} />
//               <Route path='reply' element={<MailReply />} />
//             </Route>
//             <Route path="mypage" element={<MyPage />} />
//             <Route path='members'>
//               <Route index element={<Members />} />
//               <Route path='insert' element={<InsertMember />} />
//               <Route path=':memberNo' element={<MemberDetail />} />
//             </Route>
//           </Route>

//          )}
        
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </BrowserRouter >

//   );
// }

// export default App;