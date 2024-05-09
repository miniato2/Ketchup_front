import InsertNoticeForm from "../../components/form/InsertNoticeForm";

function InsertNotice() {

  /* 로그인 상태 확인 */
  // const loginStatus = !!localStorage.getItem('isLogin');
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const result = useSelector(state => state.menuReducer);
  /* 관리자가 아닌 사람이 호출할 경우 공지 목록으로 */
  // const loginStatus = !!localStorage.getItem('isLogin');

  // if(!loginStatus) {
  //     return <Navigate to="/notices" replace={ true }/>
  // }

  return (
    <InsertNoticeForm />
  );
};

export default InsertNotice;