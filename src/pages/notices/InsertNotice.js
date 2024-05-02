import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../../components/contents/Editor";
import SearchBar from "../../components/contents/SearchBar";

function InsertNotice() {

  /* 로그인 상태 확인 */
  // const loginStatus = !!localStorage.getItem('isLogin');
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const result = useSelector(state => state.menuReducer);

  // const updateHandler = () => navigate(`/menu/modify/${id}`);
  // const deleteHandler = () => dispatch(callDeleteMenuAPI(id));

  // useEffect(
  //     () => {
  //         /* 메뉴 삭제 완료 확인 후 /menu로 이동 */
  //         if (result.delete) {
  //             alert('메뉴 삭제');
  //             navigate(`/menu`);
  //         }
  //     }, // eslint-disable-next-line
  //     [result]
  // );


  const buttons = [
    { label: '취소', onClick: 'handleBack', styleClass: 'back' },
    { label: '등록', onClick: 'handleSubmit', styleClass: 'move' },
    // 다른 버튼에 대한 정보 추가
  ];
    return (
      <main id="main" class="main">

      <div class="title">
        <h2>공지사항</h2>
        <SearchBar />
      </div>

      <div class="col-lg-12">
        <div class="list">
          <div class="card-title">
            <div class="input-container">
              <label>제목</label>
              <input type="text" placeholder="업무자료 공유드립니다." />
            </div>
            <div class="input-container">
              <label>첨부파일</label>
              <div class="file-input">
                <input type="file" id="file" name="file" />
              </div>
            </div>
          </div>
          <Editor />
          <ButtonGroup buttons={buttons} />
        </div>
      </div>
    </main>
    );
};

export default InsertNotice;