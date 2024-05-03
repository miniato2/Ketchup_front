const TitleAndFile = () => {
    return (
        <>
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
        </>
  );
}

export default TitleAndFile;