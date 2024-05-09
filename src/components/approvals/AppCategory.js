import AppCatCss from './AppCategory.module.css';

function AppCategory(){
    const approvalData = [
        { title: "내가 결재해야 하는 문서", count: 3 },
        { title: "결재 대기중인 나의 문서", count: 5 },
        { title: "승인된 나의 문서", count: 10 },
        { title: "반려된 나의 문서", count: 2 }
    ];

    const changeCategory = () => {
        // 카테고리 변경

    }

    return(
        <div className={AppCatCss.appCategory}>
            {approvalData.map(({ title, count }) => (
                    <div className={AppCatCss.categoryBox} onClick={changeCategory}>
                            <h5 className={AppCatCss.title}>{title}</h5>
                            <div className="d-flex justify-content-end">
                                <h3>{count}</h3>
                            </div>
                        </div> 
                    ))}
        </div>
        
    )
}

export default AppCategory;