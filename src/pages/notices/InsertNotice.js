import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../../components/contents/Editor";
import SearchBar from "../../components/contents/SearchBar";

function InsertNotice() {

    
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
        <div class="row"></div>
  
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
            <ButtonGroup buttons={ buttons }/>
            </div>
        </div>
      </main>
    );
};

export default InsertNotice;